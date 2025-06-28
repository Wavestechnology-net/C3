export default function Competitive() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="w-full">
        <img
          src="/s1.jpg"
          alt="Recreational Hero"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* 2. Intro Section */}
      <section className="bg-white text-center py-10 px-3">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold uppercase">
            Competitive Soccer Program (Ages 12-18)
          </h1>
          <p className="text-lg text-gray-700 text-left">
            At C3 Soccer Club, our Competitive Soccer Program is designed for
            serious young athletes aged 12 to 18 who are committed to pushing
            their limits and competing at the highest levels.
          </p>
        </div>
      </section>

      {/* 3. Elevate Your Game */}
      <section className="bg-[#f3f3f3] py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold uppercase text-center">
            Elevate Your Game
          </h2>
          <p className="text-lg text-gray-800">
            This program focuses on advanced training that sharpens all three
            pillars: Cognition, Competence, and Character. Players receive
            expert coaching to develop:
          </p>
          <ul className="list-inside pl-5 text-gray-800 space-y-2">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Cognitive Skills:</strong> Tactical awareness,
              decision-making speed, and game intelligence to outthink the
              competition
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Technical Ability:</strong> Enhanced ball control,
              precision passing, shooting, and physical conditioning
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Character Development:</strong> Leadership, discipline,
              resilience, and sportsmanship essential for success on and off the
              field
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Competitive Opportunities */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold uppercase text-center">
            Competitive Opportunities
          </h2>
          <p className="text-lg text-gray-800">
            Our teams compete in both local leagues and regional tournaments,
            offering players exposure to a wide range of opponents and styles of
            play. This level of competition:
          </p>
          <ul className="list-inside pl-5 text-gray-800 space-y-2">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Challenges players to perform under pressure
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Builds experience and confidence in high-stakes matches
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Creates pathways for college recruitment and elite soccer
              opportunities
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Why C3 Section */}
      <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold uppercase">
              Why Choose C3 Competitive Soccer?
            </h2>
            <ul className="list-inside pl-5 text-lg text-gray-800 space-y-2">
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Professional coaching tailored for advanced youth athletes
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Comprehensive training schedules balancing skill development and
                competition
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Access to local and regional events that prepare players for the
                next level
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                A culture that demands hard work, teamwork, and respect
              </li>
            </ul>
            <p>
              Join C3 Soccer Club’s Competitive Soccer Program and take your
              passion for the game to new heights.
            </p>
          </div>
          <div className="relative lg-mt-10 md:-mt-1 z-10">
            <img
              src="/img4.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt-1 shadow-xl rounded"
            />
          </div>
        </div>
      </section>

      {/* 6. Closing Section */}
      <section className="bg-white py-10">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          Join C3 Soccer Today
        </h2>
      </section>
    </div>
  );
}
