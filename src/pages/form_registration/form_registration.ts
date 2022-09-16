import hbs_reg from "./form_registration.hbs";
import { ValidateForm } from "../../modules/Validate";
import Block from "../../modules/Block";
import "../../../static/form.css";
import { UserFields } from "../../modules/User";
import Router from "../../modules/Router";
import { ApiAction } from "../../modules/ApiAction";

export default class RegForm extends Block {
  constructor() {
    super();
    this._name = "RegForm";
    this.eventBus.register("flow:render:" + this._name, () => {
      this.addEvents();
    });
  }

  render() {
    let outLine: string = "";
    outLine = hbs_reg({
      form_title: "Регистрация",
      email_text: "Почта",
      login_text: "Логин",
      name_text: "Имя",
      sur_name: "Фамилия",
      phone_text: "Телефон",
      password_text: "Пароль",
      password_repeat_text: "Пароль (ещё раз)",
      btn_name: "Зарегистрироваться",
      link_text: "Войти",
    });

    return outLine;
  }

  addEvents() {
    const validator = new ValidateForm();
    const api = new ApiAction();

    const form = document.querySelector("#reg");
    const login = form!.querySelector("input[name=login]");
    const password = form!.querySelector("input[name=password]");
    const first_name = form!.querySelector("input[name=first_name]");
    const second_name = form!.querySelector("input[name=second_name]");
    const email = form!.querySelector("input[name=email]");
    const phone = form!.querySelector("input[name=phone]");
    const form_error = form?.querySelector(".form-error");

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

    this.addMultipleEventListener(first_name!, ["focus", "blur"], () => {
      let error = validator.validator(
        first_name,
        [validator.isName],
        "Имя не корректено: должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - ",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(second_name!, ["focus", "blur"], () => {
      let error = validator.validator(
        second_name,
        [validator.isName],
        "Фамилия не корректена: должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - ",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(email!, ["focus", "blur"], () => {
      let error = validator.validator(
        email,
        [validator.isEmail],
        "Email не корректен: Должна быть @ точка после неё и латинские буквы",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(phone!, ["focus", "blur"], () => {
      let error = validator.validator(
        phone,
        [validator.isPhone, validator.isValidLenght],
        "Телефон не корректен: может начинаться с плюса, состоит только из цифр",
        10,
        15
      );
      form_error!.textContent = error;
    });

    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      const request = api.signUp(
        formData.get("first_name") as string,
        formData.get("second_name") as string,
        formData.get("login") as string,
        formData.get("email") as string,
        formData.get("phone") as string,
        formData.get("password") as string
      );
      request.then((data: XMLHttpRequest) => {
        const JSONreqest: UserFields = JSON.parse(data.response);
        if (JSONreqest.id) {
          const router = new Router(window);
          router.go("/messenger");
        } else {
          console.log("api err:", data.response);
        }
      });
    });
  }

  addMultipleEventListener(element: Element, events: Array<any>, handler: any) {
    events.forEach((el) => element.addEventListener(el, handler));
  }
}
