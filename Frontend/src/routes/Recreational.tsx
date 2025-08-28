export default function Recreational() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="w-full">
        <img
          src="/img4.jpg"
          alt="Recreational Hero"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* 2. Centered Text Section */}
      <section className="bg-white text-center py-10 px-3">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold uppercase">
            Recreational Soccer Program (Ages 4-12)
          </h1>
          <p className="text-lg text-gray-700 text-left">
            At C3FC Soccer Club, our Recreational Soccer Program is all about
            having fun, staying active, and enjoying the game no matter your
            skill level or experience.
          </p>
        </div>
      </section>

      {/* 3. Elevate Your Game */}
      <section className="bg-[#f3f3f3] py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold uppercase text-center">
            Play, Learn, and Grow
          </h2>
          <p className="text-lg text-gray-800">
            Designed for boys and girls ages 4 to 12 who want to enjoy soccer in
            a relaxed, supportive environment, this program focuses on:
          </p>
          <ul className="list-inside pl-5 text-gray-800 space-y-2">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Fun First:</strong> Encouraging a love for the game
              through engaging drills and friendly play
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Health and Fitness:</strong> Helping players stay active
              and build overall fitness
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              <strong>Skill Development:</strong> Basic fundamentals taught
              through age-appropriate training, emphasizing teamwork and
              sportsmanship
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold uppercase text-center">
            In-House Matches
          </h2>
          <p className="text-lg text-gray-800">
            Our Recreational Program features regular in-house matches where
            players get to put their skills to work in a low-pressure,
            community-focused setting. These games provide:
          </p>
          <ul className="list-inside pl-5 text-gray-800 space-y-2">
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              A safe, supportive environment for players to enjoy friendly
              competition
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              Opportunities to make new friends and strengthen team spirit
            </li>
            <li>
              <span className="text-yellow-400 font-bold mr-2 mt-1">{">"}</span>
              A chance to experience game day excitement without the pressure of
              travel or intense tournaments
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Why C3FC Section */}
      <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold uppercase">
              Why Join the C3FC Recreational Program?
            </h2>
            <ul className="list-inside pl-5 text-lg text-gray-800 space-y-2">
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Welcoming atmosphere for beginners and casual players
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Flexible schedules to fit busy lifestyles
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Emphasis on fun, fitness, and personal growth
              </li>
              <li>
                <span className="text-yellow-400 font-bold mr-2 mt-1">
                  {">"}
                </span>
                Strong community focus with coaches who care
              </li>
            </ul>
            <p>
              Whether you’re playing for fun or fitness, the C3FC Recreational
              Soccer Program is the perfect place to kick back, stay healthy,
              and be part of a great soccer community.
            </p>
          </div>
          <div className="relative lg-mt-10 md:-mt-1 z-10">
            <img
              src="/img8.jpg"
              alt="Kids Playing Soccer"
              className="w-full max-w-md mx-auto md:-mt-1 shadow-xl rounded"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-30">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          RISE WITH US
        </h2>
      </section>
    </div>
  );
}
