import React from 'react';
import NavigationBar from './NavigationBar';
function Ics() {

  return (
    <>
      <div style={{ height: "100vh" }}>
        <NavigationBar text={"ics"} />
        <form>
          <h1> Please drop .ics files to add to events to your calendar </h1>
          <input type="file" accept=".png,.jpeg,.jpg,.svg" multiple />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Ics;
