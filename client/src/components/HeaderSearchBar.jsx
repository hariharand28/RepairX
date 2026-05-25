import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Sparkles,
  Clock3,
  TrendingUp,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const trendingSearches = [
  "AC Repair",
  "Web Development",
  "Graphic Design",
  "Electrician",
  "Plumbing",
];

const recentMock = [
  "Laptop Repair",
  "UI/UX Design",
  "Photography",
];

export default function PremiumHeaderSearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(recentMock);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      navigate("/services");
      return;
    }

    // Save recent searches
    const updated = [
      trimmed,
      ...recentSearches.filter((item) => item !== trimmed),
    ].slice(0, 5);

    setRecentSearches(updated);

    localStorage.setItem(
      "recent-searches",
      JSON.stringify(updated)
    );

    navigate(`/services?q=${encodeURIComponent(trimmed)}`);
    setFocused(false);
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recent-searches");

    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Clear Search
  const clearSearch = () => {
    setQuery("");
  };

  // Quick Search Click
  const handleQuickSearch = (value) => {
    setQuery(value);
    navigate(`/services?q=${encodeURIComponent(value)}`);
    setFocused(false);
  };

  return (
    <div
      ref={wrapperRef}
cclassName="relative w-[320px]"
    >
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div
          className={`
            flex items-center gap-3
            bg-white/80 backdrop-blur-xl
            border border-gray-200/70
            rounded-2xl
            px-4 py-3
            shadow-sm
            transition-all duration-300
            hover:shadow-md
            ${
              focused
                ? "ring-2 ring-blue-500 shadow-lg scale-[1.01]"
                : ""
            }
          `}
        >
          {/* Search Icon */}
          <div className="flex items-center justify-center">
            <Search
              size={18}
              className={`
                transition-colors duration-300
                ${
                  focused
                    ? "text-blue-600"
                    : "text-gray-400"
                }
              `}
            />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search services, vendors, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            className="
              flex-1 bg-transparent outline-none
              text-sm text-gray-800
              placeholder:text-gray-400
            "
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="
                p-1 rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <X
                size={15}
                className="text-gray-400"
              />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="
              flex items-center gap-2
              bg-gradient-to-r
              from-blue-600 to-indigo-600
              hover:from-blue-700
              hover:to-indigo-700
              text-white
              px-4 py-2
              rounded-xl
              text-sm font-medium
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            <Sparkles size={15} />
            Search
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {focused && (
        <div
          className="
            absolute top-full mt-3
            w-full
            bg-white/95 backdrop-blur-xl
            border border-gray-200/70
            rounded-2xl
            shadow-2xl
            p-4
            z-50
            animate-in fade-in slide-in-from-top-2
            duration-200
          "
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock3
                  size={16}
                  className="text-gray-500"
                />
                <h4 className="text-sm font-semibold text-gray-700">
                  Recent Searches
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleQuickSearch(item)
                    }
                    className="
                      px-3 py-1.5
                      rounded-full
                      bg-gray-100
                      hover:bg-blue-50
                      hover:text-blue-600
                      text-xs font-medium
                      transition-all
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp
                size={16}
                className="text-orange-500"
              />
              <h4 className="text-sm font-semibold text-gray-700">
                Trending Searches
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleQuickSearch(item)
                  }
                  className="
                    px-3 py-1.5
                    rounded-full
                    bg-orange-50
                    hover:bg-orange-100
                    text-orange-600
                    text-xs font-semibold
                    transition-all
                  "
                >
                  🔥 {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}