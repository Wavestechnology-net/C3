import React from "react";

const About: React.FC = () => {
  // const values = [
  //   {
  //     title: "Respect",
  //     color: "#93d1df",
  //     icon: "fas fa-handshake", // replace with actual path or SVG
  //     points: [
  //       "Impartiality",
  //       "Curiosity",
  //       "Diversity of thinking",
  //       "Culture of recognition",
  //     ],
  //   },
  //   {
  //     title: "Improvement",
  //     color: "#d4145a",
  //     icon: "fas fa-chart-line",
  //     points: [
  //       "Purpose and inspiration",
  //       "Shared goals and objectives",
  //       "Collaboration, integration and leveraging resources and partnerships",
  //       "Process / evaluation mapping and analysis",
  //     ],
  //   },
  //   {
  //     title: "Success",
  //     color: "#d3dd3d",
  //     icon: "fas fa-trophy",
  //     points: [
  //       "Continuous investment in development",
  //       "Match the inside and the outside",
  //       "Comfort in taking risk",
  //       "Autonomy",
  //     ],
  //   },
  //   {
  //     title: "Empower",
  //     color: "#1c2e4a",
  //     icon: "fas fa-fist-raised",
  //     points: [
  //       "Tangible results",
  //       "Development and transfer of skills",
  //       "Ability to influence",
  //       "Decision Authority",
  //     ],
  //   },
  // ];

  return (
    <div className="font-sans text-[#1d2033] mt-19">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[100vh] text-white flex items-center justify-center flex-col text-center"
        style={{
          backgroundImage: "url('/img2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">WHO WE ARE</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Our mission is to develop youth through soccer. Learn more about our
            culture and commitment to community.
          </p>
        </div>
      </section>

      {/* Club Philosophy */}
      <section className="bg-white py-16 px-3 ">
        <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
          <h1 className="text-4xl font-bold uppercase">About C3 Soccer Club</h1>
          <p className="text-base text-gray-700 mb-2">
            C3 Soccer Club is more than just a soccer team we are a
            development-focused community committed to shaping well-rounded
            athletes through the power of sport. At the heart of our philosophy
            are three core pillars: Cognition, Competence, and Character.
          </p>
          <ul className="list-inside pl-6 space-y-2">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Cognition:</b> We train the mind as much as the body. Our
              programs emphasize decision-making, game intelligence, and mental
              agility, helping players think faster, adapt smarter, and elevate
              their understanding of the game.
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Competence:</b> We build strong fundamentals and advanced
              technical skills through purposeful training. Whether a player is
              new to the sport or striving for elite levels, our coaching
              fosters continuous growth in ability and performance.
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Character:</b> We believe who you are off the field matters
              just as much as what you do on it. Through leadership development,
              teamwork, and sportsmanship, we cultivate values that prepare
              players for success in soccer and in life
            </li>
          </ul>
          <p>
            At C3, we develop complete players strong in mind, skilled in play,
            and grounded in values.
          </p>
          <p>
            Join us in building the future of the game, one player at a time.
          </p>
        </div>
      </section>

      {/* <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase">
              Players of All Levels
            </h2>
            <p className="text-gray-800 text-lg">
              C3 SOCCERS is a full service soccer club, our programming serves
              players of all levels - from recreational to college-bound-in a
              safe, supportive environment. We offer soccer programming to youth
              athletes regardless of their play-level. At C3 SOCCERS, we have
              licensed coaches guide our players through the development process
              to ensure that we provide a consistent player environment across
              all genders and age groups.
            </p>
          </div>

          <div className="relative -mt-10 md:-mt-20 z-10">
            <img
              src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c0396e97d22a86ed9cbd6c_C3 SOCCERS-about-1.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt-10 shadow-xl rounded"
            />
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
          <div className="relative -mt-5 z-10">
            <img
              src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03980a60d10542a03dcab_C3 SOCCERS-about-2.jpg"
              alt="Recreational Kids"
              className="w-full md:-mt-28 shadow-xl rounded"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase">
              In the heart of Houston
            </h2>
            <p className="text-gray-700 text-xl w-full ">
              As a non-profit organization, the fees we collect are generally
              invested back into the club. By being financially prudent, we have
              been able to develop facilities that we own, in the heart of
              Houston, which are easily accessible to millions of residents. We
              also partner with municipalities who own beautiful facilities and
              grant C3 SOCCERS priority usage. Having field freedom and
              flexibility puts C3 SOCCERS in a powerful and unique position
              because we always have an element of control over our future.
            </p>
            <Button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
              C3 SOCCERS Locations
            </Button>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-[#dadf36] py-20 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase">
              We firmly believe Better Coaches = Better Players
            </h2>
            <p className="text-gray-800 text-lg">
              Coaches are the key to player development. C3 SOCCERS boasts one
              of the most highly licensed coaching staffs in the nation. Our
              Player Development Coaches are ethnically diverse and can cater to
              the many cultures in our community while always maintaining the
              highest technical standards. C3 SOCCERS is committed to developing
              our players by having the most talented and qualified coaches lead
              our players and oversee our program.
            </p>
            <Button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-gray-800 w-fit uppercase">
              C3 SOCCERS Staff
            </Button>
          </div>

          <div className="relative -mt-10 md:-mt-20 z-10">
            <img
              src="/img3.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt-10 shadow-xl rounded"
            />
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
          <div className="space-y-4 md:flex md:items-start md:gap-20">
            <div className="md:w-1/2">
              <img
                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c0398d56146297c7297236_C3 SOCCERS-about-4.jpg"
                alt="Recreational Kids"
                className="w-full shadow-xl rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-4 ">
              <h2 className="text-xl font-bold uppercase">
                Identity and values
              </h2>
              <p className="text-xl">
                Through a shared passion, collaboration and commitment to talent
                development we connect our community, families and players by
                cultivating a club culture of respect, improvement, success, and
                empowerment through and for the advancement of soccer. TOGETHER
                WE C3 SOCCERS.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {values.map(({ title, color, icon, points }) => (
            <div key={title}>
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div
                    className="rounded-full w-35 h-35 flex items-center justify-center border-12"
                    style={{ borderColor: color }}
                  >
                    <i className={`${icon} text-5xl`}></i>
                  </div>
                  <div
                    className="w-12 h-2 mx-auto mt-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div
                    className="w-0 h-0 mx-auto border-l-8 border-r-8 border-t-[10px]"
                    style={{
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                      borderTopColor: color,
                    }}
                  ></div>
                </div>
              </div>
              <h3
                className="font-bold uppercase text-xl mb-4"
                style={{ color }}
              >
                {title}
              </h3>
              <ul className="space-y-2 text-left text-gray-800 text-sm px-4 mb-20">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-400 font-bold mr-2 mt-1">
                      {">"}
                    </span>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section> */}

      <section className="bg-[#dadf26] py-10 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase">Our Mission</h2>
            <p className="text-white text-lg">
              At C3 Soccer Club, our mission is to develop complete athletes by
              training the mind, body, and spirit of every player. Through a
              commitment to Cognition, Competence, and Character, we prepare
              young athletes to excel in the game of soccer and thrive in life —
              as smart decision-makers, skilled performers, and respectful
              leaders.
            </p>
          </div>

          <div className="relative -mt-10 md:-mt-20 z-10">
            <img
              src="/img5.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt- shadow-xl rounded"
            />
          </div>
        </div>
      </section>

      <section className=" py-20 px-4 mt-20 mb-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
          <div className="space-y-4 md:flex md:items-start md:gap-20">
            <div className="md:w-1/2">
              <img
                src="/img7.jpg"
                alt="Recreational Kids"
                className="w-full shadow-2xs rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-4 ">
              <h2 className="text-xl font-bold uppercase">Our Vision</h2>
              <p className="text-xl">
                To create a new standard in youth soccer by developing smart,
                skilled, and strong-hearted players and to become Houston’s
                leading soccer club, known not just for winning, but for shaping
                athletes who lead with purpose on and off the field
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-[#96cfdc] h-auto md:h-[265vh] py-15 px-4 text-start">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold uppercase">C3 SOCCERS Programs</h2>

          <div className="grid md:grid-cols-1/3 gap-15">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black uppercase">
                Recreational Program
              </h3>
              <h4 className="text-xl font-semibold text-red-600">
                Birth Years: 2021 (U4) - 2013 (U12)
              </h4>
              <p className="text-gray-700 text-xl w-full ">
                Our community-based recreational programs provide a safe and
                wholesome soccer experience for new and developing players. Our
                enthusiastic Player Development Coaches focus on helping build
                your player’s individual skill and confidence while providing
                room for kids to explore their creativity while they learn the
                game at their own pace.
              </p>
              <Button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                Learn More
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black uppercase">
                Youth Academy
              </h3>
              <h4 className="text-xl font-semibold text-red-600">
                Birth Years: 2018 (U7) - 2015 (U10)
              </h4>
              <p className="text-gray-700 text-xl w-full ">
                The C3 SOCCERS Youth Academy introduces players with their first
                experiences in competitive soccer. This program allows players,
                who excelled at the recreational level, to rapidly advance their
                technical skills along with like minded players under the
                watchful eyes of the C3 SOCCERS Competitive Coaching Staff.
              </p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                Learn More
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black uppercase">
                Competitive (Premier & Select)
              </h3>
              <h4 className="text-xl font-semibold text-red-600">
                Birth Years: 2014 (U11) - 2007/06 (U18/U19)
              </h4>
              <p className="text-gray-700 text-xl w-full ">
                Players in the C3 SOCCERS Competitive Program are committed to
                advancing their technical skills and will embrace the high-level
                of coaching. As your player ages through the program, they will
                be challenged both physically and mentally with other
                like-minded players. In the end, we trust that your player will
                find that through their dedication and commitment, the process
                was highly rewarding and memorable.
              </p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                Learn More
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black uppercase">Elite</h3>
              <h4 className="text-xl font-semibold text-red-600">
                Birth Years: 2014 (U11) - 2007/06 (U18/U19)
              </h4>
              <p className="text-gray-700 text-xl w-full ">
                The Elite program at C3 SOCCERS consists of 3 leagues that sit
                at the top of the soccer development pyramid for every top club
                in the United States. The Girls Academy (GA), Boys Elite Clubs
                National League (ECNL), and the Boys Elite Clubs National League
                Regional League (ECNL-RL )provide top level national competition
                platforms for elite youth athletes in the country. The purpose
                of these platforms is to provide a player-centric environment,
                meaningful games, high standards that member clubs are required
                to adhere to, and most importantly to maximize player
                opportunity and visibility. Elite teams are formed from the
                strongest players across our entire player pool.
              </p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c0399da60d10542a040aa2_C3 SOCCERS-about-7.jpg"
              alt="Team Spirit"
              className="relative left-1/2 -translate-x-1/2 w-full max-w-5xl shadow-xl rounded"
            />
          </div>
        </div>
      </section> */}

      <section className="bg-white py-30">
        <h2 className="text-4xl font-bold text-center text-black uppercase font-serif">
          RISE WITH US
        </h2>
      </section>
    </div>
  );
};

export default About;
