import Handlebars from "handlebars";
import hbs_settings from "./settings.hbs";
import "./settings.css";
import { Block } from "../../modules/Block";
import image from "../../../static/placeholder.png";

export class Settings extends Block {
    render() {
        let outLine:string = '';
        outLine = Handlebars.compile(hbs_settings) ({
            linkback: "/",
            name: "UserName",
            login: "user23",
            email: "user23@smale.ru",
            surname: "Familia",
            phone: "+79031241313",
            avatar: image
        })
    
        return outLine;    
    }
}
