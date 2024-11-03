"use client"
import React, { useEffect, useState } from 'react'
import MenuBar from './MenuBar';




const Navbar = () => {
  const [username,setUsername] = useState<string>("");
  useEffect(()=>{
     const user = localStorage.getItem("user")
     setUsername(user ? user : "");
    //  console.log(typeof(user))
  },[])
  return (
    <div className='navabr flex justify-between items-center border  py-2 px-4'>
       <h1>{username}</h1>
       <div className='flex items-center gap-x-5'>
            
            <MenuBar/>
       </div>
    </div>
  )
}

export default Navbar