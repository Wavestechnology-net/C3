import React, { useEffect, useState } from "react";

const Tryouts = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Half Image Section */}
      <div className="w-full h-[85vh]">
        <img
          src="/tryout.jpg"
          alt="Tryouts"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content Section */}
      <div className="w-full px-6 py-12 max-w-5xl mx-auto">
        {/* Heading */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-700 ease-out transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          RISE ADVANCED PROGRAMS - PLAYER EVALUATION & REGISTRATION DETAILS
        </h2>

        {/* Paragraph 1 */}
        <p
          className={`mt-6 text-lg text-gray-800 transition-all duration-700 ease-out delay-100 transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <strong>RISE with us!</strong> We are looking to provide opportunities
          to determined and talented players from all over Houston, and we
          invite new players to set up evaluations for team placements.
        </p>

        {/* Paragraph 2 with links */}
        <p
          className={`mt-4 text-lg text-gray-800 transition-all duration-700 ease-out delay-200 transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <strong>RISE Advanced</strong> consists of the:{" "}
          <a
            href="/youth-academy"
            className="underline text-red-600  font-bold hover:text-blue-800"
          >
            Youth Academy
          </a>
          ,{" "}
          <a
            href="/competitive"
            className="underline text-red-600 font-bold hover:text-blue-800"
          >
            Competitive (Select and Premier)
          </a>
          , and{" "}
          <a
            href="/elite"
            className="underline text-red-600 font-bold hover:text-blue-800"
          >
            Elite Programs
          </a>
          .
        </p>

        {/* Player Eligibility */}
        <div
          className={`mt-10 transition-all duration-700 ease-out delay-300 transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Player Eligibility:
          </h3>

          <div className="mb-6">
            <h4 className="font-bold text-gray-900">YOUTH ACADEMY</h4>
            <ul className="list-disc ml-6 mt-1 text-gray-700 list-none">
              <li>Open to boys and girls</li>
              <li>Birth years: 2019 (U7) through 2016 (U10)</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-900">SELECT, PREMIER & ELITE</h4>
            <ul className="list-disc ml-6 mt-1 text-gray-700 list-none">
              <li>Open to boys and girls</li>
              <li>Birth years: 2015 (U11) through 2007 (U19)</li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-8 transition-all duration-700 ease-out delay-500 transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <a
            href="/register"
            className="inline-block bg-[#DADF36] hover:bg-[#c4c757] text-black font-bold px-6 py-3 rounded text-lg shadow-md"
          >
            Register Here
          </a>
        </div>
      </div>
      <div className="w-full h-30 bg-[#DADF36] mt-10"></div>
      <br />
      <div className="flex justify-center mt-10">
        <div className="h-2 w-230 bg-[#DADF36]"></div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mt-10">
        HOW TO SET UP A TRYOUT/EVALUATION
      </h1>{" "}
      <div className="flex justify-center mt-10">
        <div className="h-2 w-230 bg-[#DADF36]"></div>
      </div>
      {/* Tryout Steps Section */}
      <div className="w-full px-6 py-12 max-w-5xl mx-auto text-gray-800">
        {/* Step 1 */}
        <h2 className="text-2xl font-bold mb-6">
          Step 1:{" "}
          <span className="font-normal text-lg">
            To request a tryout and provide information about your player, reach
            out to our Player Development Staff using the contact link provided
            below that matches your child's birth year and gender.
          </span>
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-dark">Youth Academy</h3>
          <p className="mb-1">Birth Years: 2019 (U7) up to 2016 (U10)</p>
          <p>
            Director:{" "}
            <a
              href="mailto:jose@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Jose Sideregts
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-dark">
            Competitive & Select
          </h3>
          <p className="mb-1">Birth Years: 2015 (U11) up to 2008/07 (U18/19)</p>
          <p>
            Boys Director:{" "}
            <a
              href="mailto:jose@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Jose Sideregts
            </a>
          </p>
          <p>
            Girls Director:{" "}
            <a
              href="mailto:nolverto@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Nolverto Rodriguez
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-dark">Elite</h3>
          <p className="mb-1">Birth Years: 2013 (U13) up to 2008/07 (U18/19)</p>
          <p>
            ECNL:{" "}
            <a
              href="mailto:eldin@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Eldin Sijercic
            </a>
          </p>
          <p>
            Girls Academy:{" "}
            <a
              href="mailto:kevin@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Kevin Cross
            </a>
          </p>
          <p>
            ECNL-RL:{" "}
            <a
              href="mailto:tarik@risesc.org"
              className="text-red-600 font-bold underline"
            >
              Tarik Guendouzi
            </a>
          </p>
        </div>

        {/* Step 2 */}
        <h2 className="text-2xl font-bold mb-8">
          Step 2:{" "}
          <span className="font-normal text-lg">
            Pre-register for Tryouts by clicking the Register Now button below.
            There is no fee to register.
          </span>
        </h2>

        {/* Step 3 */}
        <h2 className="text-2xl font-bold mb-8">
          Step 3:{" "}
          <span className="font-normal text-lg">
            Our next evaluation sessions will be held in early August, and a
            Player Development Staff member will contact you at that time. After
            attending your evaluation session, you will be emailed regarding the
            team placement for your player.
          </span>
        </h2>
      </div>
      <div className="w-full h-50 bg-[#96cfdc] mt-10 relative flex justify-center items-center">
        <a
          href="/register"
          className="text-black font-bold px-8 py-4 rounded text-lg shadow-md z-10 hover:bg-[#c0c734]"
          style={{ backgroundColor: "#DADF36" }}
        >
          Register Here
        </a>
      </div>
    </div>
  );
};

export default Tryouts;
