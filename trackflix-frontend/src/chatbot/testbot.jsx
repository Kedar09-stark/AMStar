// src/components/MovieChatbot/MovieChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import ChatbotUI from "./ChatbotUI";
import {
  isGreeting,
  extractRequestedCount,
  fetchResultsPaginated,
  parseQuery,
  isFollowUp,
  parseActorQuery, // NEW helper for actor detection
} from "./helpers";

export default function MovieChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 🎬 Ask me about movies, TV shows, or even by actor. Try things like '20 sci-fi movies from the 90s' or '15 movies with Tom Hanks'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [context, setContext] = useState({
    genre: null,
    type: "movie",
    searchTerm: null,
    startYear: null,
    endYear: null,
    actor: null,
    results: [],
    offset: 0,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper: render movie list
  function renderMovies(list, type, isMore = false) {
    return (
      <div>
        <p>
          {isMore
            ? `Here are more ${type === "series" ? "TV shows" : "movies"}:`
            : `Here are some ${type === "series" ? "TV shows" : "movies"} I found:`}
        </p>
        {list.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0",
            }}
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
    );
  }

  // Load more results
  async function fetchMoreResults(requestedCount) {
    const { results, offset, type } = context;
    if (offset < results.length) {
      const nextBatch = results.slice(offset, offset + requestedCount);
      setContext((ctx) => ({ ...ctx, offset: offset + requestedCount }));
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: renderMovies(nextBatch, type, true) },
      ]);
      setLoading(false);
      setInput("");
      return true;
    }
    return false;
  }

  // New query handler
  async function handleNewQuery(requestedCount, queryData) {
    const { type, startYear, endYear, searchTerm, genre, actor } = queryData;
    let allResults = [];

    // If actor search
    if (actor) {
      allResults = await fetchResultsPaginated(type, actor, null, 100, "actor");
    }
    // Year-based search
    else if (startYear && endYear) {
      for (let y = startYear; y <= endYear; y++) {
        if (y - startYear > 4) break;
        const results = await fetchResultsPaginated(type, searchTerm, y, 100);
        allResults = allResults.concat(results);
      }
    }
    // Genre or keyword search
    else {
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
          text: "Sorry, I couldn’t find anything. Try another actor, genre, or year.",
        },
      ]);
      setLoading(false);
      setInput("");
      return;
    }

    // Deduplicate
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
      actor,
      results: uniqueResults,
      offset: requestedCount,
    });

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: renderMovies(uniqueResults.slice(0, requestedCount), type) },
    ]);
    setLoading(false);
    setInput("");
  }

  // Main user input handler
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
            text: "Hello! 👋 You can ask for movies by genre'.",
          },
        ]);
        setLoading(false);
      }, 400);
      setInput("");
      return;
    }

    const requestedCount = extractRequestedCount(input) || 7;

    // Detect if it's an actor-based query
    const actorData = parseActorQuery(input);
    const queryData = actorData || parseQuery(input);

    // Follow-up requests (more, another set, etc.)
    if (
      isFollowUp(input) &&
      !queryData.genre &&
      !queryData.startYear &&
      !queryData.searchTerm &&
      !queryData.actor
    ) {
      const hasMore = await fetchMoreResults(requestedCount);
      if (!hasMore) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "No more results available. Try a new search." },
        ]);
      }
      setLoading(false);
      setInput("");
      return;
    }

    // New search
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
