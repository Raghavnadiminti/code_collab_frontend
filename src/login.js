import './App.css';
import React from 'react'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){

    const [username,set_username]=useState('')
    
    const [password,set_password]=useState('')
    const [processing,setProcessing]=useState(false)
    const [msg,setmessage]= useState('') 
    const [flag,setFlag]=useState('') 
    const navigate=useNavigate() 
    const [wrong,setwrong]=useState(false)
   

    function setusername(e){
      console.log(e.target.value,"tytyt")
        set_username(e.target.value)
    }
 
    function set_Password(e){
        set_password(e.target.value)
    }
 
 
 
    function validate(){
     setProcessing(true)
     console.log("hi",username,password)
     let valid_state=true
     try{
       if(username!=null && username!=undefined && username.length>=7){ 
         const usernameRegex = /^[a-zA-Z0-9_]+$/;
          valid_state=usernameRegex.test(username);    
       }
       
       if(!valid_state){
         setProcessing(false)
         setmessage("this is not valid username") 
         return valid_state
       }
 
       if(password){
            
         const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
         valid_state=passwordRegex.test(password);
 
          if(!valid_state && password.length<=5){
              setProcessing(false) 
              setmessage("this is password is too weak must contain special chracters and digits")
          }
 
       }
       else{
              valid_state=false 
 
              if(!valid_state){
                 setProcessing(false) 
              setmessage("password is not confirmed")
 
              return valid_state
              }
       }
     
 
     return valid_state
   
   
   
   
   }
     catch(e){
         console.log("issue",e) 
 
         setProcessing(false) 
         setmessage(" issue with us ")
         return false 
     }
 
    }
 
 
    async function form_validation(){
       
     try{
           if(validate()){
            let m= await axios.post(`https://code-collab-backend-wvci.onrender.com/login?username=${username}&password=${password}`).then((res)=>{
              console.log(res.data)
              if(res.data){
              sessionStorage.setItem('username',username)
              navigate('/home')
              }
              else{
                setwrong(true)
              }
            }).catch((err)=>{console.log(err)})
           }
           else{
             setFlag(false)
           }
         }
 
         catch(e){
                      console.log("error",e)
         }
    }
 
       
     return(
             <>
            <div className="container">
                        <div className="welcome">
                          <h1>Unlock the Power of Collaboration - Log in to Code Together!</h1>
                        </div>
                        
                        <div className="croom">
                          
                        <h1>Code_Collab</h1>
                        <p className="text">Username :</p> 
                            <input type="text" placeholder='username' onChange={(e)=>{set_username(e.target.value)
                              console.log(e.target.value)
                            }}></input> <br />
                            <p className="text">Password :</p> 
                            <input type="password" placeholder="password" onChange={set_Password}></input><br />
                            <p></p>
                            <button className="signin" onClick={form_validation}>Login</button>
                            {wrong&&<p>wrong credentials</p>}
                            {!flag&&<p>{msg}</p>}
                            <p>don't have account?<button className='logsignup' onClick={()=>{navigate('/')}}>Sign Up</button></p>
                        </div>
                       

             </div>
             
             
             
             </>
     )
}