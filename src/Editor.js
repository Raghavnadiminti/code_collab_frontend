import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Editor(prop) {
  const [code, setCode] = useState('')
  const [lang,setlang]=useState(prop.language)
  const [searched]=useSearchParams() 
  const socket = io("http://localhost:5000")
  const navigate=useNavigate()
  // console.log( searched.get("host") )

  // console.log(prop.language)

  useEffect(() => {

    console.log("editor_loaded")
    
    let prev_code = sessionStorage.getItem('code')
    if (prev_code) {
      setCode(prev_code)
    }
 
    socket.emit('join_room', { username: 'raghav', roomname: searched.get("roomname") })

    socket.on('code', ({ code, lang }) => {
      setCode(code)
      setlang(lang) 

      console.log("hii",code)
    
    })
    socket.on('close',({res})=>{
      if(res){
        navigate('/home')
      }

    })
    let k= (searched.get("host")==sessionStorage.getItem("username"))?0:1;
    return () => { console.log("ooo") }

  }, [])
 async function handleRun(){
     await axios.post('http://localhost:5000/code_run',{code:code,lang:lang})
 }

  function code_change(e) {
    setCode(e)
    sessionStorage.setItem('code', code)

    socket.emit('change', { roomname:searched.get("roomname"),code:e,lang:lang })
  }


  return (
    <>
    <>
      <MonacoEditor widht="110vh" height="90vh" language={lang} theme={prop.theme} onChange={code_change} value={code} ></MonacoEditor>
      
    </>
    <button onClick={handleRun}>Run</button>
    </>
  )
}

export default function TakeInput() {

  const [language, setLanguage] = useState('python')
  const [theme, setTheme] = useState('vs-dark')
  const [searched] = useSearchParams()
  const navigate=useNavigate()
  const socket = io("http://localhost:5000")
  function langselect(e) {

    setLanguage(e.target.value)
  }

  function themeSelect(e) {
    setTheme(e.target.value)
  }
 
  function handleEndeditor(){
    let k= (searched.get("host")==sessionStorage.getItem("username"))?0:1;
    socket.emit("disconnect_",{roomname:searched.get("roomname"),username:"raghav",role:k})
    navigate('/home',{replace:true})
  }

  return (

    <div id="theme-container">
      <div className="languageInput" >
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={langselect}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
          <option value="sql">SQL</option>
          <option value="xml">XML</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>

        <label htmlFor="theme" style={{ marginLeft: '20px' }}>Select Theme: </label>
        <select id="theme" value={theme} onChange={themeSelect}>
          <option value="vs-dark">Dark Theme</option>
          <option value="vs">Light Theme</option>
          <option value="hc-black">High Contrast</option>
        </select>
   {(searched.get("host")==sessionStorage.getItem('username'))?<button onClick={handleEndeditor}>end code </button>:<></>}

      </div>
      <Editor language={language} theme={theme}  />





    </div>
  )

}