/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React ,{useEffect, useState}from "react";
import axios from 'axios'
import trees from "../../assets/login.jpg";
//import { Toaster } from 'react-hot-toast';
import { Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate,NavLink  } from 'react-router-dom';
export default function Login() {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

const validateForm = () => {
  const { email, password } = values;
  if (email === ""  ) {
    toast.error("Email et mot de passe obligatoire.", toastOptions);
    return false;
  } else if (password === "" ) {
    toast.error("mot de passe obligatoire.", toastOptions);
    return false;
  }
  return true;
};
const handleChange = (event) => {
  setValues({ ...values, [event.target.name]: event.target.value });
};

const [cookies] = useCookies([]);
const navigate = useNavigate();
useEffect(() => {
  if (cookies.jwt) {
    navigate("/");
  }
}, [cookies, navigate]);

const [values, setValues] = useState({ email: "", password: "" });
const generateError = (error) =>
  toast.error(error, {
    position: "bottom-right",
  });
const handleSubmit = async (event) => {
  event.preventDefault();
 
 
    if (validateForm()) {
      const { data } = await axios.post(  "http://localhost:4000/login", 
      {
            ...values,
           },
          { withCredentials: true } 
      );
      

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
       
       

      navigate("/cards")
      }
      if (data.errors ) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
            
 
      } 
    }
   
};
  return (
    <>
      
     <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-white flex flex-col justify-center">
        <form onSubmit={(e) => handleSubmit(e)}
        className="max-w-[400px] w-full mx-auto rounded-lg max-h-max md:mt-8 bg-emerald-600 mt-3 mb-3  p-20 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Connexion
          </h2>
          <div className="flex flex-col text-white py-2">
            <label>Email</label>
            <input
              className="p-2 rounded-lg text-black bg-white mt-2 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="email"
              name="email"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
           
            />
        
          </div>
          <div className="flex flex-col text-white py-2">
            <label>Mot de passe</label>
            <input
              className="p-2 rounded-lg text-black bg-white mt-2 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="password"
              name="password"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              
            />

          </div>

          <button className="w-5/12 ml-20 my-5 py-2  rounded-full bg-emerald-600 border-white border-2  text-white font-semibold " type="submit">
            Se connecter

          </button>
          {/* <div className="text-center py-4">
                <Link className="text-blue-500"  to="/reload"> <span className=' font-sans text-white'>Mot de passe oublié ? </span></Link>
              </div> */}
        </form>
      </div>

      <div className="w-full pt-16 space-x-0 hidden md:block">
        <p className=" text-6xl text-emerald-600 mt-3">Ensemble pour un </p>
        <p className=" text-6xl text-emerald-600"> Sénegal Zéro </p>
        <p className=" text-6xl text-emerald-600"> Déchet .</p>
        <img className="w-96 h-96" src={trees} alt="/" />
      </div>
    </div>
    <ToastContainer />
    </>
   
  );
}
