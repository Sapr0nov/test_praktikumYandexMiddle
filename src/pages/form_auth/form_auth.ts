import Handlebars from "handlebars";
import hbs_auth from "./form_auth.hbs";
import { Block } from "../../modules/Block";

export class AuthForm extends Block {
  render() {
    let outLine: string = "";
    outLine = Handlebars.compile(hbs_auth)({
      enter_text: "Вход",
      login_text: "Логин",
      password_text: "Пароль",
      btn_name: "Авторизоваться",
      link_text: "Зарегистрироваться",
    });

    return outLine;
  }
}
