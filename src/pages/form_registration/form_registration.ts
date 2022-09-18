import hbs_reg from "./form_registration.hbs";
<<<<<<< HEAD
import { ValidateForm } from "Modules/Validate";
import Block from "Modules/Block";
import "Static/form.css";
import { UserFields } from "Modules/User";
import Router from "Modules/Router";
import { ApiAction } from "Modules/ApiAction";

export default class RegForm extends Block {
  constructor() {
    super();
    this._name = "RegForm";
    this.eventBus.register("flow:render:" + this._name, () => {
      this.addEvents();
    });
  }

=======
import Block from "../../modules/Block";
import "../../../static/form.css"

export default class RegForm extends Block {
>>>>>>> main
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
<<<<<<< HEAD

  addEvents() {
    const validator = new ValidateForm();
    const api = new ApiAction();
    const form = document.forms[0];
    const login = form.elements.namedItem("login") as HTMLFormElement;
    const password = form.elements.namedItem("password") as HTMLFormElement;
    const first_name = form.elements.namedItem("first_name") as HTMLFormElement;
    const second_name = form.elements.namedItem(
      "second_name"
    ) as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLFormElement;
    const phone = form.elements.namedItem("phone") as HTMLFormElement;

    const form_error = form?.querySelector(".form-error");

    this.addMultipleEventListener(login, ["focus", "blur"], () => {
      let error = validator.validator(
        login,
        [validator.isLogin, validator.isValidLenght],
        "Логин не корректен: должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква",
        3,
        20
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(password, ["focus", "blur"], () => {
      let error = validator.validator(
        password,
        [validator.isPassword, validator.isValidLenght],
        "Пароль не корректен: Должна быть хотя бы одна заглавная буква",
        8,
        40
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(first_name, ["focus", "blur"], () => {
      let error = validator.validator(
        first_name,
        [validator.isName],
        "Имя не корректено: должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - ",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(second_name, ["focus", "blur"], () => {
      let error = validator.validator(
        second_name,
        [validator.isName],
        "Фамилия не корректена: должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - ",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(email, ["focus", "blur"], () => {
      let error = validator.validator(
        email,
        [validator.isEmail],
        "Email не корректен: Должна быть @ точка после неё и латинские буквы",
        null,
        null
      );
      form_error!.textContent = error;
    });

    this.addMultipleEventListener(phone, ["focus", "blur"], () => {
      let error = validator.validator(
        phone,
        [validator.isPhone, validator.isValidLenght],
        "Телефон не корректен: может начинаться с плюса, состоит только из цифр",
        10,
        15
      );
      form_error!.textContent = error;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const request = api.signUp(
        formData.get("first_name") as string,
        formData.get("second_name") as string,
        formData.get("login") as string,
        formData.get("email") as string,
        formData.get("phone") as string,
        formData.get("password") as string
      );
      request.then((data: XMLHttpRequest) => {
        let JSONreqest: UserFields;
        try {
          JSONreqest = JSON.parse(data.response);
          if (JSONreqest.id) {
            const router = new Router(window);
            router.go("/messenger");
          }
        } catch (e) {
          console.warn(e);
        }
      });
    });
  }

  addMultipleEventListener(element: Element, events: Array<any>, handler: any) {
    events.forEach((el) => element.addEventListener(el, handler));
  }
=======
>>>>>>> main
}
