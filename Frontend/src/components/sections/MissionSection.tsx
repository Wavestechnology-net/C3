import { useContentByKey, useSectionContent, type PageData } from "@/hooks/usePublicPage";
import { useMedia } from "../../hooks/useMedia";
import type { Section } from "@/types/database";

interface MissionSectionProps {
  section: Section;
  pageData: PageData
}

export default function MissionSection({ section, pageData }: MissionSectionProps) {
  // const imageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'image');
  const {content, hasContent} = useSectionContent(pageData, section.id)
  const imageContent = useContentByKey(content || [], 'image');
  const imageMediaId = imageContent?.value ? parseInt(imageContent.value) : null;
  const { getMediaUrl } = useMedia();

  const imageUrl = imageMediaId ? getMediaUrl(imageMediaId) : "/placeholder-image.jpg"

//   const imageUrl = imageMediaId 
//     ? (getMediaUrl(imageMediaId) as string)
//     : '/placeholder-image.jpg';

  const headline = useContentByKey(content || [], 'headline');
  const sectionContent = content?.find((c) => 
    c.content_key.includes('content') || c.content_key === 'intro-text'
  );
  console.log("sectionContent: ", sectionContent);
  
  if(!hasContent) return;

  return (
    <section className="bg-[#dadf26] py-10 px-4 relative overflow-visible">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          {headline && (
            <h2 className="text-3xl font-bold uppercase">
              {headline.value}
            </h2>
          )}
          {sectionContent && (
            <div className="text-white text-lg">
              {sectionContent.content_type === 'html' ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: sectionContent.value || '' }} 
                  className="leading-relaxed"
                />
              ) : (
                <p className="leading-relaxed">{sectionContent.value}</p>
              )}
            </div>
          )}
        </div>

        <div className="relative -mt-10 md:-mt-20 z-10">
          <img
            src={imageUrl}
            alt={"Mission section image"}
            className="w-full max-w-md mx-auto shadow-xl rounded"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
      </div>
    </section>
  );
}