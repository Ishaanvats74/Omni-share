'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const Navlinks=[
    {Name:"Home", path:"/"},
    {Name:"Generate",path:"/generate"},
    {Name:"About",path:"/about"},
  ]
  return (
    <div className='flex justify-between px-10 py-2 shadow mb-2 '>
      <div>
        <p className='text-3xl'>Omni-Share</p>
      </div>
      <div>
        <div className='flex gap-5 text-xl'>
          {Navlinks.map((link,index)=>{
            return(
              <Link key={index} href={link.path}>{link.Name}</Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar
