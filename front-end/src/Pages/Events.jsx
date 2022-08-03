import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import EventsHolder from "../Components/EventsHolder";
export default function Events(props) {
    return (
        <div className="main">
            <Navbar title={props.title} />
            <div className="housing" >
                <Input />
                <EventsHolder />
            </div>
        </div >
    )
}