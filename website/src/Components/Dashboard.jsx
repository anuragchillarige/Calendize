import React from 'react';
import Navbar from './Navbar'
import '../Styles/Dashboard.css'
function Dashboard(props) {
  return (
    <div className='dashPage'>
      <Navbar title={props.title} />
    </div>
  );
}
export default Dashboard;
