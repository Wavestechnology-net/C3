import { useEffect, useState } from "react";
import {
  useGetSectionsByPageIdQuery,
  useUpdateSectionMutation,
} from "../../services/apis/pageApi";

import ContentEditor from "../../components/ContentEditor";
import type { Section } from "../../types";

import {
  Layers3,
  Save,
  Sparkles,
} from "lucide-react";

function PageSection({ page }: { page: number }) {
  const [activeTab, setActiveTab] =
    useState<number | null>(null);

  const [localSections, setLocalSections] = useState<
    Section[]
  >([]);

  const {
    data: sections = [],
    isLoading: sectionsLoading,
    isError: sectionsError,
  } = useGetSectionsByPageIdQuery(page);

  const [updateSection, { isLoading: isUpdating }] =
    useUpdateSectionMutation();

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
    setLocalSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            contents: section.contents?.map((block) =>
              block.id === contentId
                ? {
                  ...block,
                  [field]: newValue,
                }
                : block
            ),
          }
          : section
      )
    );
  };

  const saveSection = async (sectionId: number) => {
    const section = localSections.find(
      (s) => s.id === sectionId
    );

    if (!section?.contents) return;

    try {
      await updateSection({
        sectionId,
        content: section.contents,
      }).unwrap();

      alert("Section updated successfully!");
    } catch (error) {
      alert("Error updating section!");
    }
  };

  const renderContent = () => {
    const section = localSections.find(
      (s) => s.id === activeTab
    );

    if (!section)
      return (
        <div className="p-6 text-gray-500">
          No content available.
        </div>
      );

    const sortedContent = [
      ...(section.contents || []),
    ].sort(
      (a, b) =>
        (a.sortOrder ?? 0) -
        (b.sortOrder ?? 0)
    );

    return (
      <div className="space-y-6">
        {/* SECTION HEADER */}
        <div
          className="
          flex flex-col md:flex-row md:items-center
          md:justify-between gap-4
          bg-gradient-to-r from-[#fff7d1] to-[#fffdf3]
          border border-yellow-100
          rounded-3xl
          p-6
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-yellow-400 to-yellow-500
              flex items-center justify-center
              shadow-md
            "
            >
              <Sparkles
                className="text-white"
                size={24}
              />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                {section.name}
              </h2>

              <p className="text-gray-500 mt-1">
                Edit and manage section content
              </p>
            </div>
          </div>

          <button
            onClick={() => saveSection(section.id)}
            disabled={isUpdating}
            className="
            inline-flex items-center gap-3
            bg-gradient-to-r from-black to-gray-800
            hover:from-gray-900 hover:to-black
            text-white
            px-6 py-3
            rounded-2xl
            font-semibold
            shadow-md
            transition-all duration-200
            disabled:opacity-50
          "
          >
            <Save size={18} />

            {isUpdating
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>

        {/* CONTENT BLOCKS */}
        {/* <div className="space-y-5"> */}
        <div className="space-y-5 max-w-5xl mx-auto">
          {sortedContent.map((item) => (
            <div
              key={item.id}
              className="
              bg-[#fffef9]
              border border-yellow-100
              rounded-[28px]
              p-5
              shadow-sm
            "
            >
              <ContentEditor
                content={item}
                sectionId={section.id}
                onChange={handleContentChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (sectionsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (sectionsError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6">
        Error loading sections
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SECTION TABS */}
      <div
        className="
        bg-[#fffdf8]
        border border-yellow-100
        rounded-[28px]
        p-4
      "
      >
        <div className="flex flex-wrap gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`
                flex items-center gap-3
                px-5 py-3 rounded-2xl
                transition-all duration-200
                border text-sm font-semibold
                ${activeTab === section.id
                  ? `
                      bg-gradient-to-r
                      from-yellow-400 to-yellow-500
                      text-black
                      border-yellow-400
                      shadow-md
                    `
                  : `
                      bg-white
                      border-yellow-100
                      text-gray-700
                      hover:bg-yellow-50
                      hover:border-yellow-300
                    `
                }
              `}
            >
              <Layers3 size={16} />

              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div>{renderContent()}</div>
    </div>
  );
}

export default PageSection;