import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Signin from './signin';
import { BrowserRouter as Router, Route, Routes,useNavigation } from 'react-router-dom';
import { useState} from 'react';
import Login from './login';
import Editor from './Editor';
import Join_room from './join_room';
import Create_room from './create_room';
import Home from './Home';

function ProtectedRoute({children}){

     const [flag,setFlag]=useState(false)  

     
     

     useEffect(()=>{

            setFlag(true)
     },[])
 
        if(flag){      
           return(
            <>
                 {children}

                  </>

           )
          }

          else{

            return (<><Login/></>)
          }
}






function App() {
  return (
   

        <Router>

                              <Routes>

                                               <Route path='/' element={<ProtectedRoute><Signin/></ProtectedRoute>}></Route>
                                               <Route path='/home' element={<Home/>}></Route>
                                               <Route path='/login' element={<Login/>}></Route>
                                               <Route path='/joinroom' element={<Join_room/>}></Route>
                                               <Route path='/createroom' element={<Create_room/>}></Route>
                                               <Route path='/editor' element={<Editor/>}></Route>



                              </Routes>

        </Router>

       
  );
}

export default App;
