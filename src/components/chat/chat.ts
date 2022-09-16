import hbs_chat from "./chat.hbs";
import "./chat.css";
import { user as User } from "../../modules/User";

export default function renderChatPreview() {
  let outLine: string = "";

  const messages = User.messages;
  messages?.forEach((message: any) => {
    if (message.user_id == User.id) {
      message.class = "self";
    } else {
      message.class = "noself";
    }
  });

  let photo = "";
  let name = "чат";
  User.currentChat;
  User.chats?.forEach((chat) => {
    if (chat.id == User.currentChat.id) {
      photo = chat.avatar!;
      name = chat.title!;
    }
  });

  outLine =
    outLine +
    hbs_chat({
      photo: photo,
      name: name,
      messages: messages,
    });
  return outLine;
}
