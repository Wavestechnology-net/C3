import React from "react";

const About: React.FC = () => {
  const data = [
    {
      id: 1,
      heading: "Recreational Program",
      subheading: "Birth Years: 2021 (U4) - 2013 (U12)",
      para: "Our community-based recreational programs provide a safe and wholesome soccer experience for new and developing players. Our enthusiastic Player Development Coaches focus on helping build your player’s individual skill and confidence while providing room for kids to explore their creativity while they learn the game at their own pace.",
    },
    {
      id: 2,
      heading: "Youth Academy",
      subheading: "Birth Years: 2021 (U4) - 2013 (U12)",
      para: "Our community-based recreational programs provide a safe and wholesome soccer experience for new and developing players. Our enthusiastic Player Development Coaches focus on helping build your player’s individual skill and confidence while providing room for kids to explore their creativity while they learn the game at their own pace.",
    },
    {
      id: 3,
      heading: "Competitive (Premier & Select)",
      subheading: "Birth Years: 2021 (U4) - 2013 (U12)",
      para: "Our community-based recreational programs provide a safe and wholesome soccer experience for new and developing players. Our enthusiastic Player Development Coaches focus on helping build your player’s individual skill and confidence while providing room for kids to explore their creativity while they learn the game at their own pace.",
    },
    {
      id: 4,
      heading: "Elite",
      subheading: "Birth Years: 2021 (U4) - 2013 (U12)",
      para: "Our community-based recreational programs provide a safe and wholesome soccer experience for new and developing players. Our enthusiastic Player Development Coaches focus on helping build your player’s individual skill and confidence while providing room for kids to explore their creativity while they learn the game at their own pace.",
    },
  ];

  return (
    <div className="font-sans text-[#1d2033]">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[100vh] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03961bcab7f2c2edeeb7b_rise-about-hero.jpg')",
        }}
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">WHO WE ARE</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Our mission is to develop youth through soccer. Learn more about our
            culture and commitment to community.
          </p>
        </div>
      </section>

      {/* Club Philosophy */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold mb-4 text-center">CLUB PHILOSOPHY</h2>
        <p className="max-w-4xl mx-auto text-center text-lg leading-relaxed">
          At RISE, we are driven by our mission to empower youth both on and off
          the field through a comprehensive and developmental approach to
          soccer. Our focus lies in fostering a competitive yet inclusive
          environment that nurtures personal growth, sportsmanship, and
          teamwork.
        </p>
      </section>
      {/* Missions */}
      <section className="flex flex-col md:flex-row gap-10 items-center py-20 px-4 md:px-20">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03997100f793fe4054389_rise-about-5.jpg"
          alt="RISE Team"
          className="rounded-lg w-full md:w-1/2"
        />
        <div className="text-lg leading-relaxed">
          <h1 className="text-3xl font-bold mb-4">Mission</h1>
          <p>
            RISE Soccer Club is a professionally managed youth soccer
            organization that is built on the passion of its players and
            coaches. With a commitment to creating lifelong athletes and
            leaders, we invest in every child’s development with elite coaching,
            modern facilities, and a structured pathway from recreational
            programs to competitive leagues.
          </p>
          <p className="mt-4">
            Our club is inclusive and welcomes families from every background to
            join our mission. We believe soccer is more than a game — it's a way
            to build character, friendships, and lifelong memories.
          </p>
        </div>
      </section>

      {/* Visions */}
      <section className="flex flex-col md:flex-row gap-10 items-center py-20 px-4 md:px-20">
        <div className="text-lg leading-relaxed">
          <h1 className="text-3xl font-bold mb-4">Vision</h1>
          <p>
            Our goal is to be a top 25 youth soccer club in the country. We must
            be able to consistently develop, retain and attract talent. Simply
            put, we always want our teams, regardless of their level of play, to
            be a threat to go all the way. The success of the club is uniquely
            tied to the success of its players. RISE will prepare our players
            and teams to compete against anyone, anytime, and anywhere.
          </p>
        </div>
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5edfecefb48b30ee74bac5b3_RISE_About_Vision_Target_Outlines.svg"
          alt="RISE Team"
          className="rounded-lg w-full md:w-1/2"
        />
      </section>

      {/* Team Image + Paragraph */}
      <section className="flex flex-col md:flex-row gap-10 items-center py-20 px-4 md:px-20">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c0398d56146297c7297236_rise-about-4.jpg"
          alt="RISE Team"
          className="rounded-lg w-full md:w-1/2"
        />
        <div className="text-lg leading-relaxed">
          <p>
            RISE Soccer Club is a professionally managed youth soccer
            organization that is built on the passion of its players and
            coaches. With a commitment to creating lifelong athletes and
            leaders, we invest in every child’s development with elite coaching,
            modern facilities, and a structured pathway from recreational
            programs to competitive leagues.
          </p>
          <p className="mt-4">
            Our club is inclusive and welcomes families from every background to
            join our mission. We believe soccer is more than a game — it's a way
            to build character, friendships, and lifelong memories.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#96CFDC" }}>
        <h1 className="text-3xl font-bold mb-4 text-center">RISE Programs</h1>
        <div>
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-10 items-center py-20 px-4 md:px-20"
            >
              <div className="text-lg leading-relaxed">
                <h1 className="text-3xl font-bold mb-4">{item.heading}</h1>
                <p>{item.subheading}</p>
                <p className="mt-4">{item.para}</p>
                <button className="mt-4 bg-yellow-300 text-black font-semibold px-6 py-2 cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
