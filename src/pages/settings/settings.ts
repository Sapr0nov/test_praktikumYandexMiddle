import hbs_settings from "./settings.hbs";
import "./settings.css";
import image from "Static/img/placeholder.png";
import Block from "Modules/Block";
import { UserFields, user as User } from "Modules/User";
import Router from "Modules/Router";
import { ApiAction } from "Modules/ApiAction";
export default class Settings extends Block {
  constructor() {
    super();
    this._name = "Settings";
    this.eventBus.register("flow:render:" + this._name, () => {
      this.addEvents();
    });

    const router = new Router(window);
    const api = new ApiAction();
    const req = api.getUser();

    req.then((data) => {
      [
        User.id,
        User.login,
        User.display_name,
        User.first_name,
        User.second_name,
        User.email,
        User.phone,
        User.avatar,
      ] = [
        data.id,
        data.login,
        data.display_name,
        data.first_name,
        data.second_name,
        data.email,
        data.phone,
        data.avatar,
      ];
      router._onRoute(window.location.pathname);
    });
  }

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

  addEvents() {
    const api = new ApiAction();

    const changeBtn = <Element>document.querySelector(".change-data");
    const changeAvatar = <Element>document.querySelector(".set-avatar img");
    const changePassword = <Element>document.querySelector(".change-pswd");
    const router = new Router(window);

    changeBtn &&
      changeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (changeBtn.parentElement?.classList.contains("locked")) {
          changeBtn.parentElement?.classList.remove("locked");
          changeBtn.textContent = "Сохранить данные";
        } else {
          const firstName: HTMLInputElement =
            document.querySelector("#first_name")!;
          const secondName: HTMLInputElement =
            document.querySelector("#second_name")!;
          const login: HTMLInputElement = document.querySelector("#login")!;
          const email: HTMLInputElement = document.querySelector("#email")!;
          const phone: HTMLInputElement = document.querySelector("#phone")!;
          const newData = {
            first_name: firstName.value,
            second_name: secondName.value,
            display_name: "",
            login: login.value,
            email: email.value,
            phone: phone.value,
          } as UserFields;
          const req = api.updateUserInfo(newData);
          changeBtn.parentElement?.classList.add("locked");
          changeBtn.textContent = "Изменить данные";
          req.then((data) => {
            if (data.status === 200) {
              alert("Данные обновлен");
            }
          });
        }
      });

    changeAvatar &&
      changeAvatar.addEventListener("click", (e) => {
        e.preventDefault();
        let uploadFile = document.querySelector("#avatar") as HTMLInputElement;
        uploadFile.click();
        uploadFile.onchange = () => {
          const file = uploadFile.files![0];
          if (!!file) {
            const formData = new FormData();
            formData.append("avatar", file, file.name);
            const req = api.loadAvatar(formData);
            req.then((data) => {
              if (data.status === 200) {
                console.log("avatar loaded");
                router._onRoute(window.location.pathname);
              }
            });
          }
        };
      });
    changePassword &&
      changePassword.addEventListener("click", (e) => {
        e.preventDefault();
        const oldPswd = prompt("Введите ТЕКУЩИЙ пароль:");
        const newPswd = prompt("Задайте НОВЫЙ пароль:");
        const req = api.updatePassword(newPswd!, oldPswd!);
        req.then((data) => {
          if (data.status === 200) {
            alert("Пароль обновлен");
          }
        });
      });
  }
}
