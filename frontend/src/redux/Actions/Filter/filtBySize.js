import { FILT_BY_SIZE } from "../actionTypes";

export const filtBySize = (size) => {
  return {
    type: FILT_BY_SIZE,
    payload: size,
  };
};
