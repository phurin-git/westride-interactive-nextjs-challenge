"use client";

import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import SearchBar from "@/components/search/SearchBar";
import ResultCard from "@/components/search/ResultCard";
import SearchHistory from "@/components/search/SearchHistory";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  [key: string]: unknown;
}

export default function SearchPage() {
  const { state, dispatch } = useAppContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAPI = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "3e974fca",
          s: searchQuery,
          type: "movie",
        },
      });

      if (response.data.Response === "True") {
        const formattedResults = response.data.Search.map(
          (item: SearchResult) => ({
            id: item.imdbID,
            title: item.Title,
            description: `${item.Year} • ${item.Type}`,
            imageUrl: item.Poster !== "N/A" ? item.Poster : "/placeholder.png",
            url: `https://www.imdb.com/title/${item.imdbID}`,
          }),
        );

        setResults(formattedResults);
        dispatch({ type: "ADD_SEARCH", payload: searchQuery });
      } else {
        setResults([]);
        setError(response.data.Error || "ไม่พบผลลัพธ์");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("เกิดข้อผิดพลาดในการค้นหา โปรดลองอีกครั้ง");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    searchAPI(searchQuery);
  };

  const handleHistoryItemClick = (historyItem: string) => {
    setQuery(historyItem);
    searchAPI(historyItem);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-6 text-center">ค้นหาภาพยนตร์</h1>

      <div className="max-w-3xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>

      {state.searchHistory.length > 0 && (
        <div className="max-w-3xl mx-auto mb-8">
          <SearchHistory
            history={state.searchHistory}
            onItemClick={handleHistoryItemClick}
            onClear={() => dispatch({ type: "CLEAR_SEARCH_HISTORY" })}
          />
        </div>
      )}

      {loading && (
        <div className="flex justify-center my-12">
          <LoadingSpinner />
        </div>
      )}

      {error && !loading && (
        <div className="max-w-3xl mx-auto my-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
          {error}
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}

      {!loading && !error && results.length === 0 && query && (
        <div className="text-center my-12 text-gray-500">
          ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
