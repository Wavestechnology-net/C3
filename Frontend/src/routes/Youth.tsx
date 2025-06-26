export default function YouthAcademy() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="w-full">
        <img
          src="/s3.jpg"
          alt="Recreational Hero"
          className="w-full h-auto object-cover"
        />
      </section>
      {/* 2. Centered Text Section */}
      <section className="bg-white py-16 px-3 ">
        <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
          <h1 className="text-4xl font-bold uppercase">
            Youth Academy (Ages 6-12)
          </h1>
          <p className="text-lg text-gray-700 text-left mb-5">
            Welcome to the C3 Soccer Club Youth Academy — where young players
            take their first steps toward a lifetime of soccer success.
          </p>
          <h2 className="text-2xl font-bold">
            Developing Tomorrow’s Stars Today
          </h2>
          <p className="text-lg text-gray-700 text-left">
            Our Youth Academy is designed specifically for boys and girls ages 6
            to 12 who are passionate about learning the game and having fun. We
            focus on building a strong foundation in:
          </p>
          <ul className="list-inside space-y-2 lg:ms-5">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Cognition:</b> Teaching players how to read the game, make
              smart decisions, and think ahead on the field.
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Competence:</b> Developing essential technical skills like
              dribbling, passing, shooting, and ball control through fun,
              age-appropriate drills.
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <b>Character:</b> Instilling values of teamwork, respect,
              discipline, and sportsmanship from the very start.
            </li>
          </ul>
          <h2 className="text-2xl font-bold">Playing Local Competitions</h2>
          <p>
            To give players real-game experience and build confidence, our Youth
            Academy teams participate in local leagues and tournaments around
            the Houston area. These competitions offer:
          </p>
          <ul className="list-inside space-y-2 lg:ms-5">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Friendly but competitive environments to apply skills learned in
              training
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Opportunities to develop teamwork and communication on the field
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              A chance for young players to experience the thrill of
              representing C3 Soccer Club
            </li>
          </ul>
        </div>
      </section>
      {/* 3. Two Column Section with Overflowing Image */}

      <section className="bg-[#96cfdc] py-10 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative -mt-10 md:-mt-20 z-10">
            <img
              src="/img1.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt-5 shadow-xl rounded"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase">
              Why Join the C3 Youth Academy?
            </h2>
            <p className="text-gray-800 text-lg">
              <ul className="list-inside space-y-2 my-2 lg:ms-1">
                <li>
                  <span className="text-gray-800 font-bold mr-2 mt-1">
                    {">"}
                  </span>
                  Expert coaching tailored for young athletes
                </li>
                <li>
                  <span className="text-gray-800 font-bold mr-2 mt-1">
                    {">"}
                  </span>
                  A supportive and inclusive club culture
                </li>
                <li>
                  <span className="text-gray-800 font-bold mr-2 mt-1">
                    {">"}
                  </span>
                  Focus on holistic player development mind, skill, and
                  character
                </li>
                <li>
                  <span className="text-gray-800 font-bold mr-2 mt-1">
                    {">"}
                  </span>
                  Access to local competitions that foster growth and fun
                </li>
              </ul>
              Start your child’s soccer journey with C3 Soccer Club where
              passion meets purpose.
            </p>
          </div>
        </div>
      </section>
      {/* 4. Image Overflow Followed by Text List */}
      {/* <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
          <div className="relative -mt-5 z-10">
            <img
              src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bb1100f793fe406a196_C3 Soccer-ya-2.jpg"
              alt="Recreational Kids"
              className="w-full md:-mt-28 shadow-xl rounded mb-40"
            />
          </div>

          <div className="space-y-4 md:flex md:items-start md:gap-10">
            <div className="md:w-1/2">
              <img
                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bb80ee175b866e4c5fc_C3 Soccer-ya-3.jpg"
                alt="Recreational Kids"
                className="w-full md:-mt-28 shadow-xl rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-4 ">
              <h2 className="text-3xl font-bold uppercase">
                C3 Soccer with us
              </h2>
              <div className="space-y-2 text-gray-700 text-lg">
                {[
                  "Weekly practices and games",
                  "Team jersey and equipment",
                  "Fun-focused training",
                  "Supportive coaching staff",
                  "End-of-season awards",
                  "Age-appropriate competition",
                  "Access to C3 Soccer resources",
                  "Parent engagement opportunities",
                  "Local match participation",
                  "Development-focused curriculum",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">
                      {">"}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="bg-white py-5 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-xl font-bold uppercase text-gray-900">
            MISSED PLAYER EVALUATIONS?
          </h2>
          <p className="text-lg text-gray-700">
            Contact our Youth Academy Directors to schedule an evaluation!
          </p>

          <div className="space-y-2">
            <p className="text-lg text-gray-800 flex items-start">
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <span>
                <strong className="font-bold">Boys Director:</strong> Jose
                Sideregts -{" "}
                <a
                  href="mailto:jose@C3 Soccersc.org"
                  className="text-pink-700 font-bold underline"
                >
                  JOSE@C3 SoccerSC.ORG
                </a>
              </span>
            </p>
            <p className="text-lg text-gray-800 flex items-start">
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <span>
                <strong className="font-bold">Girls Director:</strong> Nolverto
                Rodriguez -{" "}
                <a
                  href="mailto:nolverto@C3 Soccersc.org"
                  className="text-pink-700 font-bold underline"
                >
                  NOLVERTO@C3 SoccerSC.ORG
                </a>
              </span>
            </p>
          </div>

          <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold uppercase px-6 py-3 rounded w-fit">
            Register Now
          </button>
        </div>
      </section> */}
      {/* <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Heading */}
      {/* <h2 className="text-4xl font-extrabold uppercase text-gray-900">
            Youth Academy Programming
          </h2> */}

      {/* Fees Box (still outside table) */}
      {/* <div className="bg-[#93d1df] border-4 border-[#1c2e4a] p-6 text-gray-800">
                        <h3 className="text-pink-600 font-bold text-xl uppercase mb-4">Fees</h3>
                        <ul className="space-y-2 text-lg">
                            <li className="flex items-start">
                                <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                <span>
                                    <strong>Birth Years 2019 (U7), 2018 (U8), 2017 (U9) & 2016 (U10)</strong><br />
                                    Seasonal Or Yearly Commitment
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                <span>Fees are detailed on the registration page after you login.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                <span>Due to league rules, seasonal players will be registered with C3 Soccer on a yearly basis even if they don't participate in the Spring season.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                <span>C3 Soccer does not cover fees for coach travel to games and/or events outside of the greater Houston area, this fee should be divided among parents if applicable.</span>
                            </li>
                        </ul>
                    </div> */}

      {/* Seamless Table */}
      {/* <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="bg-[#93d1df] border-x-4 border-t-4 border-[#1c2e4a]">
                <td
                  className="p-6 border-r-2 border-[#1c2e4a] align-top"
                  colSpan={2}
                >
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Fall 2025 Season Length
                  </h3>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        <strong>
                          Birth Years 2019 (U7), 2018 (U8), 2017 (U9) & 2016
                          (U10)
                        </strong>
                        <br />
                        Seasonal Or Yearly Commitment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        Fees are detailed on the registration page after you
                        login.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        Due to league rules, seasonal players will be registered
                        with C3 Soccer on a yearly basis even if they don't
                        participate in the Spring season.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        C3 Soccer does not cover fees for coach travel to games
                        and/or events outside of the greater Houston area, this
                        fee should be divided among parents if applicable.
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* Add more rows below to extend table */}
      {/* <tr className="bg-[#93d1df] border-x-4 border-t border-b-2 border-[#1c2e4a]">
                <td className="p-6 border-r-2 border-[#1c2e4a] align-top">
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Fall 2026 Season Length
                  </h3>
                  <p className="mt-2 text-gray-800 text-lg">
                    August 3 – November 12, 2026 (example)
                  </p>
                </td>
                <td className="p-6 align-top">
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Spring 2027 Season Length
                  </h3>
                  <p className="mt-2 text-gray-800 text-lg">
                    February 8 – May 22, 2027 (example)
                  </p>
                </td>
              </tr>

              <tr className="bg-[#93d1df] border-x-4 border-t-2 border-[#1c2e4a]">
                <td
                  className="p-6 border-r-4 border-[#1c2e4a] align-top"
                  colSpan={2}
                >
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Fall 2025 Season Length
                  </h3>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        <strong>
                          Birth Years 2019 (U7), 2018 (U8), 2017 (U9) & 2016
                          (U10)
                        </strong>
                        <br />
                        Seasonal Or Yearly Commitment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        Fees are detailed on the registration page after you
                        login.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        Due to league rules, seasonal players will be registered
                        with C3 Soccer on a yearly basis even if they don't
                        participate in the Spring season.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-bold mr-2 mt-1">
                        {">"}
                      </span>
                      <span>
                        C3 Soccer does not cover fees for coach travel to games
                        and/or events outside of the greater Houston area, this
                        fee should be divided among parents if applicable.
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>

              <tr className="bg-[#93d1df] border-x-4 border-t border-b-4 border-[#1c2e4a]">
                <td className="p-6 border-r-2 border-[#1c2e4a] align-top">
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Fall 2026 Season Length
                  </h3>
                  <p className="mt-2 text-gray-800 text-lg">
                    August 3 – November 12, 2026 (example)
                  </p>
                </td>
                <td className="p-6 align-top">
                  <h3 className="text-pink-600 text-xl font-bold uppercase">
                    Spring 2027 Season Length
                  </h3>
                  <p className="mt-2 text-gray-800 text-lg">
                    February 8 – May 22, 2027 (example)
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}
      <section className="bg-white py-30">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          RISE with C3 SOCCER Club
        </h2>
      </section>
    </div>
  );
}
