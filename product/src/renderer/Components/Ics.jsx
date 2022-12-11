
import React, { useRef } from 'react';
import NavigationBar from './NavigationBar';
import '../Styles/ics.css'
function Ics() {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <NavigationBar text={"ics"} />
        <form action='http://127.0.0.1:5000/ics' method='POST' encType='multipart/form-data'>
          <h1> Please upload .ics files to add to events to your calendar </h1>
          <input type="file" id="fileINPUT" name="file" accept=".ics" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Ics;
