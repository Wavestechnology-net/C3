import React from "react";
import { EmblaCarousel } from "../components/Carousel";
import { EventCarousel } from "../components/EventCarousel";
import { PartnerCarousel } from "../components/PartnerCarousel";


const Home: React.FC = () => {
  return (
    <div className="font-sans text-[#1d2033]">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[100vh] text-white flex items-center justify-center flex-col text-center "
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03961bcab7f2c2edeeb7b_rise-about-hero.jpg')",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">RISE WITH US</h1>
        <p className="text-xl mt-2">Your success is ours</p>
        <button className="mt-6 bg-yellow-300 text-black font-semibold px-6 py-2">
          LEARN MORE
        </button>
      </section>


      <section className="relative bg-pink-600 text-white py-10">
        {/* Floating Tag */}
        <div className="absolute top-0 left-30 bg-blue-900 text-white px-12 py-10 font-bold shadow-lg skew-x-[-15deg]">
          <span className="block skew-x-[15deg]">WHAT'S NEW WITH RISE</span>
        </div>

        <div className="w-full h-[500px]">
          <EmblaCarousel />
        </div>
      </section>


      {/* Youth Experience */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-8 items-start">
        <div className="">
          <h2 className="text-3xl font-bold mb-4">
            Redefining the Youth Soccer Experience in Houston
          </h2>
          <p>
            A full-service soccer club, our programming serves players from the
            recreational to elite level. With community at its core, RISE
            focuses on growth, learning, and high-level player development.
          </p>
          <button className="mt-4 bg-yellow-300 text-black font-bold px-6 py-2">
            ABOUT RISE
          </button>
        </div>
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64befcd021528f46bc79b400_rise-home-1.jpg"
          alt="Youth Player"
          className="rounded-lg"
        />
      </section>

      {/* Player Development */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-8 items-start">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64befcde21528f46bc79b6d6_rise-home-2.jpg"
          alt="Training"
          className="rounded-lg"
        />
        <div>
          <h2 className="text-xl font-bold mb-4">
            Developing Players At Every Level
          </h2>
          <p className="mb-4">
            RISE develops youth soccer players through professional coaching and
            inspiring environments. Learn about our programs:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Recreational</li>
            <li>Youth Academy</li>
            <li>Competitive</li>
            <li>Elite</li>
          </ul>
        </div>
      </section>

      {/* News & Events */}
      <section className="bg-blue-100 py-10 px-6 h-[350px]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6 items-start">
          {/* Text Content */}
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-4">RISE NEWS</h2>
            <h3 className="font-bold text-red-600">
              Dempsey leads Reliant Youth Clinic In Honor of World Cup 26™
            </h3>
            <button className="mt-4 bg-yellow-300 w-fit text-black font-bold px-6 py-2">
              READ MORE
            </button>
          </div>

          {/* Image */}
          <img
            src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67be2e3bb706e7084b30fb52_67ba5c6bae476.image-p-800.jpg"
            alt="News"
            className="rounded mb-2 w-full max-w-[500px] h-auto object-cover "
          />
        </div>
      </section>


      {/* Partners Section */}
      <section className=" relative bg-white-300 px-6 text-center mt-20 relative z-0">
        <div className="w-full h-[400px]">
          <EventCarousel />
        </div>
        <div className="relative z-10 mt-10">
          <img
            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64befce721528f46bc79b70c_rise-home-3-p-1600.jpg"
            alt=""
            className="w-2/3 mx-auto shadow-xl rounded"
          />
        </div>
        {/* <h2 className="text-xl font-bold mb-4">
          We’re Proud of the Support of Our Partners
        </h2>
        <button className="bg-white text-black font-semibold px-6 py-2">
          Become a Partner
        </button>
        <div className="mt-4">[Logos Slider Placeholder]</div> */}
      </section>
      <section className="bg-yellow-300">
          <div className="w-full h-[350px]">
            <PartnerCarousel />
          </div>
        </section>
    </div>
  );
};

export default Home;
