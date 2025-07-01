'use client'
import React, { useRef, useState } from 'react'


const Generate = () => {
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




  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
      <div className='border p-10 rounded-lg shadow-lg bg-white text-center'>
        <h1>Upload File </h1>
        <div className='flex items-center justify-center'>
          <input type='file' multiple className='border-2 border-gray-300 p-2 rounded-md' ref={inputFileRef} onChange={handleFileChange}/>
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

export default Generate
