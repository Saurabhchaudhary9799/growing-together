"use client"
import React, { useEffect, useState } from 'react'
import MenuBar from './MenuBar';
import logo from "../../public/itachi-alt.png"
import Image from 'next/image';


const Navbar = () => {
  const [username,setUsername] = useState<string>("");
  useEffect(()=>{
     const user = localStorage.getItem("user")
     setUsername(user ? user : "");
    //  console.log(typeof(user))
  },[])
  return (
    <div className='navabr flex justify-between items-center border  py-2 px-4'>
       <div className='flex items-center gap-x-2'> 
        <Image className='h-8 w-8' src={logo} alt="logo" width={400} height={400} />
        <h1 className='font-bold text-xl'>{username}</h1>
       </div>
       
       
       <div className='flex items-center gap-x-5'>
            
            <MenuBar/>
       </div>
    </div>
  )
}

export default Navbar