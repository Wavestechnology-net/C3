"use client";

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    date: "June 20, 2025",
    title: "Join Us For Rec Fall 2025!",
    text: "C3FC Soccer REC introduces young players to the beautiful game. Sign up today!",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/65367f1687e2a681b00a3a8a_Screenshot%202023-10-23%20at%209.10.26%E2%80%AFAM-p-500.jpg",
  },
  {
    date: "July 10, 2025",
    title: "Elite Training Sessions Open",
    text: "Elite players can now register for exclusive sessions.",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/65367f1687e2a681b00a3a8a_Screenshot%202023-10-23%20at%209.10.26%E2%80%AFAM-p-500.jpg",
  },
  {
    date: "August 1, 2025",
    title: "Upcoming Tournament Info",
    text: "Prepare for the summer tournament with our training camps.",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/65367f1687e2a681b00a3a8a_Screenshot%202023-10-23%20at%209.10.26%E2%80%AFAM-p-500.jpg",
  },
];

export const EventCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="flex flex-col md:flex-row h-[500px] justify-center mt-10 md:mt-16 ">
      {/* Left Column - Slider */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide, index) => (
              <div
                className="min-w-full flex flex-col items-center justify-center p-6"
                key={index}
              >
                <img
                  src={slide.img}
                  alt={`Slide ${index}`}
                  className="w-72 h-44 object-cover rounded mb-4"
                />
                <p className="text-lg text-gray-700 mb-2">{slide.date}</p>
                <span className="bg-white text-black font-semibold px-4 py-2 rounded border border-black">
                  LEARN MORE
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/3 left-20 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/3 right-20 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
        >
          ▶
        </button>
      </div>

      {/* Right Column - Static Content */}
      <div className="w-full md:w-1/4 flex flex-col justify-start p-8 md:text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">EVENTS</h1>
        <p className="text-xl mb-6 text-red-600 font-bold">
          YOU DONT WANT TO MISS
        </p>
        <button className="bg-yellow-300 text-black font-bold px-2 py-2 rounded">
          EVENTS SCHEDULE
        </button>
      </div>
    </div>
  );
};
