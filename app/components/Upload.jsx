"use client";
import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Swal from "sweetalert2";
import copy from "copy-to-clipboard";

const Upload = () => {
  const inputFileRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setSelected(Array.from(e.target.files || []));
  };

  const handleRemove = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    const result = await swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });
 
        if (result.isConfirmed) {
          try {
            const response = await fetch("/api/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ url }),});
              const res = await response.json();
            setSelected([]);
            inputFileRef.current.value = "";
            setUrl("");
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            
          } catch (error) {
            
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
  };

  const handleUpload = async () => {
    if (selected.length === 0) return console.log("Nothing is selected");
    setIsUploading(true);

    try {
      const formData = new FormData();
      selected.forEach((file) => {
        formData.append("file", file);
        console.log("Uploaded:", file.name);
      });

      const response = await fetch("api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");

      console.log("Uploaded ZIP URL:", result.files[0].url);

      Swal.fire({
        title: "Success",
        text: "Files uploaded successfully!",
        icon: "success",
      });
      setUrl(result.files[0].url);
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Upload failed!",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyLink = () => {
    copy(url);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "Download link copied to clipboard.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-white/10 shadow bg-white/10 p-10 text-xl space-y-5 text-white rounded-2xl text-center">
        <h1 className="text-3xl font-semibold text-center">Upload File </h1>
        <div className="flex items-center justify-center">
          <input
            type="file"
            name="file"
            multiple
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple-400"
            ref={inputFileRef}
            onChange={handleFileChange}
          />
          
        </div>
        <div>
          {selected.length > 0 ? (
            selected.map((e, index) => (
              <p key={`file-${index}`} className="mt-2">
                selected: {e.name}
              </p>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No files selected</p>
          )}
        </div>
        <div className="flex w-full justify-between gap-5">
            <button
            disabled={selected.length === 0 || isUploading}
            onClick={handleUpload}
            className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 transition rounded-xl font-semibold"
            >
            Upload
            </button>
            <button
                disabled={selected.length === 0 || isUploading}
                onClick={handleRemove}
                className="w-full mt-4 py-2 bg-gray-400 hover:bg-gray-500 transition rounded-xl font-semibold"
                >
                Cancel
            </button>
        </div>
        {url && (
          <div className="mt-4 flex  justify-between flex-wrap gap-4">
            <div className="flex flex-col">
              <p>Download URL:</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline "
              >
                {url}
              </a>
              <button onClick={copyLink}>copy</button>
            </div>
            <div className="mt-4 flex  flex-col items-center">
              <p>Scan QR:</p>
              <QRCodeSVG value={url} size={128} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
