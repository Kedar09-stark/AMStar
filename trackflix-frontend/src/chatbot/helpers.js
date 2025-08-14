import { genreList, greetings, OMDB_API_KEY } from "./config";

export function isGreeting(text) {
  const lower = text.toLowerCase().trim();
  return greetings.some(
    greet => lower === greet || lower.startsWith(greet + " ")
  );
}

export function extractRequestedCount(text) {
  const match = text.match(/(\d+)\s*(movies|films|titles|results)/i);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > 0) return num;
  }
  return null;
}

/**
 * Handles both normal searches and actor-based searches.
 * If `actor` is provided, searches OMDB by actor.
 */
export async function fetchResultsPaginated(type, term, year, requestedCount, actor = null) {
  let allResults = [];
  let page = 1;
  const maxPages = 10;

  while (allResults.length < requestedCount && page <= maxPages) {
    let url;

    if (actor) {
      // Searching by actor requires a two-step approach with OMDB:
      // Step 1: Search broadly, Step 2: Filter by actor via a detail fetch.
      url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&s=${encodeURIComponent(
        term || actor
      )}${year ? `&y=${year}` : ""}&page=${page}`;
    } else {
      url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=${type}&s=${encodeURIComponent(
        term
      )}${year ? `&y=${year}` : ""}&page=${page}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True" && data.Search) {
        if (actor) {
          // Filter results by checking actor field
          for (const item of data.Search) {
            const detailRes = await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${item.imdbID}&plot=short`
            );
            const detailData = await detailRes.json();
            if (detailData.Actors && detailData.Actors.toLowerCase().includes(actor.toLowerCase())) {
              allResults.push(item);
            }
          }
        } else {
          allResults = allResults.concat(data.Search);
        }

        if (data.Search.length < 10) break;
        page++;
      } else break;
    } catch {
      break;
    }
  }

  return allResults;
}

export function findClosestGenre(input) {
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

export function parseQuery(text) {
  const lower = text.toLowerCase();
  const currentYear = new Date().getFullYear();
  let type = "movie";

  if (lower.includes("tv") || lower.includes("show") || lower.includes("series")) {
    type = "series";
  }

  let genre = genreList.find(g => lower.includes(g)) || findClosestGenre(lower);

  let startYear = null, endYear = null;

  const decadeMatch = lower.match(/(\d{2})s/);
  if (decadeMatch) {
    const decade = parseInt(decadeMatch[1]);
    startYear = decade < 30 ? 2000 + decade : 1900 + decade;
    endYear = startYear + 9;
  }

  const lastYearsMatch =
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
  ).trim();

  if (cleanedInput.length > 0) {
    searchTerm = cleanedInput;
  }

  return { type, genre, startYear, endYear, searchTerm };
}

/**
 * Detects queries like "movies with Tom Hanks" or "15 Brad Pitt films".
 */
export function parseActorQuery(text) {
  const lower = text.toLowerCase();

  // Extract number if provided
  const numberMatch = text.match(/\b\d+\b/);
  const count = numberMatch ? parseInt(numberMatch[0], 10) : null;

  const actorMatch = text.match(/\b(?:with|starring|featuring)\s+([a-zA-Z\s]+)$/i);
  if (actorMatch) {
    const actorName = actorMatch[1].trim();
    return {
      type: lower.includes("tv") || lower.includes("series") ? "series" : "movie",
      actor: actorName,
      requestedCount: count || null,
    };
  }

  return null;
}

export function isFollowUp(text) {
  const lower = text.toLowerCase();
  return lower.startsWith("show me more") ||
         lower.startsWith("next") ||
         lower.startsWith("more");
}
