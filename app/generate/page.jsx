"use client";
import React, { useState } from "react";
import Upload from "../components/Upload";
import Qrcode from "../components/Qrcode";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("upload");

  return (
    <div>
      

      <select
        onChange={(e) => setSelectedOption(e.target.value)}
        className="border p-2 rounded text-white bg-transparent/20 shadow"
        >
        <option value="upload" className="text-black">Upload</option>
        <option value="qrcode" className="text-black">QR Code</option>
      </select>

      <div className="mt-4">
        {selectedOption === "upload" && <Upload />}
        {selectedOption === "qrcode" && <Qrcode />}
        </div>
      </div>
  );
};

export default Page;
