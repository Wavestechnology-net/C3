import React from "react";

const Home: React.FC = () => {
  return (
    <div className="font-sans text-[#1d2033]">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh] text-white flex items-center justify-center flex-col text-center"
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

      {/* What's New */}
      <section className="bg-pink-600 text-white text-center py-4 text-lg font-bold">
        WHAT'S NEW WITH RISE
      </section>

      {/* Rec Fall Ad */}
      <section className="grid md:grid-cols-2 bg-yellow-300 p-8">
        <div className="flex items-center justify-center">
          <img
            src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64c88ba15c2d8268a2128fa4_Screenshot%202023-07-31%20at%2011.35.04%20PM-p-800.jpg"
            alt="Rec Kids"
            className="rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">
            Join Us For Rec Fall 2025!
          </h2>
          <p className="mb-4">
            RISE REC introduces young players to the beautiful game. Sign up
            today!
          </p>
          <button className="bg-white text-black font-bold px-4 py-2 w-fit">
            LEARN MORE
          </button>
        </div>
      </section>

      {/* Youth Experience */}
      <section className="grid md:grid-cols-2 gap-10 py-16 px-8 items-center">
        <div>
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
      <section className="grid md:grid-cols-2 gap-10 px-8 items-center py-16">
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
      <section className="bg-blue-100 py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">RISE NEWS</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Repeat this card for each news item */}
          <img
            src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67be2e3bb706e7084b30fb52_67ba5c6bae476.image-p-800.jpg"
            alt="News"
            className="rounded mb-2"
          />
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">May 2, 2024</p>
            <h3 className="font-bold">2024 College Commitments</h3>
            <p className="text-sm">
              Congrats to our 2024 RISE Soccer Club College Commit class!
            </p>
            <a href="#" className="text-pink-600 font-semibold text-sm">
              Read More
            </a>
          </div>
          {/* Add more cards here */}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-yellow-300 py-10 px-6 text-center">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64befce721528f46bc79b70c_rise-home-3-p-1600.jpg"
          alt=""
          className="w-1/2 mx-auto mb-6"
        />
        <h2 className="text-xl font-bold mb-4">
          We’re Proud of the Support of Our Partners
        </h2>
        <button className="bg-white text-black font-semibold px-6 py-2">
          Become a Partner
        </button>
        <div className="mt-4">[Logos Slider Placeholder]</div>
      </section>
    </div>
  );
};

export default Home;
