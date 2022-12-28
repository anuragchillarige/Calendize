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
                    <h5>{props.event.day.toString().substring(0, 16)} | {props.event.start_time} | {props.event.duration.hours} hours {props.event.duration.mins} minutes</h5>
                </div>
                <div>
                    <i className="bi bi-check2" onClick={() => (del(props.event.docID))}></i>
                </div>

            </div>
            {/* bi bi-check2 */}
        </div >
    )
}