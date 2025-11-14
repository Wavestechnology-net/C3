import type { Content, Section } from "@/types/database";
import { useSectionContent, type PageData } from "@/hooks/usePublicPage";

export default function ContentSection({ section, pageData }: { section: Section, pageData: PageData }){
  const sectionId = section.id
  const {content, hasContent} = useSectionContent(pageData, sectionId)
  
  const getContentByType = (content: Content) => {
    switch (content.content_type) {
      case 'html':
        return <div dangerouslySetInnerHTML={{ __html: content.value || '' }} />;
      case 'text':
        return <p className="text-lg">{content.value}</p>;
      case 'json':
        try {
          const jsonData = JSON.parse(content.value || '{}');
          if (jsonData.items) {
            return (
              <ul className="list-inside space-y-2">
                {jsonData.items.map((item: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                    {item.title && <strong className="mr-2">{item.title}:</strong>}
                    <span>{item.description || item}</span>
                  </li>
                ))}
              </ul>
            );
          }
        } catch (e) {
          return <p className="text-lg">{content.value}</p>;
        }
        return <p>{content.value}</p>;
      default:
        return <p>{content.value}</p>;
    }
  };

  if(!hasContent) return;

  return (
    <section className={`py-16 px-4 ${section.sort_order === 3 ? 'bg-[#f3f3f3]' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto">
        {content?.map((content) => (
          <div key={content.id} className="mb-6">
            {content.content_key === 'headline' && (
              <h2 className="text-3xl font-bold uppercase mb-4 text-center">
                {content.value}
              </h2>
            )}
            {content.content_key === 'subheading-1' && (
              <h3 className="text-2xl font-bold mb-3">
                {content.value}
              </h3>
            )}
            {(content.content_key.includes('text') || 
              content.content_key.includes('description') ||
              content.content_key.includes('content') ||
              content.content_key === 'intro-text'
            ) && 
             content.content_key !== 'headline' && 
             content.content_key !== 'subheading-1' && (
              <div className="text-lg text-gray-700 mb-4 wysiwyg">
                {getContentByType(content)}
              </div>
            )}
            {content.content_key.includes('benefits') || 
             content.content_key.includes('reasons') || 
             content.content_key.includes('pillars') || 
             content.content_key.includes('areas') || 
             content.content_key.includes('opportunities') && (
              <div className="text-lg mb-4">
                {getContentByType(content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};