import { ADDING_PRODUCT } from "../actionTypes";
const addingProduct = (product) => {
  return {
    type: ADDING_PRODUCT,
    payload: product,
  };
};

export default addingProduct;
