import { ORDER } from "../actionTypes";

const order = (value) => {
    return {
        type: ORDER,
        payload: value
    }
}

export default order;