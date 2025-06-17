import { Button } from "../components/ui/button";

export default function Recreational() {
    return (
        <div className="w-full">
            {/* 1. Hero Section */}
            <section className="w-full">
                <img
                    src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03b3f487fabb75e511d17_rise-rec-hero-p-2000.jpeg"
                    alt="Recreational Hero"
                    className="w-full h-auto object-cover"
                />
            </section>

            {/* 2. Centered Text Section */}
            <section className="bg-white text-center py-16 px-3 ">
                <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
                    <h1 className="text-4xl font-bold uppercase">Rise Rec</h1>
                    <h2 className="text-lg font-semibold text-red-600">Birth Years: 2022 (U4) - 2014 (U12)</h2>
                    <p className="text-base text-lg text-gray-700 text-left mb-20">
                        RISE Recreational – “RISE Rec” – simple, convenient, organized, and player centric
                        soccer. Our program introduces young players to the beautiful game. RISE Rec is, at heart,
                        a community-based program, with teams formed from numerous geographic locations. The program
                        provides a wholesome and safe environment for players who are either new to soccer or team
                        sports to play in a non-competitive format conducive to learning. Our curriculum focuses on
                        developing your player’s technical skills, building their confidence, and maximizing their
                        creativity by allowing them to learn the game gradually in an enjoyable, stress-free, and
                        engaging environment. Be ready to watch your player's passion, imagination and creativity get sparked!
                    </p>
                </div>
            </section>

            {/* 3. Two Column Section with Overflowing Image */}
            <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Why RISE Rec</h2>
                        <p className="text-gray-800 text-lg">
                            RISE Rec is unique in that training sessions for ages 3-12 is led by our licensed
                            and enthusiastic Rec Player Development Coaches. This assures your player
                            will be in an excellent, stable, and uplifting training environment that is conducive
                            to learning from their earliest soccer experience. While our Rec Program is non-competitive,
                            players are always encouraged to compete to the best of their abilities.
                        </p>
                        <p className="text-gray-800 text-lg">
                            Through this growth and development process, interested players can matriculate from our Recreational
                            Program to our Competitive Program will have a better understanding of the club’s mission, culture, and
                            player development philosophies.
                        </p>
                        <h3 className="text-2xl font-bold uppercase mb-10">At RISE, the success of your player ultimately determines our success.</h3>
                    </div>

                    <div className="relative -mt-10 md:-mt-20 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03b4697d22a86ed9eb8e5_rise-rec-1.jpg"
                            alt="Kids Playing Soccer"
                            className="w-full max-w-md mx-auto md:-mt-20 shadow-xl rounded"
                        />
                    </div>
                </div>
            </section>

            {/* 4. Image Overflow Followed by Text List */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
                    <div className="relative -mt-5 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03b4d42acf248adfdfa91_rise-rec-2.jpg"
                            alt="Recreational Kids"
                            className="w-full md:-mt-28 shadow-xl rounded"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Rise with us</h2>
                        <div className="space-y-2 text-gray-700 text-lg">
                            {[
                                "Weekly practices and games",
                                "Team jersey and equipment",
                                "Fun-focused training",
                                "Supportive coaching staff",
                                "End-of-season awards",
                                "Age-appropriate competition",
                                "Access to RISE resources",
                                "Parent engagement opportunities",
                                "Local match participation",
                                "Development-focused curriculum",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-orange-500 font-bold mr-2">{'>'}</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. Final Section with Info Blocks and Image */}
            <section className="bg-[#96cfdc] h-[210vh] py-15 px-4 text-start">
                <div className="max-w-5xl mx-auto space-y-8">
                    <h2 className="text-4xl font-bold uppercase">REC Programs</h2>

                    <div className="grid md:grid-cols-1/3 gap-15">
                        {/* Repeat this div for each program */}
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Rec Preschool</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2022 (U4) - 2021 (U5)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The RISE Preschool Program is our introductory level offering to our youngest players, most of whom
                                are new to soccer. While your player is having fun playing in highly interactive training
                                sessions, they will be learning and improving their fundamental technical skills.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Rec Grade School</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2020 (U6) - 2014 (U12)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The first years in RISE Rec are very formative and will greatly influence the pathway your player chooses
                                in the future. This program is designed for both new and returning players who are typically seeking a
                                seasonal activity to exercise and develop friendships, and who want to be part of a team and a club.
                                Most RISE Rec players consider soccer one of their favorite sports, but have multiple commitments outside of soccer.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Rec Preschool</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2022 (U4) - 2021 (U5)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The RISE Preschool Program is our introductory level offering to our youngest players, most of whom
                                are new to soccer. While your player is having fun playing in highly interactive training
                                sessions, they will be learning and improving their fundamental technical skills.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03b541e9b2a82c8a78b25_rise-rec-4.jpg"
                            alt="Team Spirit"
                            className="relative left-1/2 -translate-x-1/2 w-full max-w-5xl shadow-xl rounded"
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
