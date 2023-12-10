import axios from "axios";
import { GET_CART } from "../actionTypes";

const API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE;
const endpoint = `${API_URL_BASE}/cart/user/`;

const getCart = (userId, accessToken2) => {

  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${accessToken2}`
        }
      }
      const { data } = await axios.get(endpoint + userId,
      config
      );
      return dispatch({
        type: GET_CART,
        payload: data.products,
      });
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };
};

export default getCart;
