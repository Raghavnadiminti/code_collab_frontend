import './App.css';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create_room(){
     const [roomname,setroomname]=useState('')
     const [passCode,setpassCode]=useState('') 
     const [flag,setflag]=useState(false)
     const [lang,setLang]=useState("java")
     const [username,setUsername]=useState('Raghavendra') 
     const navigate=useNavigate()
     useEffect(()=>{

        let m= sessionStorage.getItem('username')?sessionStorage.getItem('username'):"Raghavendra";
        setUsername(m)

     })

      async function handleClick(){
             
       await  axios.post('https://code-collab-backend-wvci.onrender.com/createroom',{roomname:roomname,passCode:passCode,lang:lang,username:username}).then((res)=>{console.log(res.data)
         if(res.data){
            navigate(`/editor?roomname=${roomname}&host=${username}&lang=${lang}`)
         }
       }).catch((err)=>{console.log(err)})

      }

     return (
                   <>
                   
                   <div className='container'>
                                    <div className="welcome">
                                    <h1>Collaborate. Code. Create – Together!</h1>
                                    </div>

                                  <div className="croom">
                                    <h1>Code_Collab</h1>

                                    <label className='dia'>Room Name :</label>
                                    <input onChange={(e)=>{setroomname(e.target.value)}}></input><br />
                                    <label className='dia'>Room Code :</label>
                                    <input onChange={(e)=>{setpassCode(e.target.value)}}></input> <br />
                            
                                    <label className='dia' htmlFor="language-select" >Choose a programming language : </label>
                                    <select id="language-select" value={lang} onChange={(e)=>{setLang(e.target.value)}}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="python">Python</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="cpp">C++</option>
                                    <option value="cpp">Java</option>
                                    </select><br />

                                    <button onClick={handleClick} className="btn">Create Room</button>

                                  </div>
                      </div>
                   
                   
                   
                   </>

                   
                   
                 





     )
       
}
