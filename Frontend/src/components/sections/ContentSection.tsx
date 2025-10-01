import type { ContentDto, SectionDto } from "../../types";

export default function ContentSection({ section }: { section: SectionDto }){
  const getContentByType = (content: ContentDto) => {
    switch (content.contentType) {
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

  return (
    <section className={`py-16 px-4 ${section.sortOrder === 3 ? 'bg-[#f3f3f3]' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto">
        {section.contents?.map((content: ContentDto) => (
          <div key={content.id} className="mb-6">
            {content.contentKey === 'headline' && (
              <h2 className="text-3xl font-bold uppercase mb-4 text-center">
                {content.value}
              </h2>
            )}
            {content.contentKey === 'subheading-1' && (
              <h3 className="text-2xl font-bold mb-3">
                {content.value}
              </h3>
            )}
            {(content.contentKey.includes('text') || 
              content.contentKey.includes('description') ||
              content.contentKey.includes('content') ||
              content.contentKey === 'intro-text'
            ) && 
             content.contentKey !== 'headline' && 
             content.contentKey !== 'subheading-1' && (
              <div className="text-lg text-gray-700 mb-4 wysiwyg">
                {getContentByType(content)}
              </div>
            )}
            {content.contentKey.includes('benefits') || 
             content.contentKey.includes('reasons') || 
             content.contentKey.includes('pillars') || 
             content.contentKey.includes('areas') || 
             content.contentKey.includes('opportunities') && (
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