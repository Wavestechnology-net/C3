import { useMedia } from "../../hooks/useMedia";
import type { ContentDto, SectionDto } from "../../types";

interface ContentImageSectionProps {
  section: SectionDto;
  // mediaUrls?: Record<number, string>;
  reverse?: boolean;
}

export default function ContentImageSection({ section, reverse = false }: ContentImageSectionProps){
  const imageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'image');
  const imageMediaId = imageContent?.value ? parseInt(imageContent.value) : null;
  const {getMediaUrl} = useMedia()

  const imageUrl = imageMediaId 
    ? getMediaUrl(imageMediaId) as string
    : '/placeholder-image.jpg';

  const renderContent = () => (
    <div className="space-y-6">
      {section.contents?.map((content: ContentDto) => {
        if (content.contentKey === 'headline') {
          return (
            <h2 key={content.id} className="text-3xl font-bold mb-4 uppercase">
              {content.value}
            </h2>
          );
        }
        if (content.contentKey.includes('content') || content.contentKey === 'intro-text') {
          return (
            <div key={content.id} className="text-gray-700">
              {content.contentType === 'html' ? (
                <>
                <div className="wysiwyg max-w-none" dangerouslySetInnerHTML={{ __html: content.value || '' }} />
                </>
              ) : (
                <p>{content.value}</p>
              )}
            </div>
          );
        }
        // if (content.contentKey.includes('programs-list')) {
        //   try {
        //     const programs = JSON.parse(content.value || '[]');
        //     return (
        //       <ul key={content.id} className="list-none list-inside space-y-1">
        //         {programs.map((program: string, index: number) => (
        //           <li key={index}>
        //             <span className="text-yellow-400 font-bold mr-2">{'>'}</span>
        //             {program}
        //           </li>
        //         ))}
        //       </ul>
        //     );
        //   } catch (e) {
        //     return (
        //       <p key={content.id}>{content.value}</p>
        //     );
        //   }
        // }
        if (content.contentKey === 'cta-text') {
          return (
            <button 
              key={content.id} 
              className="mt-4 bg-yellow-300 text-black font-bold px-6 py-2 hover:bg-yellow-400 transition-colors"
            >
              {content.value}
            </button>
          );
        }
        return null;
      })}
    </div>
  );

  const renderImage = () => (
    <img 
      src={imageUrl} 
      alt="Section content" 
      className="rounded-lg w-full object-cover"
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/placeholder-image.jpg';
      }}
    />
  );

  // if (isMissionSection) {
  //   return (
  //     <section className="bg-[#dadf26] py-10 px-4 relative overflow-visible">
  //       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
  //         <div className="space-y-4">
  //           {section.contents?.map((content: ContentDto) => {
  //             if (content.contentKey === 'headline') {
  //               return (
  //                 <h2 key={content.id} className="text-3xl font-bold uppercase">
  //                   {content.value}
  //                 </h2>
  //               );
  //             }
  //             if (content.contentKey.includes('content') || content.contentKey === 'intro-text') {
  //               return (
  //                 <p key={content.id} className="text-white text-lg">
  //                   {content.contentType === 'html' ? (
  //                     <div dangerouslySetInnerHTML={{ __html: content.value || '' }} />
  //                   ) : (
  //                     content.value
  //                   )}
  //                 </p>
  //               );
  //             }
  //             return null;
  //           })}
  //         </div>

  //         <div className="relative -mt-10 md:-mt-20 z-10">
  //           <img
  //             src={imageUrl}
  //             alt="Section content"
  //             className="w-full max-w-md mx-auto shadow-xl rounded"
  //             loading="lazy"
  //             onError={(e) => {
  //               const target = e.target as HTMLImageElement;
  //               target.src = '/placeholder-image.jpg';
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-8 items-start">
      {reverse ? (
        <>
          {renderImage()}
          {renderContent()}
        </>
      ) : (
        <>
          {renderContent()}
          {renderImage()}
        </>
      )}
    </section>
  );
};