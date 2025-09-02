import { useEffect, useState } from "react";
import { useGetSectionsByPageIdQuery, useUpdateSectionMutation } from "../../services/apis/pageApi";
import { useGetAllMediaQuery } from "../../services/apis/mediaApi";

interface ContentBlock {
  id: number;
  contentKey: string;
  contentType: string;
  value: string | null;
  sortOrder: number;
  // Add other fields as needed
}

interface Section {
  id: number;
  pageId: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  backgroundMediaId?: number;
  contents?: ContentBlock[];
}

// interface MediaItem {
//   id: number;
//   fileName: string;
//   mediaUrl: string;
//   mediaType: string;
//   altText?: string;
// }


function PageSection({ page }: { page: number }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [localSections, setLocalSections] = useState<Section[]>([]);

  const { data: sections = [], isLoading: sectionsLoading, isError: sectionsError } = useGetSectionsByPageIdQuery(page);
  const { data: media = [], isLoading: mediaLoading, isError: mediaError } = useGetAllMediaQuery();
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
    if (!section?.content) return;

    try {
      await updateSection({ sectionId, content: section.content }).unwrap();
      alert("Section updated!");
    } catch (error) {
      alert("Error updating section!");
    }
  };

  const renderContent = () => {
      const section = localSections.find(s => s.id === activeTab);
      if (!section) return <div className="p-4">No content available for this section.</div>;
    console.log(section);
    
      const sortedContent = [...(section.contents || [])].sort((a, b) => 
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );
      
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{section.name}</h2>

          {sortedContent.map((item) => {
            // const label = item.contentType.charAt(0).toUpperCase() + item.contentType.slice(1);
            const label = item.contentKey.split("-").map(si => si.charAt(0).toUpperCase() + si.slice(1));
            console.log(item);

            return (
              <div key={item.id} className="mb-4">
                <h3 className="text-lg font-medium">
                  {label}
                </h3>

                {/* Heading */}
                {item.contentType === "text" && (
                  <input
                    type="text"
                    value={item.value || ""}
                    onChange={(e) =>
                      handleContentChange(section.id, item.id, e.target.value, "value")
                    }
                    className="w-full p-2 border rounded-md"
                  />
                )}

                {/* Paragraph */}
                {item.contentType === "html" && (
                  <textarea
                    value={item.value || ""}
                    onChange={(e) =>
                      handleContentChange(section.id, item.id, e.target.value, "value")
                    }
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                )}

                {/* Image */}
                {item.contentType === "image" && (
                  <>
                    {/* Preview */}
                    {item.value && (
                      <img
                        src={
                          media.find((m) => m.id === Number(item.value))?.mediaUrl ||
                          item.value
                        }
                        alt={
                          media.find((m) => m.id === Number(item.value))?.altText || `Image ${item.id}`
                        }
                        className="w-25 h-25 rounded-md mb-2 border"
                      />
                    )}

                    {/* Dropdown */}
                    <select
                      value={item.value || ""}
                      onChange={(e) =>
                        handleContentChange(section.id, item.id, e.target.value, "value")
                      }
                      className="w-100 p-2 border rounded-md"
                    >
                      <option value="">-- Select an image --</option>
                      {media.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.altText || m.fileName || `Image ${m.id}`}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            );
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
  
  if (sectionsLoading || mediaLoading) return <div>Loading...</div>;
  if (sectionsError || mediaError) return <div>Error loading data</div>;
    
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
