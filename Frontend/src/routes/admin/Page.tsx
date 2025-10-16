import { useState, useEffect } from "react";
import PageSection from "./PageSection";
import * as pageService from "../../services/pageService";
import type { PageDto } from "../../types";

const Page = () => {
  const [pages, setPages] = useState<PageDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const pagesData = await pageService.getPages();
        setPages(pagesData);
        if (pagesData.length > 0 && !activeTab) {
          setActiveTab(pagesData[0].id.toString());
        }
      } catch (error) {
        setIsError(true);
        console.error("Failed to fetch pages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, [activeTab]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching pages.</p>;

  return (
      <div>
        <nav className="flex border-b border-gray-300 mb-4">
          {pages.length === 0 ? (
            <p>No pages found</p>
          ) : (
            pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id.toString())}
                className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm ${
                  activeTab === page.id.toString()
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
                  }`}
              >
                {page.title}
              </button>
            )))} 
        </nav>

        {activeTab && <PageSection pageId={activeTab} />}
      </div>
  );
};

export default Page;
