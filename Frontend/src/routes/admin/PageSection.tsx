import { useEffect, useState } from "react";
import { useGetSectionsByPageIdQuery, useUpdateSectionMutation } from "../../services/apis/pageApi";
import ContentEditor from "../../components/ContentEditor";
import type { Section } from "../../types";

function PageSection({ page }: { page: number }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [localSections, setLocalSections] = useState<Section[]>([]);

  const { data: sections = [], isLoading: sectionsLoading, isError: sectionsError } = useGetSectionsByPageIdQuery(page);
  const [updateSection, { isLoading: isUpdating }] = useUpdateSectionMutation();

  useEffect(() => {
    if (sections.length > 0) {
      setLocalSections(sections as Section[]);
      if (activeTab === null) {
        setActiveTab(sections[0].id);
      }
    }
  }, [sections, activeTab]);

  const handleContentChange = (
    sectionId: number,
    contentId: number,
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

  const saveSection = async (sectionId: number) => {
    const section = localSections.find(s => s.id === sectionId);
    if (!section?.contents) return;

    try {
      await updateSection({ sectionId, content: section.contents }).unwrap();
      alert("Section updated!");
    } catch (error) {
      alert("Error updating section!");
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

          {sortedContent.map((item) => {

            return <ContentEditor
              key={item.id}
              content={item}
              sectionId={section.id}
              onChange={handleContentChange}
            />
          })}

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
  
  if (sectionsLoading) return <div>Loading...</div>;
  if (sectionsError) return <div>Error loading data</div>;
    
  return (
    <div>
      {/* Section Tabs */}
      <nav className="flex border-b border-gray-300 mb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm ${activeTab === section.id
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
