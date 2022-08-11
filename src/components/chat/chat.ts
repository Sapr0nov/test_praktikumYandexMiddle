import Handlebars from "handlebars";
import hbs_chat from "./chat.hbs";
import "./chat.css";
import { Block } from "../../modules/Block";

export class Chat extends Block {
    render() {
        let outLine:string = '';
            
        outLine = Handlebars.compile(hbs_chat) ({
            class: "self",
            text: "a very long message Lorum... Test wrap message into box",
            date: "10.10.2022",
            photo: "IMAGE",
            name: "Ivan Ivanovich"
        })
    
        return outLine;
    }
}
