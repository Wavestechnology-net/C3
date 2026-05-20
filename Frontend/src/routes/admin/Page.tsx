import { useState } from "react";
import PageSection from "./PageSection";
import { useGetPagesQuery } from "../../services/apis/pageApi";

const Page = () => {
  const { data: pages = [], isLoading, isError, error } = useGetPagesQuery();
  const [activeTab, setActiveTab] = useState<number>();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.toString()}</p>;

  return (
    // <Layout title="Admin Tabs Page">
    <div>
      {/* Tabs Navigation */}
      <nav className="flex border-b border-gray-300 mb-4">
        {pages.length === 0 ? (
          <p>No pages found</p>
        ) : (
          pages.map((page) => (
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
    // </Layout>
  );
};

export default Page;
