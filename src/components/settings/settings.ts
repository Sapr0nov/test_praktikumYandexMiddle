import Handlebars from "handlebars";
import hbs_settings from "./settings.hbs";
import "./settings.css";
import { Block } from "../../modules/Block";
import image from "../../../static/placeholder.png";
import { user as User } from "../../modules/User";

export class Settings extends Block {
    render() {
        console.log('USER render ', User);
        const test:string = User.first_name as string;
        let outLine:string = '';
        outLine = Handlebars.compile(hbs_settings) ({
            linkback: "/messenger",
            name: test,
            login: User.login,
            email: User.email,
            surname: User.second_name,
            phone: User.phone,
            avatar: image
        })
        console.log(outLine);
        return outLine;    
    }
}
