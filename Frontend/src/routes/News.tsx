import React, { useState } from "react";

const News: React.FC = () => {
  const newsItems = [
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/6633aeda7a30e2733c964aae_C3FC Soccer_college_commits_2024-p-500.jpg",
      category: "College Commitments",
      title: "2024 College Commitments",
      date: "May 2",
      description:
        "Congrats to our 2024 C3FC Soccer Soccer Club College Commits!",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/6515b95d2e32c79d2eaab485_RSCxSocParentingnobc-p-500.png",
      category: "Partners",
      title:
        "C3FC Soccer Introduces New Partnership with the Soccer Parenting Association",
      date: "September 29",
      description: "Youth soccer parents & coaches.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/65164b64d615fba83fd50375_C3FC Soccer-72-p-500.jpg",
      category: "",
      title: "C3FC Soccer Makes 3 Outstanding New Hires",
      date: "June 3",
      description:
        "C3FC Soccer makes 3 outstanding new hires to enhance the player environment and maximize potential.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/6420a0a15fb648b417c559bf_96B14A57-31AF-48F2-A782-1003310FF938-p-500.png",
      category: "",
      title: "Pick Your Jersey Number! - Last 48 Hrs!",
      date: "April 3",
      description:
        "Here's your chance to purchase your favorite number for the upcoming uniform cycle.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64209dd09c81e847d4dcad3a_2539FF48-E0E1-44DE-BF7A-5C34FA60B98F-p-500.png",
      category: "",
      title: "C3FC Soccer Advanced: Player Referral Program",
      date: "April 2",
      description:
        "An exciting new Referral Program to help spread the word about your positive C3FC Soccer experiences.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64209ad274d27295f995c147_80620B65-CA1F-4156-8E69-BAE5C372C181-p-500.png",
      category: "",
      title: "C3FC Soccer Recreational: Player Referral Program",
      date: "April 2",
      description:
        "Refer friends to C3FC Soccer and help grow our community with your positive experiences.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/64265e3479729a94657b8ba6_B8742532-0A68-4B7B-A228-F17F3F38920D-p-500.jpg",
      category: "",
      title: "C3FC Soccer U17 Boys Reach the Final 4",
      date: "March 30",
      description:
        "C3FC Soccer U17 boys reach the final 4 of the National Academy Championships.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/63f5658629ee9cf99d46c97c_image-p-500.jpeg",
      category: "Awards",
      title: "U.S. Youth Soccer Player of the Year & All American",
      date: "February 22",
      description:
        "Marcos Moore has been selected as the 2022 youth boys soccer player of the year.",
    },
    {
      imageUrl:
        "https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/63ab21c98d1db741a411b973_everyone2-p-500.jpg",
      category: "College Commitments",
      title: "2023 Fall College Commitments",
      date: "October 9",
      description:
        "Congrats to our 2023 C3FC Soccer Soccer Club College Commits!",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredNews = selectedCategory
    ? newsItems.filter((item) => item.category === selectedCategory)
    : newsItems;

  return (
    <>
      <div className="pt-40 mx-4 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-45">
        <h1 className="text-3xl sm:text-4xl font-bold my-6 px-2 sm:px-10 md:px-20 lg:px-28 xl:px-35">
          C3FC Soccer NEWS
        </h1>
        <img
          src="https://cdn.prod.website-files.com/5ec2ed9690a5ba94fd8cdafb/67be2e3bb706e7084b30fb52_67ba5c6bae476.image-p-1600.jpg"
          alt=""
          className="w-full sm:w-4/5 md:w-3/4 mx-auto"
        />
      </div>

      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-80 my-8">
        <h3 className="text-base font-bold uppercase text-gray-900">EVENTS</h3>
        <h2 className="text-lg font-bold uppercase text-gray-600 mb-2">
          Dempsey leads Reliant Youth Clinic In Honor of World Cup 26™
        </h2>
        <h3 className="text-base font-bold uppercase text-gray-900 mb-1">
          February 25
        </h3>
        <p>
          Over 100 of our competitive players recently participated in a free
          soccer clinic hosted in partnership with Reliant. Led by U.S. Soccer
          legend Clint Dempsey, the clinic offered a unique opportunity for our
          players to improve their skills and learn from one of the most
          decorated figures in U.S. soccer history. This event, part of
          Reliant's ongoing support of local soccer, is a testament to the
          shared commitment between C3FC Soccer Soccer Club and Reliant to grow
          the game and inspire the next generation of players.
        </p>
        <p className="underline my-3 font-bold text-gray-500">READ MORE</p>
      </div>

      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-80 mb-10 border-b-2 border-gray-400">
        <p className="none"></p>
      </div>

      <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-start sm:items-center gap-3 mx-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-80 my-10">
        {/* Category Dropdown */}
        <select
          name="category"
          id="category"
          className="border border-black text-gray-700 px-4 py-2 w-full sm:w-60 outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Category</option>
          {[
            ...new Set(newsItems.map((item) => item.category).filter(Boolean)),
          ].map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="border border-black w-full pl-10 pr-4 py-2 text-gray-700 outline-none"
          />
        </div>

        {/* Clear Button */}
        <button
          className="bg-yellow-300 hover:bg-yellow-400 px-6 py-2 font-bold text-black uppercase w-full sm:w-auto"
          onClick={() => setSelectedCategory("")}
        >
          Clear
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-10 md:px-20 lg:px-40 xl:px-80 pb-20">
        {filteredNews.map((item, index) => (
          <div key={index} className="flex flex-col max-w-full sm:max-w-sm">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-600 uppercase">
                {item.category}
              </p>
              <h3 className="text-md font-bold text-pink-700 uppercase">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium uppercase mt-1">
                {item.date}
              </p>
              <p className="text-sm text-gray-700 mt-2">{item.description}</p>
              <p className="mt-3 text-pink-700 font-bold text-sm underline cursor-pointer">
                READ MORE
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="py-5 font-bold mb-5 flex justify-center items-center text-gray-500">
        Page 1 of 5
      </div>
    </>
  );
};

export default News;
