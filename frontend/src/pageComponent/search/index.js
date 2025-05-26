// app/search/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getSearchData } from "@/api/searchAPI";
import Link from "next/link";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      getSearchData(query).then((data) => {
        setResults(data || []);
        setIsLoading(false);
      });
    }
  }, [query]);

  // Function to check if the URL points to a video file
  const isVideoFile = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".wmv"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <section className="wrapper">
      <div className="min-h-screen bg-[#171717] text-gray-200">
        <div className="container px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              Результаты поиска
            </h1>
            <p className="text-gray-400">
              Найдено {results.length} результатов для "
              <span className="text-white">{query}</span>"
            </p>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="bg-[#222222] p-6 rounded-lg">
                <p className="text-gray-400">Загрузка результатов...</p>
              </div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 hover:bg-[#222222] transition-colors duration-200 rounded border-l-4 border-white"
                >
                  {/* Preview container */}
                  <div className="flex-shrink-0 w-24 h-24 ml-6 relative border-2 border-white-500 rounded flex items-center justify-center bg-black">
                    {result.image ? (
                      isVideoFile(result?.image) ? (
                        // Video thumbnail with play icon overlay
                        <div className="relative w-full h-full">
                          <video
                            className="w-full h-full object-cover rounded opacity-75"
                            src={result.image}
                            muted
                            disablePictureInPicture
                            disableRemotePlayback
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        // Regular image
                        <img
                          src={result.image}
                          alt={result.title || "Preview"}
                          className="w-full h-full object-cover rounded"
                        />
                      )
                    ) : (
                      // Fallback when no image is available
                      <div className="text-gray-500 text-xs text-center p-2">
                        No preview
                      </div>
                    )}
                  </div>

                  {/* Text content container */}
                  <div className="flex-1 pl-4">
                    <Link
                      href={result.link}
                      className="block p-4 -ml-4 rounded"
                    >
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {result.title || result.value.substring(0, 160)}...
                      </h2>
                      <p className="text-gray-400 mb-3">
                        {result.description || result.value.substring(0, 160)}
                        ...
                      </p>
                      {/* <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-2 sm:gap-4">
                        {result.date && (
                          <span className="text-gray-500">{result.date}</span>
                        )}
                        <span className="text-blue-400 break-all text-xs sm:text-sm">
                          {result.link}
                        </span>
                      </div> */}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#222222] p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Ничего не найдено
                </h2>
                <p className="text-gray-400">
                  Попробуйте изменить поисковый запрос или уточнить ключевые
                  слова.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResultPage;
