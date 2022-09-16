import hbs_auth from "./form_auth.hbs";
import { ValidateForm } from "../../modules/Validate";
import Block from "../../modules/Block";
import "../../../static/form.css";
import { ApiAction } from "../../modules/ApiAction";
import Router from "../../modules/Router";

export default class AuthForm extends Block {
  constructor() {
    super();
    this._name = "AuthForm";
    this.eventBus.register("flow:render:" + this._name, () => {
      this.addEvents();
    });
  }

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

  addMultipleEventListener(element: Element, events: Array<any>, handler: any) {
    events.forEach((el) => element.addEventListener(el, handler));
  }

  addEvents() {
    const validator = new ValidateForm();
    const api = new ApiAction();
    const router = new Router(window);

    const form = document.querySelector("#auth");
    const login = form!.querySelector("input[name=login]");
    const password = form!.querySelector("input[name=password]");
    const form_error = form!.querySelector(".form-error");

    this.addMultipleEventListener(login!, ["focus", "blur"], () => {
      let error = validator.validator(
        login,
        [validator.isLogin, validator.isValidLenght],
        "Логин не корректен: должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква",
        3,
        20
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(password!, ["focus", "blur"], () => {
      let error = validator.validator(
        password,
        [validator.isPassword, validator.isValidLenght],
        "Пароль не корректен: Должна быть хотя бы одна заглавная буква",
        8,
        40
      );
      form_error!.textContent = error;
    });

    form!.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form as HTMLFormElement);
      const request = api.signIn(
        formData.get("login") as string,
        formData.get("password") as string
      );
      request.then((data) => {
        if (data.status !== 200) {
          console.log("api err:", data.response);
          if (JSON.parse(data.response).reason == "User already in system") {
            router.go("/messenger");
          }
        }
      });
    });
  }
}
