'use client';
import { QRCodeSVG } from 'qrcode.react'
import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';


const Qrcode = () => {
    const link = useRef(null);
    const [url,setUrl] =  useState('');

    const upload = async ()=>{
        try{
            setUrl(link.current.value);
            Swal.fire({
                title: "Success",
                text: "Qr Code Generated!",
                icon: "success"
            });
        } catch(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };
    const cancel = ()=>{
        setUrl('');
        link.current.value = "";
    }
  return (
     <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
        <div className=' p-5 rounded-2xl shadow-lg bg-white space-y-5'>
            <div className='text-center text-2xl'>
                <h1>Qr Code Generator</h1>
            </div>
            <div className='flex flex-col space-y-3'>
                <input type="text" ref={link} className='hover:border-2 border rounded bg-gray-50 h-8 w-[300px] pl-2' placeholder='Drop Link Here'/>
                <div className='flex justify-center gap-5 ' >
                    <button disabled="" onClick={upload} className='border p-1'>Upload</button>
                    <button onClick={cancel} className='border p-1'>cancel</button>
                </div>
            </div>

            {url &&(
                <div>
                    <QRCodeSVG value={url} size={128}/>
                </div>
                )}
        </div>
     </div>
  )
}

export default Qrcode
