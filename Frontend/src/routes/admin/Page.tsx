import { useEffect, useState } from "react";
import PageSection from "./PageSection";
import { useGetPagesQuery } from "../../services/apis/pageApi";
import { LayoutGrid } from "lucide-react";

const Page = () => {
  const {
    data: pages = [],
    isLoading,
    isError,
    error,
  } = useGetPagesQuery();

  const [activeTab, setActiveTab] = useState<number>();

  useEffect(() => {
    if (pages.length > 0 && !activeTab) {
      setActiveTab(pages[0].id);
    }
  }, [pages, activeTab]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6">
        Error: {error?.toString()}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div
          className="
          w-14 h-14 rounded-2xl
          bg-gradient-to-br from-yellow-400 to-yellow-500
          flex items-center justify-center
          shadow-md
        "
        >
          <LayoutGrid className="text-white" size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Website Pages
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all CMS pages and sections
          </p>
        </div>
      </div>

      {/* PAGE TABS */}
      <div
        className="
        bg-white border border-yellow-100
        rounded-[28px]
        p-4
        shadow-sm
      "
      >
        <div className="flex flex-wrap gap-3">
          {pages.length === 0 ? (
            <div className="text-gray-500 py-4 px-2">
              No pages found
            </div>
          ) : (
            pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`
                  group relative px-6 py-3 rounded-2xl
                  transition-all duration-200
                  border font-semibold text-sm
                  ${activeTab === page.id
                    ? `
                        bg-gradient-to-r
                        from-yellow-400 to-yellow-500
                        text-black
                        border-yellow-400
                        shadow-md
                        scale-[1.02]
                      `
                    : `
                        bg-[#fffdf5]
                        border-yellow-100
                        text-gray-700
                        hover:bg-yellow-50
                        hover:border-yellow-300
                        hover:shadow-sm
                      `
                  }
                `}
              >
                <span className="relative z-10">
                  {page.title}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* CONTENT */}
      {activeTab && (
        <div
          className="
          bg-white border border-yellow-100
          rounded-[32px]
          shadow-sm
          p-6
        "
        >
          <PageSection page={activeTab} />
        </div>
      )}
    </div>
  );
};

export default Page;