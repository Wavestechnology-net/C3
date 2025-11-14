import { useEffect, useState } from "react";
import PageSection from "./PageSection";
import { usePage } from "../../hooks/usePage";

const Page = () => {
  const { pages = [], getPages, loading, error } = usePage();
  const [activeTab, setActiveTab] = useState<number>();

  useEffect(() => {
    getPages()
  }, [])

  if (loading.pages) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div>
        {/* Tabs Navigation */}
        <nav className="flex border-b border-gray-300 mb-4">
          {pages?.length === 0 ? (
            <p>No pages found</p>
          ) : (
            pages?.map((page) => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm ${activeTab === page.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
                  }`}
              >
                {page.title}
              </button>
            )))}
        </nav>

        {/* Tab Content */}
        {activeTab && <PageSection page={activeTab} />}
      </div>
  );
};

export default Page;
