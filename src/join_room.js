import './App.css';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Join_room(){
     const [roomname,setroomname]=useState('')
     const [passCode,setpassCode]=useState('') 
     const [flag,setflag]=useState(false)
     const navigate=useNavigate()

      async function handleClick(){
             
       await  axios.get(`https://code-collab-backend-wvci.onrender.com/checkrooms?room_name=${roomname}&roomCode=${passCode}`).then((res)=>{
         console.log(res.data)
         if(res.data){
                          navigate(`/editor?roomname=${roomname}&host=${res.data.host}&lang=${res.data.language}`,{replace:true})
         }
       }).catch((err)=>{console.log(err)})

      }

     return (
                   <>
                   
                   <div className='container'>

<div className="jroom">
    <h1>Code_Collab</h1>
        <label>Room Name :</label>
    <input onChange={(e)=>{setroomname(e.target.value)}}></input><br />
    <label>Room Code :</label> 
    <input onChange={(e)=>{setpassCode(e.target.value)}}></input> <br />
    <button onClick={handleClick}>Join Room</button>
</div>
<div className="welcomejoin">
    <h1>Join the Code Party – Collaborate Seamlessly with Your Room Code!</h1>
</div>


</div>
                   
                   
                   
                   </>





     )
       
}
