import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Elite() {
    return (
        <div className="w-full">
            {/* 1. Hero Section */}
            <section className="w-full">
                <img
                    src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03c20e7de177d5c3e3d07_rise-elite-hero.jpg"
                    alt="Recreational Hero"
                    className="w-full h-auto object-cover"
                />
            </section>

            {/* 2. Centered Text Section */}
            <section className="bg-white text-center py-16 px-3 ">
                <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
                    <h1 className="text-4xl font-bold uppercase">Rise Elite</h1>
                    <h2 className="text-lg font-semibold text-red-600">Birth Years: 2013 (U13) - 2008/07 (U18/19)</h2>
                    <p className="text-base text-lg text-gray-700 text-left">
                        RISE Elite is the highest competitive level of programming we offer. The Elite Program is incredibly
                        rewarding but tremendously demanding. RISE Elites must demonstrate the highest level of commitment
                        to training at all times in order to maintain physical and mental readiness for competitions as roster
                        positions and playing time are 100% earned on merit and never guaranteed. Elite teams are formed from
                        the strongest players across our entire player pool and require a yearly commitment.
                    </p>
                    <p className="text-base text-lg text-gray-700 text-left">
                        The Elite program at RISE consists of 3 leagues that sit at the top of the soccer development pyramid
                        for every top club in the United States. The Girls Academy (GA), the Boys Elite Clubs National League
                        (ECNL), and the ECNL Regional League (ECNL-RL) provide top level national competition platforms for
                        elite youth athletes in the country. The purpose of these platforms is to provide a player-centric
                        environment, meaningful games, high standards that member clubs are required to adhere to, and most
                        importantly to maximize player opportunity and visibility. RISE Elite teams follow a highly challenging
                        and intricately designed curriculum aimed at preparing players for top college programs, professional
                        trials or opportunities with national teams.
                    </p>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 mb-25">
                        {/* Logo 1 */}
                        <Link to="/">
                            <img
                                src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5f4fe6a6237186221a3a7684_logo-ga.png"
                                alt="Logo 1"
                                className="h-30 object-contain"
                            />
                        </Link>
                        {/* Logo 2 */}
                        <Link to="/">
                            <img
                                src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/5f616873984abb3e197762b7_ECNL-Boys-Primary-Logo-p-500.png"
                                alt="Logo 2"
                                className="h-30 object-contain"
                            />
                        </Link>
                        {/* Logo 3 */}
                        <Link to="/">
                            <img
                                src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/609ae42e56096633e5186ba2_boysecnlregionalleague-p-500.png"
                                alt="Logo 3"
                                className="h-30 object-contain"
                            />
                        </Link>
                    </div>
                </div>
            </section>


            {/* 3. Two Column Section with Overflowing Image */}
            <section className="bg-[#96cfdc] py-20 px-4 relative overflow-visible">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Why RISE Elite</h2>
                        <p className="text-gray-800 text-lg">
                            RISE will work relentlessly to be recognized as a top youth soccer club in the country by developing impact
                            players and outstanding citizens who will flourish in an environment that seeks to provide the highest technical
                            standards in youth development along with an unparalleled environment, and support structure.
                        </p>
                        <p className="text-gray-800 text-lg">
                            RISE dedicates significant resources to ensure that we provide your player with an environment that includes:
                            elite national competition platforms, excellent facilities, top-caliber coaches, cutting-edge technology, carefully
                            curated talent management systems, and flexible cost structures to assist your player in achieving their development goals.
                        </p>
                    </div>

                    <div className="relative -mt-10 md:-mt-10 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03c25e7de177d5c3e419e_rise-elite-1.jpg"
                            alt="Kids Playing Soccer"
                            className="w-full max-w-md mx-auto md:-mt-20 shadow-xl rounded"
                        />
                    </div>
                </div>
            </section>

            {/* 4. Image Overflow Followed by Text List */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">
                    {/* <div className="relative -mt-5 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bf9e7de177d5c3df82f_rise-competitive-2.jpg"
                            alt="Recreational Kids"
                            className="w-full md:-mt-28 shadow-xl rounded"
                        />
                    </div> */}

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Elite Players Rise with us</h2>
                        <div className="space-y-2 text-gray-700 text-lg">
                            {[
                                "Funded, U13 & U18/19 top boys ECNL teams and top Girls Academy teams ($0 Club Fee)",
                                "50+ Professional and National Team players produced by RISE legacy clubs",
                                "800+ College Placements",
                                "1 DA National Championship (Texans SC - 2017)",
                                "3 National Championships",
                                "25 Regional Championships",
                                "60+ State Cup appearances",
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

            <section className="bg-white">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 py-10 items-start">
                <img
                    src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03cc43338f522fad758e1_rise-elite-1-2.jpg"
                    alt="Training"
                    className="rounded-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-4 uppercase">
                        Rise offers Elite Program Players
                    </h1>
                    <div className="space-y-2 text-gray-700 text-lg">
                            {[
                                "Cohesive club structure",
                                "Organized programming",
                                "Elite Player Development Coaches",
                                "Multiple professional pathways",
                                "Veo filming cameras",
                                "InStat video statistics and analytics",
                                "TRX fitness machines and fitness equipment",
                                "Individual player development plans",
                                "1-on-1 meetings with Player Development coaches",
                                "Access to facilities 7 days a week",
                                "Reliant Energy Power Awards Program",
                                "Monthly payment plans",
                                "Multiple child discount",
                                "Reliant Energy electricity plan",
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
            <section className="bg-[#96cfdc] h-auto md:h-[220vh] py-15 px-4 text-start">
                <div className="max-w-5xl mx-auto space-y-8">
                    <h2 className="text-4xl font-bold uppercase">Elite Programs</h2>

                    <div className="grid md:grid-cols-1/3 gap-15">
                        {/* Repeat this div for each program */}
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">Girls Academy (GA)</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2013 (U13) - 2008/07 (U18/19)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The Girls Academy (GA) is a new, member-led league that currently includes 59 
                                elite level clubs, including 45 former U.S. Soccer Girls’ DA clubs across the 
                                country. The GA consists of like-minded clubs who insist on a standard driven 
                                approach that enhances development for our players, coaches, and club.
                            </p>
                            <Button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">ECNL Boys (ECNL)</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2013 (U13) - 2008/07 (U18/19)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The Boys Elite Clubs National League (Boys - ECNL) was founded to improve the daily 
                                environment for boys youth soccer players through a collaborative club-based development 
                                program featuring competition, player identification, and coaching and club development 
                                platforms. The Boys ECNL will include both regular season conference games and cross-conference 
                                events, and qualifying teams from the Boys ECNL will advance to the postseason Elite 
                                National Premier League (ENPL) Playoffs.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-black uppercase">ECNL - Regional League - Boys (ECNL-RL)</h3>
                            <h4 className="text-xl font-semibold text-red-600">
                                Birth Years: 2013 (U13) - 2008/07 (U18/19)
                            </h4>
                            <p className="text-gray-700 text-xl w-full ">
                                The ECNL Boys Regional League (ECNL Regional League) was founded to improve the daily environment for 
                                boy’s youth soccer players through a collaborative club-based development program featuring competition, 
                                player identification, and coaching and club development platforms. The Boys ECNLRegional League will 
                                include both regular season conference games and cross-conference events, and qualifying teams will 
                                advance to the ECNL RegionalLeague Post Season event, held in conjunction with the ECNL Boys Post Season.
                            </p>
                            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03cca3338f522fad7638f_rise-elite-6.jpg"
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
