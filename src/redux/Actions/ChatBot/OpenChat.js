import { OPEN_CHAT } from "../actionTypes";
const openChat = () => {
  // console.log("open chat")
  return {
    type: OPEN_CHAT,
  };
};

export default openChat;
