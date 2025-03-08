import { set } from 'mongoose';
import './App.css';
import React from 'react'; 
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signin(){

    const [username,set_username]=useState('')
    const [email,set_email]=useState('')
    const [password,set_password]=useState('')
    const [processing,setProcessing]=useState(false)
    const [msg,setmessage]=useState('')
    const [flag,setFlag]=useState(true)
    const navigate=useNavigate() 
 
    function setusername(e){
    
        set_username(e.target.value)
    }
 
    function set_Password(e){
        set_password(e.target.value)
    }
 
    function setEmail(e){
        set_email(e.target.value)
    }
 
 
    function validate(){
     setProcessing(true)
     console.log(username,password)
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
         console.log(e) 
 
         setProcessing(false) 
         setmessage(" issue with us ")
         return false
     }
 
    }
 
 
    async function form_validation(){
       
     try{
           if(validate()){
                let m= await axios.post(`http://localhost:5000/signup?username=${username}&password=${password}`).then((res)=>{
                  console.log("hii",res.data)
                  if(res.data){
                    navigate('/login')
                  }
                })
           }
           else{
             setFlag(false)
             console.log("hi",msg)
           }
         }
 
         catch(e){
                      console.log("hii",e)
         }
    }
    
    useEffect(()=>{
      console.log("eww",msg)
    },[msg])
       
     return(
             <>
             <div className="input_container">

                        <p className="text">Username</p> 
                        <input type="text" placeholder='username' onChange={setusername}></input> 
                        <p className="text">Email</p> 
                        <input type="email" placeholder="eg:fafafd@gmail.com" onChange={set_email}></input> 
                        <p className="text">password</p> 
                        <input type="password" placeholder="password" onChange={set_Password}></input>
                      
                        <button className="signin" onClick={form_validation}></button>
                        <p>already have account?<button onClick={()=>{navigate('/login')}}>Login</button></p>

             </div>
             
             
             
             </>
     )
}