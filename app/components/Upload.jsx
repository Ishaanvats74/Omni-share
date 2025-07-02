'use client';
import React, { useRef, useState } from 'react'

const Upload = () => {
    const inputFileRef = useRef(null);
     const [selected, setSelected] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

   const handleFileChange = (e)=>{
    setSelected(Array.from(e.target.files || []));
  }

  const handleRemove =()=>{
    setSelected([])
    inputFileRef.current.value = '';
  }
  
    const handleUpload = async () => {
    if (selected.length === 0) return console.log("Nothing is selected");
    setIsUploading(true);

    try {
        for (const file of selected) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("/app/api/upload/route.js", {
        method: 'POST',
        body: formData,
    });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed");

        console.log("Uploaded:", file.name);
        }

        alert('Files uploaded successfully!');
        handleRemove();
    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed!');
    } finally {
        setIsUploading(false);
    };
    
  } 
   return (
    <div className="flex flex-col items-center justify-center h-screen"> 
      <div className='border p-10 rounded-lg shadow-lg bg-white text-center'>
        <h1>Upload File </h1>
        <div className='flex items-center justify-center'>
          <input type='file' name='file' multiple className='border-2 border-gray-300 p-2 rounded-md' ref={inputFileRef} onChange={handleFileChange}/>
          <button disabled={selected.length === 0 || isUploading} onClick={handleRemove} className='ml-2'>X</button>
        </div>
        <div>
          {selected.length > 0 ? (
            selected.map((e,index)=>(
              <p key={`file-${index}`} className="mt-2">selected: {e.name}</p>
            ))) : (
            <p className="text-gray-500 mt-2">No files selected</p>

          )}
        </div>
        <button disabled={selected.length === 0 || isUploading} onClick={handleUpload} className='ml-2'>Upload</button>
      </div>
    </div>
  )
}

export default Upload
