
import React from 'react'
import Tdy from '../TimeDateDay/Tdy';
import ferme from "../../assets/ferme.jpg";
import vide from "../../assets/vide.jpg"
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000/";
const socket = socketIOClient(ENDPOINT);


export default function Cards() {

  const [etat, setetat] = React.useState(false)


// console.log(socket.once('test ', d=>{
//   console.log("passe: ",d);
// }));

socket.on('slu', d=>{
  console.log("donne1 :",d);
  setetat(d)
  if (d === 1) setetat(true);else setetat(false)
})

socket.on('test', d=>{
  console.log("donne2 :",d);
  setetat(d)
  // if (d === 1) setetat(true);else setetat(false)
})

// console.log(socketIOClient)rs

socket.emit('isOn', "allumer")
socket.emit('test', "ca marche")

  return (
    <div className="grid grid-cols-3 gap-4 overflow-auto  md:grid-cols-3  ">
      <div className="pl-20">
      {/* <p className='pl-10 pt-5 text-xl'>Etat de la poubelle:</p> */}
        <div className="columns-1  border-black ">
          {!etat && <img className="   " src={ferme} alt="vide" />}
          {etat && <img className="   " src={vide} alt="vide" />}
        </div>
      </div>
      <div className="bg-white"><Tdy/></div>

      <div className="">
      <div className=" pl-20 ">
        {/* <p className='pl-10 pt-5 text-xl'>Alerte:</p> */}
        <div className="columns-1  border-black ">
        <img className="" src={vide} alt="vide" />
        </div>
      </div>
      </div>
    </div>
  )
}
