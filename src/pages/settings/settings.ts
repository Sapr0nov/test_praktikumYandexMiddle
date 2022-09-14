import hbs_settings from "./settings.hbs";
import "./settings.css";
import image from "../../../static/img/placeholder.png";
import Block from "../../modules/Block";
import { user as User } from "../../modules/User";

export default class Settings extends Block {
  render() {
    let image_link: string = image;
    if (User.avatar) {
      image_link = "https://ya-praktikum.tech/api/v2/resources" + User.avatar;
    }
    let outLine: string = "";
    outLine = hbs_settings({
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
