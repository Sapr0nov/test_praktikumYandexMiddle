import hbs_chat from "./chat.hbs";
import "./chat.css";
<<<<<<< HEAD
import { user as User } from "Modules/User";
import { Message } from "Modules/Chat";

export default function renderChatPreview() {
  let outLine: string = "";
  let placeholder: string = "";
  let messages: Array<Message & { class: string | null }> = [];

  if (User.messages === void 0) {
    placeholder = "Выберите чат";
  } else {
    messages = JSON.parse(JSON.stringify(User.messages!));
    messages?.forEach((message) => {
      if (message.user_id === User.id) {
        message.class = "self";
      } else {
        message.class = "noself";
      }
    });
  }
  console.log("chatPreview", User.messages);
  let photo = "";
  let name = "чат";

  const chat = User.chats?.find((chat) => chat.id === User.currentChat.id);
  photo = chat?.avatar!;
  name = chat?.title!;

  outLine =
    outLine +
    hbs_chat({
      photo: photo,
      name: name,
      messages: messages,
      placeholder: placeholder,
    });
=======

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
>>>>>>> main
  return outLine;
}
