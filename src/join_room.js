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
             
       await  axios.get(`http://localhost:5000/checkrooms?room_name=${roomname}&roomCode=${passCode}`).then((res)=>{
         console.log(res.data)
         if(res.data){
                          navigate(`/editor?roomname=${roomname}&host=${res.data.host}&lang=${res.data.language}`,{replace:true})
         }
       })

      }

     return (
                   <>
                   
                      <div className='container'>

                                  <label>enter roomname</label>
                                  <input onChange={(e)=>{setroomname(e.target.value)}}></input>
                                  <label>passcode</label> 
                                  <input onChange={(e)=>{setpassCode(e.target.value)}}></input> 
                                  <button onClick={handleClick}></button>
                      </div>
                   
                   
                   
                   </>





     )
       
}
