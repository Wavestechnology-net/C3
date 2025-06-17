"use client"

import { useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"


const slides = [
  {
    title: "Join Us For Rec Fall 2025!",
    text: "RISE REC introduces young players to the beautiful game. Sign up today!",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64c88ba15c2d8268a2128fa4_Screenshot%202023-07-31%20at%2011.35.04%20PM-p-800.jpg"
  },
  {
    title: "Elite Training Sessions Open",
    text: "Elite players can now register for exclusive sessions.",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64c88ba15c2d8268a2128fa4_Screenshot%202023-07-31%20at%2011.35.04%20PM-p-800.jpg"
  },
  {
    title: "Upcoming Tournament Info",
    text: "Prepare for the summer tournament with our training camps.",
    img: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64c88ba15c2d8268a2128fa4_Screenshot%202023-07-31%20at%2011.35.04%20PM-p-800.jpg"
  }
]

export const EmblaCarousel = () => {

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="embla h-[400px] md:h-[500px] relative overflow-hidden">
  <div className="embla__viewport h-full " ref={emblaRef}>
    <div className="embla__container flex h-full" >
    {/* <div className="overflow-hidden bg-yellow-300 p-4 rounded-lg" ref={emblaRef}>
      <div className="flex"> */}
        {slides.map((slide, index) => (
          <div className="min-w-full flex flex-col md:flex-row items-center p-4 mt-10 h-full" key={index}>
            <img
              src={slide.img}
              alt={`Slide ${index}`}
              className="w-120 h-70 rounded ms-20"
            />
            <div className="md:ml-25 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 text-black">{slide.title}</h1>
              <p className="mb-4 text-xl text-black">{slide.text}</p>
              <button className="bg-white text-black font-bold px-4 py-2 rounded">
                LEARN MORE
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  )
}
