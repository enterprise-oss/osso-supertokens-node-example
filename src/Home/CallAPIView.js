import axios from "axios";
import { useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

const apiPort = process.env.API_PORT || 3001;
const apiUrl = process.env.API_URL || `http://localhost:${apiPort}`;

export default function CallAPIView() {
    useEffect(() => {
        Session.addAxiosInterceptors(axios);
    }, []);

    return (
        <div
            onClick={callAPIClicked}
            class="sessionButton">
            Call API
        </div>
    );
}

async function callAPIClicked() {
    // this will also automatically refresh the session if needed
    let response = await axios.get(apiUrl + "/sessioninfo");
    window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2))
}