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

// Helper: extract requested number of movies from user input
function extractRequestedCount(text) {
  const match = text.match(/(\d+)\s*(movies|films|titles|results)/i);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > 0) return num;
  }
  return null;
}

// Fetch multiple pages from OMDb for a year or overall until requestedCount or max 100 results
async function fetchResultsPaginated(type, term, year, requestedCount) {
  let allResults = [];
  let page = 1;
  const maxPages = 10; // OMDb limits to 100 results max (10 per page * 10 pages)

  while (allResults.length < requestedCount && page <= maxPages) {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&s=${encodeURIComponent(
      term
    )}${year ? `&y=${year}` : ""}&page=${page}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True" && data.Search) {
        allResults = allResults.concat(data.Search);
        if (data.Search.length < 10) break; // no more pages if less than 10 results on this page
        page++;
      } else {
        break; // no more results
      }
    } catch (error) {
      break; // stop on error
    }
  }

  return allResults;
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

  // Extended context with cached results and offset for pagination
  const [context, setContext] = useState({
    genre: null,
    type: "movie",
    searchTerm: null,
    startYear: null,
    endYear: null,
    results: [],
    offset: 0,
  });

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

  function parseQuery(text) {
    const lower = text.toLowerCase();
    const currentYear = new Date().getFullYear();

    let type = "movie";
    if (
      lower.includes("tv") ||
      lower.includes("show") ||
      lower.includes("series")
    ) {
      type = "series";
    }

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

    let startYear = null;
    let endYear = null;

    const decadeMatch = lower.match(/(\d{2})s/);
    if (decadeMatch) {
      const decade = parseInt(decadeMatch[1]);
      startYear = decade < 30 ? 2000 + decade : 1900 + decade;
      endYear = startYear + 9;
    }

    let lastYearsMatch =
      lower.match(/last (\d{1,2}) years?/) ||
      lower.match(/past (\d{1,2}) years?/) ||
      lower.match(/recent (\d{1,2}) years?/);
    if (lastYearsMatch) {
      const numYears = parseInt(lastYearsMatch[1]);
      startYear = currentYear - numYears;
      endYear = currentYear;
    }

    const yearMatch = lower.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      startYear = parseInt(yearMatch[0]);
      endYear = startYear;
    }

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

  function isFollowUp(text) {
    const lower = text.toLowerCase();
    return (
      lower.startsWith("show me more") ||
      lower.startsWith("next") ||
      lower.startsWith("more")
    );
  }

  async function fetchMoreResults(requestedCount) {
    const { results, offset, type } = context;
    if (offset < results.length) {
      const nextBatch = results.slice(offset, offset + requestedCount);
      setContext((ctx) => ({ ...ctx, offset: offset + requestedCount }));

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: (
            <div>
              <p>Here are more {type === "series" ? "TV shows" : "movies"}:</p>
              {nextBatch.map((movie) => (
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
      setLoading(false);
      setInput("");
      return true;
    }
    return false;
  }

  async function handleNewQuery(requestedCount, queryData) {
    const { type, startYear, endYear, searchTerm, genre } = queryData;

    let allResults = [];

    if (startYear && endYear) {
      for (let y = startYear; y <= endYear; y++) {
        if (y - startYear > 4) break;
        const results = await fetchResultsPaginated(type, searchTerm, y, 100);
        allResults = allResults.concat(results);
      }
    } else {
      allResults = await fetchResultsPaginated(type, searchTerm, null, 100);
    }

    if (allResults.length === 0 && genre) {
      allResults = await fetchResultsPaginated(type, genre, null, 100);
    }

    if (allResults.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I couldn't find any results. Try other genres or years.",
        },
      ]);
      setLoading(false);
      setInput("");
      return;
    }

    // Filter duplicates
    const uniqueResults = [];
    const seenIds = new Set();
    for (const movie of allResults) {
      if (!seenIds.has(movie.imdbID)) {
        uniqueResults.push(movie);
        seenIds.add(movie.imdbID);
      }
    }

    setContext({
      genre,
      type,
      searchTerm,
      startYear,
      endYear,
      results: uniqueResults,
      offset: requestedCount,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: (
          <div>
            <p>Here are some {type === "series" ? "TV shows" : "movies"} I found:</p>
            {uniqueResults.slice(0, requestedCount).map((movie) => (
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
    setLoading(false);
    setInput("");
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

    if (isFollowUp(input)) {
      const requestedCount = extractRequestedCount(input) || 7;
      const hasMore = await fetchMoreResults(requestedCount);
      if (!hasMore) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "No more results available. Try a new search or ask for another genre.",
          },
        ]);
        setLoading(false);
        setInput("");
      }
      return;
    }

    // New query
    const queryData = parseQuery(input);
    const requestedCount = extractRequestedCount(input) || 7;
    await handleNewQuery(requestedCount, queryData);
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
