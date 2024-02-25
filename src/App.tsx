import { useRef, useState } from 'react';
import Quill from 'quill';
import Editor from './Editor/Editor';
import 'quill/dist/quill.snow.css';
import './App.css';


const App = () => {
  const [data, setData] = useState('');
  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill>();

  function sendData() {
    if (quillRef.current) {
      const value = quillRef.current.getSemanticHTML();
      fetch('/page', { method: 'POST', body: value });
    }

  }

  function downloadData() {
    fetch('/page')
      .then((response) => response.text())
      .then((data) => setData(data));
  }

  return (
    <div>
      <div className="ediotr">
        <Editor ref={quillRef} />
        <button onClick={sendData}> Отправить </button>
        <button onClick={downloadData}> Получить </button>
      </div>
      <div className="container ql-editor" dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default App;
