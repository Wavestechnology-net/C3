import { useEffect, useState } from "react";
import { usePage } from "../../hooks/usePage";
import ContentEditor from "../../components/ContentEditor";
import type { ContentDto } from "../../types";

function PageSection({ page }: { page: number }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [localContent, setLocalContent] = useState<ContentDto[]>([]);

  const { 
    getSectionsByPageId, 
    updateSection, 
    getContentBySectionId, 
    sections, 
    content, 
    loading, 
    error 
  } = usePage();

  // Load sections on mount or page change
  useEffect(() => {
    getSectionsByPageId(page).catch(err => {
      console.error('Failed to load sections:', err);
    });
  }, [page]);

  // Set initial active tab when sections load
  useEffect(() => {
    if (sections && sections.length > 0 && activeTab === null) {
      setActiveTab(sections[0].id);
    }
  }, [sections, activeTab]);

  // Load content when active tab changes
  useEffect(() => {
    if (activeTab) {
      getContentBySectionId(activeTab);
    }
  }, [activeTab]); // Only depend on activeTab

  // Sync local content with fetched content
  useEffect(() => {
    if (content) {
      setLocalContent(content);
    }
  }, [content]);

  const handleContentChange = (
    sectionId: number,
    contentId: number,
    newValue: string,
    field: string = "value"
  ) => {
    setLocalContent(prev =>
      prev.map(block =>
        block.id === contentId ? { ...block, [field]: newValue } : block
      )
    );
  };

  const saveSection = async (sectionId: number) => {
    if (!localContent || localContent.length === 0) {
      alert("No content to save!");
      return;
    }

    try {
      await updateSection(sectionId, localContent);
      alert("Section updated!");
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Error updating section!");
    }
  };

  const renderContent = () => {
    const section = sections?.find(s => s.id === activeTab);
    if (!section) return <div className="p-4">No content available for this section.</div>;

    if (loading.content) {
      return <div className="p-4">Loading content...</div>;
    }

    const sortedContent = [...localContent].sort((a, b) => 
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );

    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">{section.name}</h2>

        {sortedContent.length === 0 ? (
          <div className="text-gray-500">No content blocks in this section.</div>
        ) : (
          sortedContent.map((item) => (
            <ContentEditor
              key={item.id}
              content={item}
              sectionId={section.id}
              onChange={handleContentChange}
            />
          ))
        )}

        <button
          onClick={() => saveSection(section.id)}
          disabled={loading.mutation || sortedContent.length === 0}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition-colors"
        >
          {loading.mutation ? "Saving..." : "Save Changes"}
        </button>
      </div>
    );
  };
  
  if (loading.sections) return <div className="p-4">Loading sections...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading data: {error}</div>;
  if (!sections || sections.length === 0) return <div className="p-4">No sections available.</div>;
    
  return (
    <div>
      <nav className="flex border-b border-gray-300 mb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm transition-colors ${
              activeTab === section.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
            }`}
          >
            {section.name}
          </button>
        ))}
      </nav>

      {renderContent()}
    </div>
  );
}

export default PageSection;