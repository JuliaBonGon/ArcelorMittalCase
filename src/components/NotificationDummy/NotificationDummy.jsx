import img from "../../assets/img/teams-activity-feed-overview.png";

export default function NotificationDummy () {
    console.log(`NotificationDummy()`);

    return (
        <>
            <div id="notificationDummyWrapper">
                <img id="notificationDummy" src={img} alt="oh no, the notification dummy img didn't load" />
            </div>
        </>
    );
}