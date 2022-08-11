import Handlebars = require('handlebars');
import hbs_reg from "./form_registration.hbs";
import { Block } from "../../modules/Block";

export class RegForm extends Block {
    render() {
        let outLine:string = '';
        outLine = Handlebars.compile(hbs_reg) ({
            form_title: "Регистрация",
            email_text: "Почта",
            login_text: "Логин",
            name_text: "Имя",
            sur_name: "Фамилия",
            phone_text: "Телефон",
            password_text: "Пароль",
            password_repeat_text: "Пароль (ещё раз)",
            btn_name: "Зарегистрироваться",
            link_text: "Войти"
        })
    
        return outLine;
    }
}