import hbs_chat from "./chat.hbs";
import "./chat.css";

export default function renderChatPreview() {
  let outLine: string = "";
  //    messages.forEach(message => {
  outLine =
    outLine +
    hbs_chat({
      class: "self",
      text: "a very long message Lorum... Test wrap message into box",
      date: "10.10.2022",
      photo: "IMAGE",
      name: "Ivan Ivanovich",
    });
  //    });
  return outLine;
}
