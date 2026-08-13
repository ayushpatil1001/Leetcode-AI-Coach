import axios from "axios";

const API = "http://localhost:8000/api/dashboard";

export async function getDashboard(username) {

    const res = await axios.get(
        `${API}/${username}`
    );

    return res.data;

}