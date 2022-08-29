import Handlebars from "handlebars";
import hbs_aside_chat_preview from "./aside_chat_preview.hbs";
import "./aside_chat_preview.css";
import { user as User } from '../../modules/User';

export function renderAsideChatPreview() {
    let outLine:string = '';
    User.chats?.forEach(chat => { 
        outLine = outLine + Handlebars.compile(hbs_aside_chat_preview) ({
            id: chat.id,
            img: chat.avatar,
            name: chat.title,
            msg: chat.last_message,
            fulltime: chat.created_by,
            time: chat.created_by,
            unreadMsgs: chat.unreaded_count
        })
    });
    return outLine;
}