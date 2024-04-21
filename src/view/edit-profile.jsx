import React from "react";
import Navbar from "../components/navbar";
import ProfileComponent from "../components/profileComponent";

function EditProfile() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-8">
        <ProfileComponent />
      </div>
    </div>
  );
}

export default EditProfile;
