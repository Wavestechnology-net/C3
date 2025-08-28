import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b2747] text-white py-10 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-yellow-400 pb-10">
        {/* QUESTIONS */}
        <div>
          <h2
            className="text-royal-blue

 text-lg font-bold mb-4 uppercase tracking-wider"
          >
            Questions?
          </h2>
          <p className="text-gray-200 mb-4">
            Contact us to see how your child can join the C3FC Soccer team and
            tap into their ultimate soccer potential.
          </p>
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 mt-2">
            CONTACT US
          </button>
        </div>

        {/* STAY IN THE LOOP */}
        <div className="border-l border-r border-yellow-400 px-6">
          <h2
            className="text-royal-blue

 text-lg font-bold mb-4 uppercase tracking-wider"
          >
            Stay in the Loop
          </h2>
          <div className="flex space-x-4 text-yellow-400 text-xl mb-4">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <p className="text-gray-200 mb-3">
            Sign up with your email to receive news & updates about the club.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border border-white bg-transparent placeholder-white mb-2"
          />
          <button className="bg-yellow-400 text-black font-bold w-full py-2">
            SUBMIT
          </button>
        </div>

        {/* CONTACT US */}
        <div>
          <h2
            className="text-royal-blue

 text-lg font-bold mb-4 uppercase tracking-wider"
          >
            Contact Us
          </h2>
          <p className="flex items-center gap-2 mb-2 text-white">
            <i className="fas fa-envelope text-yellow-400"></i>
            <span>info@c3fcsoccerclub.org</span>
          </p>
          <p className="flex items-center gap-2 mb-4 text-white">
            <i className="fas fa-phone-alt text-yellow-400"></i>
            <span>+1 (832) 654-1554</span>
          </p>
          <p className="text-yellow-400 font-bold mb-1">Mailing Address</p>
          <p className="text-white">
            7714 FM359, Richmond,
            <br />
            TX 77406.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-yellow-400 text-sm pt-4">
        <p>
          Brand & Website Created by{" "}
          <a
            href="https://wavestechnology.net"
            target="_blank"
            className="underline font-semibold"
          >
            Wavestechnology
          </a>
        </p>
        <p className="mt-1">© 2025 C3FC SOCCER CLUB</p>
      </div>
    </footer>
  );
};

export default Footer;
