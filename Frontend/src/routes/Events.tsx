import React from "react";

const Events: React.FC = () => {
  const partners = [
    {
      id: 1,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5ef223a16c35383bca882507_reliant(r)_full%20color_for%20tshirt%20printing-p-500.png",
    },
    {
      id: 2,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5ef223ffb5e9fa1ae95363e3_Nike_Soccer_Logo_Horiz_hi_black.png",
    },
    {
      id: 3,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5f501b79a87c3405d332fd87_soccer-com-logo.png",
    },
    {
      id: 4,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67328309243ce2be0fff3547_hermann-p-500.png",
    },
    {
      id: 5,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5f10c736695a2b8b6feb22c4_city-of-west-u-place-logo.png",
    },
    {
      id: 6,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67a11e5ca74242202d856694_CS_Logo_Vertical_Print_Color-p-500.png",
    },
    {
      id: 7,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67ed6298c6adf754328c3220_Glasheen%20Valles%20%26%20Inderman.png",
    },
    {
      id: 8,
      url: "https://www.reliant.com",
      logo: "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/616db83047da6f07c6e8cb1e_MCTX_PartnerLogo.jpeg",
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="pt-13">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03d70b17723a098559f69_C3 SOCCERS-rec-hero.jpg"
          alt="Hero Image"
          className="w-full"
        />
      </section>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-10 lg:py-15">
        <h1 className="text-4xl font-bold pb-8">C3 SOCCERS EVENTS</h1>
        <p className="pb-5">
          C3 SOCCERS hosts 4 annual events that bring together some of the best
          teams and players in our region. Our events range from preseason to
          postseason, to small sided events. C3 SOCCERS events are played at top
          tier facilities and we offer levels for play ranging from recreational
          to elite competition. We carefully articulate our brackets to ensure
          meaningful games. Events are a critical part of the playing experience
          for youth players, and we want to do our part to make sure your
          team(s) have an exciting and memorable experience. C3 SOCCERS events
          regularly have over 250 teams participating and they are a great
          experience for players and spectators.
        </p>
      </div>

      <div
        className="pt-10 lg:pt-15 pb-16 lg:pb-22"
        style={{ backgroundColor: "#96CFDC" }}
      >
        <h1 className="text-4xl font-bold pb-8 text-center">
          CHECK OUT OUR EVENTS
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center items-center">
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 mt-2 cursor-pointer hover:bg-pink-600">
            C3 SOCCERS TOURNAMENTS
          </button>
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 mt-2 cursor-pointer hover:bg-pink-600">
            C3 SOCCERS CAMPS
          </button>
        </div>
      </div>

      <div className="px-4 py-1">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03d772fc039073556b20b_C3 SOCCERS-rec-2.jpg"
          alt=""
          className="w-full md:w-2/3 mx-auto shadow-xl rounded"
        />
      </div>

      <div className="px-4 sm:px-10 md:px-16 lg:px-32 xl:px-60 py-10 lg:py-15">
        <h1 className="text-3xl font-bold pb-3">EVENTS PARTNERS</h1>
        <p className="pb-3 text-lg">
          Our partners help us make a difference in the experience of your
          athlete and family at our events. We look forward to hosting you.
        </p>
        <h2 className="text-2xl font-bold pb-3 text-gray-700">
          LEARN MORE ABOUT OUR PARTNERS
        </h2>
        <button className="bg-yellow-400 text-black font-bold px-6 py-2 mt-2 cursor-pointer hover:bg-pink-600">
          LEARN MORE
        </button>
      </div>

      <div className="px-4 sm:px-10 md:px-70 py-10 flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 lg:gap-22 items-center w-full">
          {partners.map((logo) => (
            <a
              key={logo.id}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full h-full">
                <img
                  src={logo.logo}
                  alt={`Partner ${logo.id}`}
                  className="w-full object-contain max-h-24"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold pb-5">C3 SOCCERS WITH US</h1>
        <button className="bg-yellow-400 text-black font-bold px-6 py-2 mt-2 cursor-pointer hover:bg-pink-600">
          PLAY FOR C3 SOCCERS
        </button>
      </div>
    </>
  );
};

export default Events;
