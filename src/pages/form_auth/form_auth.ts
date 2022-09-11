import hbs_auth from "./form_auth.hbs";
import Block from "../../modules/Block";

export default class AuthForm extends Block {

  render() {
    let outLine: string = "";
    outLine = hbs_auth({
      enter_text: "Вход",
      login_text: "Логин",
      password_text: "Пароль",
      btn_name: "Авторизоваться",
      link_text: "Зарегистрироваться",
    });

    return outLine;
  }
}
