import { Link } from "react-router-dom";
import "./shareForm.css";

export default function ShareForm({ article }) {
    return (
        <>
            <div id="shareFormWrapper">
                <div>
                    <Link to="/tab">
                        <button>Go Back</button>
                    </Link>
                    <h2 id="shareFormTitle">Who do you want to share this to?</h2>
                    <div id="inputWrapper">
                        <label htmlFor="personInput">Select a contact</label>
                        <select id="personInput">
                            <option>John</option>
                            <option>Bob</option>
                            <option>Patrick</option>
                            <option>Sally</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}