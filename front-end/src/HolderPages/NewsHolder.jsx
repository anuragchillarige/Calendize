import React from 'react'
import News from '../Pages/News'
import Navbar from '../Components/Navbar';
function NewsHolder(props) {
    return (
        <div>
            <Navbar title={props.title} />
            <News />
        </div>
    );
}

export default NewsHolder;
