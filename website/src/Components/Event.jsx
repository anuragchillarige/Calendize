// this file is for each individual event
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Event(props) {

    let delInterval = setInterval(() => { }, 1000);


    const del = async (id) => {
        clearInterval(delInterval)
        console.log("getting deleted")
        await deleteDoc(doc(db, "users", props.event.user, "events", id));
    }

    function getTime() {
        let hr = parseInt(props.event.start_time.substring(0, props.event.start_time.indexOf(":")));
        let min = parseInt(props.event.start_time.substring(props.event.start_time.indexOf(":") + 1));
        if (min < 10) {
            min = "0" + min;
        }
        if (hr > 12) {
            hr = hr % 12;
            return hr + ":" + min + " pm";
        }

        if (hr === 12) {
            return hr + ":" + min + "pm"
        }

        return hr + ":" + min + " am";
    }

    let deleted = false
    delInterval = setInterval(async () => {
        const today = new Date();
        if (deleted === false && today > props.event.end) {
            console.log(deleted + " " + props.event.name)
            await del(props.event.docID);
            deleted = true;
        }
    }, 2000)

    return (
        <div className="event-holder-card">
            <div className="tick-holder">
                <div className="body-holder">
                    <h3>{props.event.name}</h3>
                    <h4>{props.event.details}</h4>
                    <h5>{props.event.day.toString().substring(0, 16)} | {getTime()} | {props.event.duration.hours} hours {props.event.duration.mins} minutes</h5>
                </div>
                <div>
                    <i className="bi bi-check2" onClick={() => (del(props.event.docID))}></i>
                </div>

            </div>
            {/* bi bi-check2 */}
        </div >
    )
}