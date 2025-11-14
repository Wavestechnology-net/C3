// components/sections/CarouselSection.tsx
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useMedia } from "../../hooks/useMedia";
import { useContentByKey, useSectionContent, type PageData } from "@/hooks/usePublicPage";

interface CarouselSectionProps {
    sectionId: number;
    pageData: PageData;
  // section: SectionDto;
  // mediaUrls?: Record<number, string>;
}

export default function CarouselSection({ sectionId, pageData }: CarouselSectionProps){
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  const { content } = useSectionContent(pageData, sectionId);

  const carouselContent = useContentByKey(content || [], 'carousel-slides');
  const sectionTitle = useContentByKey(content || [], 'section-title');

  const {getMediaUrl} = useMedia()
  
  // const carouselContent = section.contents?.find((c: ContentDto) => c.contentKey === 'carousel-slides');
  
  const slides = carouselContent?.value ? JSON.parse(carouselContent.value) : [];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (slides.length === 0) {
    return (
      <section className="relative bg-blue-700 text-white py-10">
        <div className="absolute top-0 left-30 bg-yellow-400 text-black px-12 py-10 font-bold shadow-lg skew-x-[-15deg]">
          {sectionTitle && (
            <span className="block skew-x-[15deg]">
            {/* {content?.find((c: ContentDto) => c.contentKey === 'section-title')?.value || "WHAT'S NEW"} */}
          </span>
          )}
        </div>
        <div className="w-full h-[500px] flex items-center justify-center">
          <p className="text-xl">No carousel content available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-blue-700 text-white py-10">
      {/* Floating Tag */}
      <div className="absolute top-0 left-30 bg-yellow-400 text-black px-12 py-10 font-bold shadow-lg skew-x-[-15deg] z-10">
          {sectionTitle && (
        <span className="block skew-x-[15deg]">
          {/* {section.contents?.find((c: ContentDto) => c.contentKey === 'section-title')?.value || "WHAT'S NEW"} */}
        </span>
          )}
      </div>

      <div className="w-full h-[500px] relative">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {slides.map((slide: any, index: number) => {
              const imageUrl = slide.imageId 
                ? getMediaUrl(slide.imageId)
                : '/placeholder-slide.jpg';
              
              return (
                <div
                  className="min-w-full flex flex-col md:flex-row items-center p-4 mt-10 h-full"
                  key={index}
                >
                  <img
                    src={imageUrl}
                    alt={slide.title || `Slide ${index + 1}`}
                    className="w-120 h-70 rounded ms-20 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-slide.jpg';
                    }}
                  />
                  <div className="md:ml-25 mt-4 md:mt-0 text-center md:text-left">
                    {slide.title && (
                      <h1 className="text-4xl font-bold mb-2 text-white">
                        {slide.title}
                      </h1>
                    )}
                    {slide.text && (
                      <p className="mb-4 text-xl text-white">{slide.text}</p>
                    )}
                    {slide.ctaText && (
                      <button className="bg-white text-black font-bold px-4 py-2 rounded">
                        {slide.ctaText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
        >
          ▶
        </button>
      </div>
    </section>
  );
};