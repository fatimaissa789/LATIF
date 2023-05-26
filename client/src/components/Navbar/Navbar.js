/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { useNavigate,NavLink  } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BiExit } from "react-icons/bi";

export default function Navbar() { 
  const navigate = useNavigate();
 
const [cookies, setCookie, removeCookie] = useCookies([]);
useEffect(() => {
  const verifyUser = async () => {
    if (!cookies.jwt) {
      navigate("/");
    } else {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data.status);
      if (!data.status) {
        removeCookie("jwt");
        navigate("/");
      } else {
        toast(`BY ${data.user} 🦄`, {
          theme: "dark",
        });
      }
    }
  };
  verifyUser();
}, [cookies, navigate, removeCookie]);

const logOut = () => {
  removeCookie("jwt");
  navigate("/");
};
 
             // eslint-disable-next-line react-hooks/rules-of-hooks
  const[open, setOpen]= useState (false);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
 
  return (
    <div className="items-center bg-emerald-600  justify-between flex w-full space-x-4 pb-2 pt-4 px-3">
    {/* logo */}
    <div className=''>
   
    <div className='relative'>
    <h1>fakebook</h1>
				
    </div>

  </div>
  <div  className='bg-white relative'>
 

<button className= 'relative text-xl cursor-pointer ml-10   text-emerald-600 h-9' onClick={logOut}>
					<h5>Se deconnecter</h5>
				</button>
 

  </div>

  
    </div>
  )
}
