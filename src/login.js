import './App.css';
import React from 'react'; 
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){

    const [username,set_username]=useState('')
    const [email,set_email]=useState('')
    const [password,set_password]=useState('')
    const [processing,setProcessing]=useState(false)
    const [msg,setmessage]= useState('') 
    const [flag,setFlag]=useState('') 
    const navigate=useNavigate() 
   

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
            let m= await axios.post(`http://localhost:5000/login?username=${username}&password=${password}`).then((res)=>{
              console.log(res.data)
              if(res.data){
              sessionStorage.setItem('username',username)
              navigate('/home')
              }
            })
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
             <div className="input_container">

                        <p className="text">Username</p> 
                        <input type="text" placeholder='username' onChange={(e)=>{set_username(e.target.value)
                          console.log(e.target.value)
                        }}></input> 
                        <p className="text">password</p> 
                        <input type="password" placeholder="password" onChange={set_Password}></input>
                        <p></p>
                        <button className="signin" onClick={form_validation}></button>
                        <p>donthave account?<button onClick={()=>{navigate('/')}}>signin</button></p>
                       

             </div>
             
             
             
             </>
     )
}