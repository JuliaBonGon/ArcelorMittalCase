import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shareForm.css";

export default function ShareForm({ article }) {
    console.log(`ShareForm(article)`);

    const personInputRef = useRef();
    const navigate = useNavigate();

    function shareSubmitHandler() {
        if (personInputRef.current.value === "MYSELF") {
            console.log("SHARE TO MYSELF");
        }
        else {
            navigate("/tab/notificationDummy");
        }
    }

    return (
        <>
            <div id="pageWrapper">
                <h1 id="articleTitle">{article.title}</h1>
                <div id="shareFormWrapper">
                    <Link id="goBackSubmit" to="/tab">
                        <button>Go Back</button>
                    </Link>
                    <h2 id="shareFormTitle">Who do you want to share this to?</h2>
                    <div id="personInputWrapper">
                        <label id="personInputLabel" htmlFor="personInput">Select a contact</label>
                        <select id="personInput" ref={personInputRef}>
                            <option>John</option>
                            <option>Bob</option>
                            <option>Patrick</option>
                            <option>Sally</option>
                            <option>MYSELF</option>
                        </select>
                    </div>
                    <button id="shareSubmit" onClick={shareSubmitHandler}>SHARE</button>
                </div>
            </div>
        </>
    );
}