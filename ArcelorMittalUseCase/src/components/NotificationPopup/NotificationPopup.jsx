import { useState } from "react";
import popup from "../../assets/img/popup.png";
import template from "../../assets/img/notificationtemplate.png";
import "./NotificationPopup.css";

export default function NotificationPopup() {
    console.log(`NotificationPopup()`);

    const [hiding, setHiding] = useState("hidden");

    function popupHandler() {
        setHiding(hiding === "hidden" ? "visible" : "hidden");
    }

    return (
        <>
            <div id="main">
                <div id="imgWrapper">
                    <img src={template}></img>
                </div>
                <button onClick={popupHandler}>TRY</button>
                <div id="popup" style={{ visibility: hiding }}>
                    <img src={popup}></img>
                </div>
            </div>
        </>
    );
}