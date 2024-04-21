import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Multiselect from "./multiSelect";
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from "./spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

function ProfileComponent() {
  const interestList = ["Engineering", "Security", "Management"];
  const seekingList = ["Internship", "Remote", "FT Position", "Not seeking"];
  const techList = ["Ruby", "Rails", "Javascript", "Html/Css3"];

  const [selectedInterestItems, setSelectedInterestItems] = useState([]);
  const [selectedSeekingItems, setSelectedSeekingItems] = useState([]);
  const [selectedTechItems, setSelectedTechItems] = useState([]);
  const [spin, setSpin] = useState(false);

  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gravatar: "",
    techStack: selectedTechItems,
    location: "",
    fieldOfInterest: selectedInterestItems,
    seeking: selectedSeekingItems,
    bio: "",
    githubURL: "",
    twitterURL: "",
    website_URL: "",
    linkedinURL: "",
  });

  const handleSelectedChange = (items, type) => {
    switch (type) {
      case "Interest":
        setSelectedInterestItems(items);
        break;
      case "Seeking":
        setSelectedSeekingItems(items);
        break;
      case "TechStack":
        setSelectedTechItems(items);
        break;
      default:
        break;
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validateURL(formData.website_URL)) {
      toast.error("Please enter a valid website URL.");
      return;
    }
    setSpin(true);
    try {
      const response = await fetch(`https://bytive-backend-vvu0.onrender.com/people/update/${user.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile succesfully updated");
        setTimeout(() => {
          setSpin(false);
        }, 5000);
        console.log("Form data submitted successfully!");
        console.log(formData);      
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setTimeout(() => {
          setSpin(false);
        }, 5000);
        console.error("Failed to submit form data");
        console.log(formData);
      }
    } catch (error) {
      toast.error("Error occurred while submitting form data");
      setTimeout(() => {
        setSpin(false);
      }, 2000);
      console.error("Error occurred while submitting form data:", error);
      console.log(formData);
    }
  };

  console.log(selectedInterestItems, selectedSeekingItems, selectedTechItems);

  const handleDelete = async () => {

    setSpin(true);
    try {
      const response = await fetch(`https://bytive-backend-vvu0.onrender.com/people/delete/${user.user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        toast.success("Profile successfully deleted");
        setSpin(false);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setSpin(false);
      }
    } catch (error) {
      toast.error("Error occurred while deleting the profile");
      setSpin(false);
    }
  };

  const validateEmail = (email) => {
    if (email.trim() === "") {
      return true;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validateURL = (url) => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return true; 
    }
  
    const trimmedURL = url.trim();
    const pattern = /^(ftp|http|https):\/\/(www\.)?[^ "]+$/;
    return pattern.test(trimmedURL);
  };
  

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <h1 className="ml-32 text-3xl font-bold mt-4">Academy Student Sign up</h1>

      <div className="flex flex-row ml-36 mt-8">
        <div className="flex flex-col">
          {/* Name and toggle button */}
          <div className="flex flex-row">
            <div className="flex flex-row text-center">
              <h1 className="mt-1">Name</h1>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                className="border rounded-md ml-4 px-2 py-1 text-gray-400"
                value={formData.name}
                onChange={handleFormDataChange}
              />
            </div>

            <div className="flex flex-row items-center ml-20">
              <h1 className="mr-2">Hireable</h1>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* email */}
          <div className="flex flex-row text-center mt-8">
            <h1 className="mt-1">Email</h1>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              className="border rounded-md ml-5 px-2 py-1 text-gray-400"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </div>

          {/* password */}
          <div className="flex flex-row text-center mt-8">
            <h1 className="mt-1">Pass-</h1>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              className="border rounded-md ml-4 px-2 py-1 text-gray-400"
            />
          </div>

          {/* confirm-password */}
          <div className="flex flex-row text-center mt-8">
            <h1 className="mt-1">Pass-</h1>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Confirm password"
              className="border rounded-md ml-4 px-2 py-1 text-gray-400"
            />
          </div>

          {/* date of grad */}
          <div className="flex flex-row text-center mt-8">
            <h1 className="mt-1">Date of Grad.</h1>
            <div className="relative max-w-sm ml-4 mt-[-4px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* github */}
          <div className="flex flex-row text-center mt-8">
            <h1 className="mt-1">Github</h1>
            <input
              type="text"
              name="githubURL"
              id="github"
              placeholder="Your github"
              className="border rounded-md ml-4 px-2 py-1 text-gray-400"
              value={formData.githubURL}
              onChange={handleFormDataChange}
            />
          </div>

          {/* website and location */}
          <div className="flex flex-row mt-8">
            <div className="flex flex-row text-center">
              <h1 className="mt-1">Website</h1>
              <input
                type="url"
                name="website_URL"
                id="website"
                placeholder="Your website"
                className="border rounded-md ml-4 px-2 py-1 text-gray-400"
                value={formData.website_URL}
                onChange={handleFormDataChange}
              />
            </div>

            <div className="flex flex-row text-center ml-4">
              <h1 className="mt-1">Location</h1>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Your location"
                className="border rounded-md ml-2 px-2 py-1 text-gray-400"
                value={formData.location}
                onChange={handleFormDataChange}
              />
            </div>
          </div>

          {/* bio */}
          <div className="flex flex-row text-center mt-6">
            <h1 className="mt-1">Bio</h1>
            <textarea
              type="text"
              name="bio"
              id="bio"
              placeholder="Your bio"
              className="border rounded-md ml-4 px-2 py-1 text-gray-400 w-[512px]"
              value={formData.bio}
              onChange={handleFormDataChange}
            />
          </div>
        </div>

        <div className="border h-[516px] w-1 ml-12 bg-black"></div>

        <div className="flex flex-col ml-8">
          {/* PROFILE */}
          <div className="flex flex-row text-center items-center ml-8">
            <h1 className="mt-1">Upload Profile Pic</h1>
            <FaCirclePlus className="ml-4" />
            <div className="relative inline-flex items-center justify-center w-36 h-36 ml-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-5xl text-gray-600 dark:text-gray-300">
                JL
              </span>
            </div>
          </div>

          {/* field of interest */}

          <div className="flex flex-row text-center items-center mt-8 ml-8">
            <h1 className="mt-1">Interest</h1>
            <Multiselect
              items={interestList}
              onSelectedChange={(items) =>
                handleSelectedChange(items, "Interest")
              }
            />
          </div>

          {/* seeking */}

          <div className="flex flex-row text-center items-center mt-8 ml-8">
            <h1 className="mt-1">Seeking</h1>
            <Multiselect
              items={seekingList}
              onSelectedChange={(items) =>
                handleSelectedChange(items, "Seeking")
              }
            />
          </div>

          {/* techstack */}
          <div className="flex flex-row text-center items-center mt-8 ml-8">
            <h1 className="mt-1">TechStack</h1>
            <Multiselect
              items={techList}
              onSelectedChange={(items) =>
                handleSelectedChange(items, "TechStack")
              }
            />
          </div>

          <div className="flex flex-row items-center justify-center mt-8 ml-8">
            <button
              onClick={handleSubmit}
              className="rounded-lg border bg-black text-white px-2 py-2 w-full hover:bg-gray-700"
            >
              {spin && <Spinner />}
              {!spin && "Submit Profile"}
            </button>
            <MdDelete onClick={handleDelete} className="text-4xl ml-4 text-red-500 hover:text-red-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
