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
                  {/* Image preview container */}
                  <div className="flex-shrink-0 w-24 h-24 ml-6 relative border-2 border-white-500 rounded">
                    {result.image && (
                      <img
                        src={result.image}
                        alt={result.title || "Preview"}
                        className="w-full h-full object-cover rounded"
                      />
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
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-2 sm:gap-4">
                        {result.date && (
                          <span className="text-gray-500">{result.date}</span>
                        )}
                        <span className="text-blue-400 break-all text-xs sm:text-sm">
                          {result.link}
                        </span>
                      </div>
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
