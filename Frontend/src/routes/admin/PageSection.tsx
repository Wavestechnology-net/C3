import { useEffect, useState } from "react";
import * as pageService from "../../services/pageService";
import ContentEditor from "../../components/ContentEditor";
import type { SectionDto } from "../../types";

function PageSection({ pageId }: { pageId: string }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [localSections, setLocalSections] = useState<SectionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      if (!pageId) return;
      setIsLoading(true);
      setIsError(false);
      try {
        const sectionsData = await pageService.getSectionsByPageId(pageId);
        setLocalSections(sectionsData);
        if (sectionsData.length > 0 && !activeTab) {
          setActiveTab(sectionsData[0].id);
        }
      } catch (error) {
        setIsError(true);
        console.error("Failed to fetch sections:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, [pageId, activeTab]);

  const handleContentChange = (
    sectionId: string,
    contentId: string,
    newValue: string,
    field: string = "value"
  ) => {
    setLocalSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contents: section.contents?.map(block =>
                block.id === contentId ? { ...block, [field]: newValue } : block
              ) || []
            }
          : section
      )
    );
  };

  const saveSection = async (sectionId: string) => {
    const section = localSections.find(s => s.id === sectionId);
    if (!section?.contents) return;

    setIsUpdating(true);
    try {
      await pageService.updateSection(pageId, sectionId, section.contents);
      alert("Section updated!");
    } catch (error) {
      alert("Error updating section!");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderContent = () => {
      const section = localSections.find(s => s.id === activeTab);
      if (!section) return <div className="p-4">No content available for this section.</div>;
    
      const sortedContent = [...(section.contents || [])].sort((a, b) => 
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );
      
      return (
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">{section.name}</h2>

          {sortedContent.map((item) => (
            <ContentEditor
              key={item.id}
              content={item}
              sectionId={section.id}
              onChange={handleContentChange}
            />
          ))}

          <button
            onClick={() => saveSection(section.id)}
            disabled={isUpdating}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      );
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
    
  return (
    <div>
      {/* Section Tabs */}
      <nav className="flex border-b border-gray-300 mb-4">
        {localSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm ${
              activeTab === section.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
              }`}
          >
            {section.name}
          </button>
        ))}
      </nav>

      <div>{renderContent()}</div>
    </div>
  );
}

export default PageSection;
