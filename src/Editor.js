import React, { useEffect, useState, useMemo } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const socket = io("https://code-collab-backend-wvci.onrender.com");

function Editor({ language, theme, onCodeChange, code }) {
  const [editorCode, setEditorCode] = useState(code);
  const [lang, setLang] = useState(language);
  const [searched] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const prev_code = sessionStorage.getItem('code');
    if (prev_code) {
      setEditorCode(prev_code);
      onCodeChange(prev_code);
    }

    socket.emit('join_room', { username: 'raghav', roomname: searched.get("roomname") });

    socket.on('code', ({ code, lang }) => {
      setEditorCode(code);
      setLang(lang);
      onCodeChange(code);
    });

    socket.on('close', ({ res }) => {
      if (res) {
        navigate('/home',{replace:true});
        sessionStorage.removeItem('code')
      }
    });

    return () => {
      socket.off('code');
      socket.off('close');
    };
  }, [searched, navigate, onCodeChange]);

  useEffect(() => {
    setLang(language);
  }, [language]);

  function code_change(e) {
    setEditorCode(e);
    sessionStorage.setItem('code', e);
    onCodeChange(e);
    socket.emit('change', { roomname: searched.get("roomname"), code: e, lang: lang });
  }

  return (
    <MonacoEditor
      width="205vh"
      height="900vh"
      language={lang}
      theme={theme}
      onChange={code_change}
      value={editorCode}
    />
  );
}

export default function TakeInput() {
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [searched] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [running, setRunning] = useState(false);
  const [input_toggle, setInput_toggle] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLanguage(searched.get("lang"));
  }, [searched]);

  const handleInputToggle = (n) => {
    setInput_toggle(n);
  };

  const handleRun = async () => {
    setRunning(true);
    console.log(language)
    try {
      const response = await axios.post('https://code-collab-backend-wvci.onrender.com/code_run', { code, lang: language, input });
      setOutput(response.data.output);
      setShowPopup(true);
      setRunning(false);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setShowPopup(true);
      setRunning(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEndEditor = () => {
    const isHost = searched.get("host") === sessionStorage.getItem("username");
    socket.emit("disconnect_", { roomname: searched.get("roomname"), username: "raghav", role: isHost ? 0 : 1 });
    sessionStorage.removeItem('code')
    navigate('/home', { replace: true });
  };

  return (
    <div id="theme-container">
      <div className="languageInput">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="nocss2">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <label htmlFor="theme" style={{ marginLeft: '20px' }}>Select Theme: </label>
        <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} className="nocss2">
          <option value="vs-dark">Dark Theme</option>
          <option value="vs">Light Theme</option>
          <option value="hc-black">High Contrast</option>
        </select>

        {searched.get("host") === sessionStorage.getItem('username') && (
          <button onClick={handleEndEditor} className="nocss">End</button>
        )}
        <button onClick={handleRun} style={{ marginTop: '20px' }} className="nocss">{running ? "Running.." : "Run"}</button>
        <button className="nocss" onClick={() => handleInputToggle(true)}>Input</button>
      </div>

      <Editor language={language} theme={theme} code={code} onCodeChange={setCode} />

      {input_toggle && (
        <div className="popup">
          <div className="popup-inner">
            <textarea
              rows="10"
              cols="50"
              onChange={(e) => setInput(e.target.value)}
              className="input_code"
            />
            <button className="close-btn" onClick={() => handleInputToggle(false)}>Close</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Output</h3>
            <pre>{output}</pre>
            <button className="close-btn" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
