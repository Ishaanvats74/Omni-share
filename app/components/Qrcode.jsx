import { QRCodeSVG } from 'qrcode.react'
import React, { useRef, useState } from 'react'

const Qrcode = () => {
    const link = useRef(null);
    const [url,setUrl] =  useState('');

    const upload = ()=>{
        setUrl(link.current.value);
    }

    const cancel = ()=>{
        setUrl('');
        link.current.value = "";
        
    }
  return (
     <div>
        <div>
            <input type="text" ref={link} />
            <button disabled="" onClick={upload}>Upload</button>
            <button onClick={cancel}>cancel</button>
        </div>
        {url &&(
            <div>
                <QRCodeSVG value={url} size={128}/>
            </div>
            )
        }
     </div>
  )
}

export default Qrcode
