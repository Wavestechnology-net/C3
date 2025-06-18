import { Button } from "../components/ui/button";

export default function Competitive() {
    return (
        <div className="w-full">
            {/* 1. Hero Section */}
            <section className="w-full">
                <img
                    src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03beebcab7f2c2ee13eb8_rise-competitive-hero.jpg"
                    alt="Recreational Hero"
                    className="w-full h-auto object-cover"
                />
            </section>

            {/* 2. Centered Text Section */}
            <section className="bg-white text-center py-16 px-3 ">
                <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
                    <h1 className="text-4xl font-bold uppercase">Rise Competitive</h1>
                    <h2 className="text-lg font-semibold text-red-600">Birth Years: 2016 (U10) - 2008/07 (U18/19)</h2>
                    <p className="text-base text-lg text-gray-700 text-left mb-20">
                        Players in the RISE Competitive Program are committed to advancing their technical skills and will 
                        embrace the high-level of coaching. As your player ages through the program, they will be challenged 
                        both physically and mentally with other like-minded players. In the end, we trust that your player 
                        will find that through their dedication and commitment, the process was highly rewarding and memorable.
                    </p>
                </div>
            </section>

            {/* 3. Two Column Section with Overflowing Image */}
            <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Why RISE Competitive</h2>
                        <p className="text-gray-800 text-lg">
                            RISE dedicates significant resources to ensure that we provide your player an environment that 
                            includes: elite national competition platforms, excellent facilities, top-caliber coaches, cutting-edge 
                            technology, carefully curated talent management systems and flexible cost structures to assist your 
                            player in achieving their development goals.
                        </p>
                        <p className="text-gray-800 text-lg">
                            At RISE we rely on our Player Development Coaches to educate, prepare and guide your player through our 
                            program with the understanding that the success of our club is uniquely tied to the experiences, 
                            opportunities and successes we give our players and their families.
                        </p>
                        <h3 className="text-2xl font-bold uppercase mb-10">the success of our club is uniquely tied to the experiences, 
                            opportunities and successes we give our players and their families.</h3>
                    </div>

                    <div className="relative -mt-10 md:-mt-30 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bf4ec3177cef10c6590_rise-competitive-1.jpg"
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
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bf9e7de177d5c3df82f_rise-competitive-2.jpg"
                            alt="Recreational Kids"
                            className="w-full md:-mt-28 shadow-xl rounded"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Rise with us</h2>
                        <div className="space-y-2 text-gray-700 text-lg">
                            {[
                                "Cohesive club structure",
                                "Incentive based Player Referral Program",
                                "Monthly payment plans",
                                "Multiple child discount",
                                "Organized programming",
                                "Elite Player Development Coaches",
                                "Yearly Teams",
                                "Central & Southwest Houston locations",
                                "Local, state, and regional competitions",
                                "2 weekly 80 minute training sessions",
                                "Minimum of 2 RISE events included in fees",
                                "Seasonal player feedback written and/or in person",
                                "College placements assistance and resources",
                                "Reliant Energy Power Awards Program",
                                "Reduced electricity rates via Reliant Energy",
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
            <section className="bg-[#96cfdc] h-auto md:h-[255vh] py-15 px-4 text-start">
                <div className="max-w-5xl mx-auto space-y-8">
                    <h2 className="text-4xl font-bold uppercase">Competitive Programs</h2>

                    <div className="grid md:grid-cols-1/3 gap-15">
                        {/* Repeat this div for each program */}
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Select</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2015 (U11) - 2008/07 (U18/19)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                Select teams require a yearly commitment, however the program is designed for players 
                                who are seeking a less rigorous and competitive soccer environment. Select teams train 
                                together in pool sessions and must be willing to commit to making the most of their training 
                                sessions and games in order to keep the teams viable and in a positive environment.
                            </p>
                            <Button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Premier</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2015 (U11) - 2008/07 (U18/19)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The Premier Program will appeal to players who are at the top of their game when they 
                                exit the Youth Academy phase and want to continue their rapid upward trajectory or are 
                                looking to play a high level of soccer without having to travel for in season games. 
                                Your player is provided with a higher level of coaching, preparation, and competition 
                                than what is offered in the Select Program.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Advanced BOOST Program</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                2019 (U7) - 2011 (U15)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                Our Advanced BOOST Program offer a great supplemental training option for players that 
                                want to put in additional work outside of their team sessions, improve soccer skills, 
                                improve deficiencies in their current performance or train more functionally.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">DESIRE League</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                2019 (U7) - 2016 (U10)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                Welcome to Desire League, the premier in-house league offered by RISE Soccer Club. Designed 
                                for young athletes who are passionate about soccer and eager to enhance their skills, Desire 
                                League provides a competitive yet supportive environment where players can thrive.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c0410d0ee175b866e8b400_rise-competitive-4.jpg"
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
