import { FILT_BY_COLOR } from "../actionTypes";

export const filtByColor = (color) => {
  return {
    type: FILT_BY_COLOR,
    payload: color,
  };
};
