import hbs_aside_chat_preview from "./aside_chat_preview.hbs";
import "./aside_chat_preview.css";
<<<<<<< HEAD
import { user as User } from "Modules/User";
=======
import { user as User } from "../../modules/User";
>>>>>>> main

export default function renderAsideChatPreview() {
  let outLine: string = "";
  User.chats?.forEach((chat) => {
    outLine =
      outLine +
      hbs_aside_chat_preview({
        id: chat.id,
        img: chat.avatar,
        name: chat.title,
        msg: chat.last_message?.content,
        fulltime: chat.last_message?.time,
        time: chat.last_message?.time,
        unreadMsgs: chat.unreaded_count,
      });
  });
  return outLine;
}
