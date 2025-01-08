import img from "../../assets/img/teams-activity-feed-overview.png";
import { Link } from "react-router-dom";

export default function NotificationDummy () {
    console.log(`NotificationDummy()`);

    return (
        <>
            <div id="notificationDummyWrapper" style={{ display: "flex", flexDirection: "column" }}>
                <Link to="/tab/share">
                    <button>GO BACK</button>
                </Link>
                <img id="notificationDummy" src={img} alt="oh no, the notification dummy img didn't load" />
            </div>
        </>
    );
}