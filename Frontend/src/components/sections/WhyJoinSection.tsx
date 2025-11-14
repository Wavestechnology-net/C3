import { useContentByKey, useSectionContent, type PageData } from "@/hooks/usePublicPage";
import { useMedia } from "../../hooks/useMedia";
import type { Section } from "@/types/database";

interface WhyJoinSectionProps {
  section: Section;
  pageData: PageData
}

export default function WhyJoinSection({ section, pageData }: WhyJoinSectionProps) {
  // const imageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'image');
  const {content, hasContent} = useSectionContent(pageData, section.id);
  const imageContent = useContentByKey(content || [], 'image');

  const imageMediaId = imageContent?.value ? parseInt(imageContent.value) : null;
  const { getMediaUrl } = useMedia();

  const imageUrl = imageMediaId ? getMediaUrl(imageMediaId) : "/placeholder-image.jpg"

  const headline = useContentByKey(content || [], 'headline');
  const sectionContent = content?.find((c) => c.content_key === 'content' || c.content_key === 'closing-text');
  const reasons = content?.find((c) => c.content_key === 'reasons' || c.content_key.includes('benefits'));

  // Parse reasons/benefits from JSON or use as array
  let reasonsList: string[] = [];
  if (reasons) {
    if (reasons.contentType === 'json') {
      try {
        const jsonData = JSON.parse(reasons.value || '{}');
        if (jsonData.items && Array.isArray(jsonData.items)) {
          reasonsList = jsonData.items.map((item: any) => 
            typeof item === 'string' ? item : item.description || item.title || ''
          );
        } else if (Array.isArray(jsonData)) {
          reasonsList = jsonData;
        }
      } catch (e) {
        console.warn('Error parsing reasons JSON:', e);
      }
    } else if (reasons.contentType === 'text') {
      // If it's just text, split by newlines or use as single item
      reasonsList = [reasons.value || ''];
    }
  }

  if(!hasContent) return;

  return (
    <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          {headline && (
            <h2 className="text-3xl font-bold uppercase">
              {headline.value}
            </h2>
          )}
          
          {reasonsList.length > 0 && (
            <ul className="list-inside pl-5 text-lg text-gray-800 space-y-2">
              {reasonsList.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-400 font-bold mr-2 mt-1">
                    {">"}
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          )}
          
          {sectionContent && (
            <div className="text-gray-800">
              {sectionContent.content_type === 'html' ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: sectionContent.value || '' }} 
                  className="wysiwyg leading-relaxed"
                />
              ) : (
                <p className="leading-relaxed">{sectionContent.value}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="relative lg:mt-10 md:-mt-1 z-10">
          <img
            src={imageUrl}
            alt={"Why join section image"}
            className="w-full max-w-md mx-auto md:-mt-1 shadow-xl rounded"
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