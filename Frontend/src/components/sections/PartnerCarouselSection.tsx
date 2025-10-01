import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { ContentDto, SectionDto } from "../../types";
import { useMedia } from "../../hooks/useMedia";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface PartnerCarouselSectionProps {
  section: SectionDto;
  // mediaUrls?: Record<number, string>;
}

export default function PartnerCarouselSection({ section }: PartnerCarouselSectionProps){
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  const {getMediaUrl} = useMedia()
  
  const carouselContent = section.contents?.find((c: ContentDto) => c.contentKey === 'carousel-slides');
  const slides = carouselContent?.value ? JSON.parse(carouselContent.value) : [];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="bg-yellow-300 py-10">
      <div className="flex flex-col md:flex-row h-[450px] justify-center">
        {/* Right Column - Static Content */}
        <div className="w-full md:w-1/3 flex flex-col justify-start p-8 md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-black uppercase">
            {section.contents?.find((c: ContentDto) => c.contentKey === 'section-title')?.value || 'We\'re proud of the support of our partners'}
          </h1>
          <Button className="md:w-1/2 bg-blue-300 text-black font-bold px-4 py-3 rounded cursor-pointer hover:bg-blue-400 transition-colors" asChild>
            <Link to={section.contents?.find((c: ContentDto) => c.contentKey === 'cta-link')?.value}>
              {section.contents?.find((c: ContentDto) => c.contentKey === 'cta-text')?.value || 'Become a Partner'}
            </Link>
          </Button>
        </div>

        {/* Left Column - Slider */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container flex">
              {slides.map((slide: any, index: number) => {
                const imageUrl = slide.imageId 
                  ? getMediaUrl(slide.imageId) as string
                  : '/placeholder-partner.jpg';
                
                return (
                  <div
                    className="min-w-full flex flex-col items-center justify-center p-6"
                    key={index}
                  >
                    <img
                      src={imageUrl}
                      alt={slide.title || `Partner Slide ${index + 1}`}
                      className="w-72 h-44 object-cover rounded mb-4"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-partner.jpg';
                      }}
                    />
                    {slide.date && (
                      <p className="text-lg text-gray-700 mb-2">{slide.date}</p>
                    )}
                    <Button className="md:w-1/2 bg-blue-300 text-black font-bold px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transition-colors" asChild>
                      <Link to={slide.ctaLink}>
                        {slide.ctaText || 'LEARN MORE'}
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-20 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
          >
            ◀
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-20 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};