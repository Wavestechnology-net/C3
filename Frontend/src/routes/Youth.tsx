import { Button } from "../components/ui/button";

export default function YouthAcademy() {
    return (
        <div className="w-full">
            {/* 1. Hero Section */}
            <section className="w-full">
                <img
                    src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03ba31e5bedbd9dfd5808_rise-ya-hero.jpg"
                    alt="Recreational Hero"
                    className="w-full h-auto object-cover"
                />
            </section>

            {/* 2. Centered Text Section */}
            <section className="bg-white text-center py-16 px-3 ">
                <div className="max-w-5xl mx-auto flex flex-col items-start space-y-4">
                    <h1 className="text-4xl font-bold uppercase">Rise Youth Academy</h1>
                    <h2 className="text-lg font-bold text-red-600">Birth Years: 2019 (U7) - 2016 (U10)</h2>
                    <p className="text-base text-lg text-gray-700 text-left mb-5">
                        The RISE Youth Academy introduces your player with their first experiences in competitive soccer.
                        This program allows players, who excelled at the recreational level to rapidly advance their technical
                        skills along with like minded players under the watchful eyes of the RISE Player Development Staff.
                        The Youth Academy pairs determined players with advanced coaches who are passionate about player
                        development. Together, this synergy creates an inspiring, yet challenging environment where your
                        player will learn and progress at a rapid rate.
                    </p>
                    <p className="text-base text-lg text-gray-700 text-left">
                        At RISE, we take the player development process seriously, our approach isn't left to chance. The Player
                        Development Staff meticulously prepares each activity within our training sessions. We use a teaching
                        method of guided discovery to promote individual player development within the team concept. We not only
                        teach your player about technique, but also build their Soccer IQ's by helping them recognize and
                        understand game situations. We are invested in helping your player reach their goals and we understand
                        that your player's success is ours.
                    </p>
                    <Button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-gray-800 w-fit mb-5">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* 3. Two Column Section with Overflowing Image */}
            <section className="bg-[#96cfdc] py-10 px-4 relative overflow-visible">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase">Why RISE Youth Academy</h2>
                        <p className="text-gray-800 text-lg">
                            RISE Youth Academy players must demonstrate a steady commitment to training to
                            ensure proper development through consistent touches on the soccer ball and regular
                            instruction from elite coaches. As your player ages through the Youth Academy, they
                            will have developed a strong fundamental skill level, an understanding of our style of
                            play, and become immersed in the culture at RISE. Your player can register on a seasonal
                            or yearly basis for this program.
                        </p>
                        <p className="text-gray-800 text-lg mb-15">
                            RISE uses the pool training concept in our Youth Academy to ensure your player is consistently
                            in a high quality training environment. Pool training shifts the focus away from team development
                            and prioritizes individual player development. During pool sessions, RISE players will be grouped
                            together with players who have similar skill levels with the understanding that players develop at
                            different stages. Increased competition, an improved training environment, and accelerated player
                            development are all by-products of the pool training.
                        </p>
                    </div>

                    <div className="relative -mt-10 md:-mt-20 z-10">
                        <img
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03baba60d10542a075723_rise-ya-1.jpg"
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
                            src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bb1100f793fe406a196_rise-ya-2.jpg"
                            alt="Recreational Kids"
                            className="w-full md:-mt-28 shadow-xl rounded mb-40"
                        />
                    </div>

                    <div className="space-y-4 md:flex md:items-start md:gap-10">
                        <div className="md:w-1/2">
                            <img
                                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03bb80ee175b866e4c5fc_rise-ya-3.jpg"
                                alt="Recreational Kids"
                                className="w-full md:-mt-28 shadow-xl rounded"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-4 ">
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
                </div>
            </section>

            <section className="bg-white py-5 px-4">
                <div className="max-w-5xl mx-auto space-y-6">
                    <h2 className="text-xl font-bold uppercase text-gray-900">
                        MISSED PLAYER EVALUATIONS?
                    </h2>
                    <p className="text-lg text-gray-700">
                        Contact our Youth Academy Directors to schedule an evaluation!
                    </p>

                    <div className="space-y-2">
                        <p className="text-lg text-gray-800 flex items-start">
                            <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                            <span>
                                <strong className="font-bold">Boys Director:</strong> Jose Sideregts -{' '}
                                <a href="mailto:jose@risesc.org" className="text-pink-700 font-bold underline">
                                    JOSE@RISESC.ORG
                                </a>
                            </span>
                        </p>
                        <p className="text-lg text-gray-800 flex items-start">
                            <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                            <span>
                                <strong className="font-bold">Girls Director:</strong> Nolverto Rodriguez -{' '}
                                <a href="mailto:nolverto@risesc.org" className="text-pink-700 font-bold underline">
                                    NOLVERTO@RISESC.ORG
                                </a>
                            </span>
                        </p>
                    </div>

                    <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold uppercase px-6 py-3 rounded w-fit">
                        Register Now
                    </button>
                </div>
            </section>

            <section className="bg-white py-12 px-4">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Heading */}
                    <h2 className="text-4xl font-extrabold uppercase text-gray-900">
                        Youth Academy Programming
                    </h2>

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
                                <span>Due to league rules, seasonal players will be registered with RISE on a yearly basis even if they don't participate in the Spring season.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                <span>RISE does not cover fees for coach travel to games and/or events outside of the greater Houston area, this fee should be divided among parents if applicable.</span>
                            </li>
                        </ul>
                    </div> */}

                    {/* Seamless Table */}
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="bg-[#93d1df] border-x-4 border-t-4 border-[#1c2e4a]">
                                <td className="p-6 border-r-2 border-[#1c2e4a] align-top" colSpan={2}>
                                    <h3 className="text-pink-600 text-xl font-bold uppercase">
                                        Fall 2025 Season Length
                                    </h3>
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
                                            <span>Due to league rules, seasonal players will be registered with RISE on a yearly basis even if they don't participate in the Spring season.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                            <span>RISE does not cover fees for coach travel to games and/or events outside of the greater Houston area, this fee should be divided among parents if applicable.</span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            {/* Add more rows below to extend table */}
                            <tr className="bg-[#93d1df] border-x-4 border-t border-b-2 border-[#1c2e4a]">
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
                                <td className="p-6 border-r-4 border-[#1c2e4a] align-top" colSpan={2}>
                                    <h3 className="text-pink-600 text-xl font-bold uppercase">
                                        Fall 2025 Season Length
                                    </h3>
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
                                            <span>Due to league rules, seasonal players will be registered with RISE on a yearly basis even if they don't participate in the Spring season.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 font-bold mr-2 mt-1">{'>'}</span>
                                            <span>RISE does not cover fees for coach travel to games and/or events outside of the greater Houston area, this fee should be divided among parents if applicable.</span>
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
            </section>


            <section className="bg-white py-30">
                <h2 className="text-4xl font-bold text-center text-black uppercase">
                    RISE WITH US
                </h2>
            </section>
        </div>
    );
}
