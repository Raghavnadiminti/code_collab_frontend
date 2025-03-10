import React from 'react'
import {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home(){

       const navigate=useNavigate()

    return(

        <>
        
        <div className="homecontainer">
            <h1>Welcome to <span>Code_Collab</span></h1>

            <h2>Code Together, Anytime, Anywhere – Create or Join a Collaborative Coding Room!</h2>
            <div>
            <button onClick={()=>{navigate('/createroom')}}>Create room</button>
            <button onClick={()=>{navigate('/joinroom')}}>Join room</button>
            </div>
        </div> 
        
        </>
    )


}


