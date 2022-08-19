import React from 'react';
import NavigationBar from './NavigationBar';
function Ics() {

  return (
    <>
      <div style={{ height: "100vh" }}>
        <NavigationBar text={"ics"} />
        <form onSubmit={e => { e.preventDefault(); }}>
          <h1> Please upload .ics files to add to events to your calendar </h1>
          <input type="file" accept=".ics" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Ics;