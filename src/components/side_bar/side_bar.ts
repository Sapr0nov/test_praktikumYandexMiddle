import Handlebars from "handlebars";
import hbs_side_bar from "./side_bar.hbs";
import { renderAsideChatPreview } from "../aside_chat_preview/aside_chat_preview.ts";
import "./side_bar.css";
import { Block } from "../../modules/Block";

export class SideBar extends Block {
    render() {
        let outLine:string = '';
        outLine = Handlebars.compile(hbs_side_bar) ({
            chats: renderAsideChatPreview(),
            profileText:'профиль >',
            newChatText:'новый чат'
        })
    
        return outLine;    
    }
}
