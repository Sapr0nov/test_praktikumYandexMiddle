interface jsonChat {
    chats:[{
    img: string,
    name: string,
    message: string,
    fullname: string,
    time: string,
    fulltime: string,
    unreadMsgs: number
    }]
}

import Handlebars from "handlebars";
import hbs_aside_chat_preview from "./aside_chat_preview.hbs";
import "./aside_chat_preview.css";
import { data } from "../../../static/data.json";

export function renderAsideChatPreview() {
    let outLine:string = '';
    let dataJson:jsonChat = data;

    dataJson.chats.forEach(chat => { 
        outLine = outLine + Handlebars.compile(hbs_aside_chat_preview) ({
            img: chat.img,
            name: chat.name,
            msg: chat.message,
            fulltime: chat.fulltime,
            time: chat.time,
            unreadMsgs: chat.unreadMsgs
        })
    });
    return outLine;
}