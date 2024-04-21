import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import { FaCheckCircle } from "react-icons/fa";

function Profiles() {
  const [people, setPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://bytive-backend-vvu0.onrender.com/people/allPeople")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getRandomPhoto = () => {
    const photos = [
      "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=",
      "https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?s=612x612&w=0&k=20&c=-twL1NKKad6S_EPrGSniewjh6776A0Ju27ExMh7v_kI="
    ];
    return photos[Math.floor(Math.random() * photos.length)];
  };

  const filteredPeople = people.filter((person) => {
    const nameMatch = person.username.toLowerCase().includes(searchQuery.toLowerCase());
    const techStackMatch = person.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return nameMatch || techStackMatch;
  });

  return (
    <div className="flex flex-row min-h-screen bg-white mt-16 lg:ml-72 gap-4">
      <div className="flex flex-col rounded-md border h-36 w-60 mt-1">
        <div className="bg-gray-200 h-12 items-center ">
          <h1 className="text-center mt-2.5 text-gray-700">Search Graduates</h1>
        </div>
        <input
          type="text"
          placeholder="Name, keywords, tech stack"
          className="mt-2 py-1.5 px-1 mx-2 justify-center border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <hr className="mt-2" />
        <button className="justify-center border rounded-md bg-blue-600 text-white w-52 my-1.5 mx-4 py-1">
          Search
        </button>
      </div>

      <div className="flex flex-col ml-4">
        {filteredPeople.map((person, index) => (
          <div key={index} className="flex flex-row border rounded-xl w-[600px] h-48 pt-4 mb-4">
            <div className="ml-4 mt-4">
              <Avatar imageUrl={getRandomPhoto()} />
            </div>

            <div className="flex flex-col ml-6 mt-2 w-80">
              <h1 className="font-bold text-xl">{person.username}</h1>
              <p className="text-sm">{person.bio}</p>
              <div className="flex flex-row mt-4">
                {person.techStack.map((tech, index) => (
                  <button key={index} className="border p-1 ml-2 bg-gray-100 rounded-md text-xs">
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col text-center items-center mt-2 ml-4">
              <div className="flex flex-row items-center">
                <FaCheckCircle className="text-sm" />
                <p className="ml-1 text-sm">Available</p>
              </div>
              <button className="bg-blue-500 border rounded-md text-white mt-2 p-1 text-sm">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profiles;
