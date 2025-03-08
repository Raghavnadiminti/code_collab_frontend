import React from 'react'
import {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home(){

       const navigate=useNavigate()

    return(

        <>
        
        <h1>Welcome to Code_collab</h1>
        <div>
        <button onClick={()=>{navigate('/createroom')}}>Create room</button>
        <button onClick={()=>{navigate('/joinroom')}}>Join room</button>
        </div>
        
        </>
    )


}


