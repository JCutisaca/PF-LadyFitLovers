import { CLOSE_CHAT } from "../actionTypes";
const closeChat = () => {
  // console.log("closeChat");
  return {
    type: CLOSE_CHAT,
  };
};

export default closeChat;
