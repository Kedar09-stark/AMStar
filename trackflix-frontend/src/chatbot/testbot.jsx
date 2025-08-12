import React, { useState, useRef, useEffect } from "react";
import ChatbotUI from "./ChatbotUI";

const OMDB_API_KEY = "be28d8e8";

const genreList = [
  "action",
  "comedy",
  "drama",
  "thriller",
  "romance",
  "sci-fi",
  "horror",
  "animation",
  "adventure",
];

const greetings = ["hi", "hello", "hey", "hlw", "howdy", "hola"];
function isGreeting(text) {
  const lower = text.toLowerCase().trim();
  return greetings.some(
    (greet) => lower === greet || lower.startsWith(greet + " ")
  );
}

export default function MovieChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! Ask me about movies or TV shows. You can say things like 'sci-fi movies from the 90s' or 'last 20 years'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Context to remember last query info for follow-ups
  const [context, setContext] = useState({ genre: null, type: "movie" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function findClosestGenre(input) {
    const inputLower = input.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const genre of genreList) {
      if (genre.includes(inputLower) || inputLower.includes(genre)) {
        return genre;
      }
      let score = 0;
      for (let i = 0; i < Math.min(genre.length, inputLower.length); i++) {
        if (genre[i] === inputLower[i]) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = genre;
      }
    }
    return bestScore >= 2 ? bestMatch : null;
  }

  // Enhanced parser to extract type, genre, years, and other hints
  function parseQuery(text) {
    const lower = text.toLowerCase();
    const currentYear = new Date().getFullYear();

    // Type detection
    let type = "movie";
    if (
      lower.includes("tv") ||
      lower.includes("show") ||
      lower.includes("series")
    ) {
      type = "series";
    }

    // Genre detection
    let genre = null;
    for (const g of genreList) {
      if (lower.includes(g)) {
        genre = g;
        break;
      }
    }
    if (!genre) {
      const closest = findClosestGenre(lower);
      if (closest) genre = closest;
    }

    // Year or range detection (more flexible)
    let startYear = null;
    let endYear = null;

    // Decade e.g. 90s, 80s
    const decadeMatch = lower.match(/(\d{2})s/);
    if (decadeMatch) {
      const decade = parseInt(decadeMatch[1]);
      startYear = decade < 30 ? 2000 + decade : 1900 + decade;
      endYear = startYear + 9;
    }

    // Last N years (improved to detect more phrasings)
    let lastYearsMatch =
      lower.match(/last (\d{1,2}) years?/) ||
      lower.match(/past (\d{1,2}) years?/) ||
      lower.match(/recent (\d{1,2}) years?/);
    if (lastYearsMatch) {
      const numYears = parseInt(lastYearsMatch[1]);
      startYear = currentYear - numYears;
      endYear = currentYear;
    }

    // Specific year
    const yearMatch = lower.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      startYear = parseInt(yearMatch[0]);
      endYear = startYear;
    }

    // Clean search term removing detected parts to improve OMDb results
    let searchTerm = genre || "movie";

    let cleanedInput = lower;
    if (genre) cleanedInput = cleanedInput.replace(genre, "");
    cleanedInput = cleanedInput.replace(
      /\b(\d{2}s|last \d{1,2} years?|past \d{1,2} years?|recent \d{1,2} years?|\d{1,2} year old|\b(19|20)\d{2}\b)/g,
      ""
    );
    cleanedInput = cleanedInput.trim();

    if (cleanedInput.length > 0) {
      searchTerm = cleanedInput;
    }

    return { type, genre, startYear, endYear, searchTerm };
  }

  async function fetchByYearAndTerm(year, type, term) {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&y=${year}&s=${encodeURIComponent(
      term
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.Search || [];
  }

  async function fetchResults() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    if (isGreeting(input)) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "Hi! How’s your day? Feel free to ask me about movies or TV shows. For example, 'best comedies from the 2000s' or 'recent sci-fi series'. 🎥",
          },
        ]);
        setLoading(false);
      }, 500);
      setInput("");
      return;
    }

    const { type, startYear, endYear, searchTerm, genre } = parseQuery(input);

    // Save context for follow-up queries (e.g. "show me more")
    setContext({ genre, type });

    let allResults = [];

    if (startYear && endYear) {
      for (let y = startYear; y <= endYear; y++) {
        if (y - startYear > 4) break; // max 5 years calls
        const results = await fetchByYearAndTerm(y, type, searchTerm);
        allResults = allResults.concat(results);
      }
    } else {
      // fallback search without year
      const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&s=${encodeURIComponent(
        searchTerm
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      allResults = data.Search || [];
    }

    // If no results, try fallback with genre only
    if (allResults.length === 0 && genre) {
      const fallbackUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&s=${genre}`;
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();

      if (fallbackData.Search && fallbackData.Search.length > 0) {
        allResults = fallbackData.Search;
        setMessages((prev) => [
          ...prev,
        
        ]);
      }
    }

    if (allResults.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I couldn't find any results. You can try asking about genres like 'comedy', 'action', or years like '90s' or 'last 10 years'.",
        },
      ]);
    } else {
      // Filter duplicates by imdbID
      const uniqueResults = [];
      const seenIds = new Set();
      for (const movie of allResults) {
        if (!seenIds.has(movie.imdbID)) {
          uniqueResults.push(movie);
          seenIds.add(movie.imdbID);
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: (
            <div>
              <p>Here are some {type === "series" ? "TV shows" : "movies"} I found:</p>
              {uniqueResults.slice(0, 7).map((movie) => (
                <div
                  key={movie.imdbID}
                  style={{ display: "flex", alignItems: "center", margin: "8px 0" }}
                >
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    style={{
                      width: "45px",
                      height: "65px",
                      marginRight: "12px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div>
                    <b>{movie.Title}</b> ({movie.Year})
                    <br />
                    <small>Type: {movie.Type}</small>
                  </div>
                </div>
              ))}
              <p style={{ fontStyle: "italic", marginTop: "8px" }}>
                Ask for more details or another genre!
              </p>
            </div>
          ),
        },
      ]);
    }

    setLoading(false);
    setInput("");
  }

  return (
    <ChatbotUI
      messages={messages}
      input={input}
      setInput={setInput}
      loading={loading}
      fetchResults={fetchResults}
      messagesEndRef={messagesEndRef}
    />
  );
}
