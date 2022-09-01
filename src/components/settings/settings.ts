import Handlebars from "handlebars";
import hbs_settings from "./settings.hbs";
import "./settings.css";
import { Block } from "../../modules/Block";
import image from "../../../static/placeholder.png";
import { user as User } from "../../modules/User";

export class Settings extends Block {
  render() {
    let image_link: string = image;
    if (User.avatar) {
      image_link = "https://ya-praktikum.tech/api/v2/resources" + User.avatar;
    }
    let outLine: string = "";
    outLine = Handlebars.compile(hbs_settings)({
      linkback: "/messenger",
      name: User.first_name,
      login: User.login,
      email: User.email,
      surname: User.second_name,
      phone: User.phone,
      avatar: image_link,
    });
    return outLine;
  }
}
