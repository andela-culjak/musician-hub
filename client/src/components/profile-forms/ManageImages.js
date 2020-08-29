import React, { useState } from "react";
import UploadImage from "./UploadImage";

const ManageImages = () => {
  const categories = ["avatar", "cover"];
  const [category, setCategory] = useState("avatar");

  return (
    <div className="p-2">
      <h1 className="large page-title">Profile Images</h1>

      <div className="profile-nav box-sh-subtle my-2 bg-tr-dim p-1 p-sm-05">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`nav-category mx-1 mx-sm-05 ${cat === category && "selected"}`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <UploadImage type={category} />
    </div>
  );
};

export default ManageImages;
