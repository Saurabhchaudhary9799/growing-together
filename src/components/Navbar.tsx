"use client"
import { Menu } from 'lucide-react';
import { loadComponents } from 'next/dist/server/load-components';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';




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
            <Button className=''>Add</Button>
           <span className='border p-1 rounded'><Menu/></span>
       </div>
    </div>
  )
}

export default Navbar