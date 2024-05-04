import { useState } from 'react';
import 'quill/dist/quill.snow.css';
import './App.css';


const AppForm = () => {
  const [data, setData] = useState<{status: number, data: string} | null>(null);


  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    fetch('/form', { method: 'POST', body: formData });
  }

  function downloadData() {
    fetch('/form')
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  return (
    <div>
      <form className="ediotr" onSubmit={onSubmit}>
        <input type='file' name='file' />
        <button type='submit'> Отправить </button>
        <button onClick={downloadData}> Получить </button>
      </form>
      <div className="container ql-editor" dangerouslySetInnerHTML={{ __html: data ? `<img src=${data.data} width="500" />` : '' }}></div>
    </div>
  );
};

export default AppForm;
