import { json } from 'node:stream/consumers';
import React, { useRef } from 'react';
import NavigationBar from './NavigationBar';
function Ics() {

  const fileRef = useRef()

  const submitData = (e) => {
    e.preventDefault();

    const formData = new FormData()
    let file = fileRef.current.files[0]

    formData.append('file', fileRef.current.files[0])
    formData.append('filename', fileRef.current.value)

    console.log(file)

    fetch("http://127.0.0.1:5000/ics", {
      method: 'POST',
      body: { file },
      mode: 'no-cors'
    }).then(res => res.json().then(data => console.log(data)))
      .catch(e => alert("an error occured trying to add the ics file."))
  }


  return (
    <>
      <div style={{ height: "100vh" }}>
        <NavigationBar text={"ics"} />
        <form action='http://127.0.0.1:5000/ics' method='post' encType='multipart/form-data'>
          <h1> Please upload .ics files to add to events to your calendar </h1>
          <input type="file" name="file" accept='.ics' />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Ics;
