import { AUTH_USER } from "../actionTypes";
import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE;
const endpoint = `${API_URL_BASE}/user/loginFacebook`;
const endpoint2 = `${API_URL_BASE}/user/`;

const authFacebookUser = (profileObj) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, {profileObj} );
            const id = data.idUser;
            const config = {
                headers: {
                    authorization: `Bearer ${data.token}`
                }
            }
            const response = await axios.get(endpoint2 + id, config);
            return dispatch({
                type: AUTH_USER,
                payload: response.data,
                idUser: response.data.id,
                accessToken: data.token,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default authFacebookUser;