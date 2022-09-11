import hbs_side_bar from "./side_bar.hbs";
import renderAsideChatPreview from "../aside_chat_preview/aside_chat_preview";
import "./side_bar.css";

export default function renderSideBarPreview() {
  let outLine: string = "";
  outLine =
    outLine +
    hbs_side_bar({
      chats: renderAsideChatPreview(),
      profileText: "профиль >",
      newChatText: "новый чат",
    });
  return outLine;
}
