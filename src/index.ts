import {
  LoginPage,
  SettingsPage,
  RegistrationPage,
  ErrorPage404,
  ErrorPage500,
} from "./pages";
import { default as Index } from "./pages/chat/chat";
import Router from "./modules/Router";

const router = new Router(window);
if (window.location.pathname == "/404/") {
  document.body.classList.add("e404");
}
if (window.location.pathname == "/500/") {
  document.body.classList.add("e500");
}

router.use("/messenger", new Index());
router.use("/sign-up", new RegistrationPage());
router.use("/", new LoginPage());
router.use("", new LoginPage());
router.use("/settings", new SettingsPage());
router.use("/500/", new ErrorPage500());
router.use("/404/", new ErrorPage404());

router.start();

/*

// Events
function reEvents(newNode: ChildNode) {
  let form: HTMLFormElement | null | undefined =
    newNode?.parentElement?.querySelector("form");

  if (newNode && newNode.parentNode) {
    const profileBtn = <Element>(
      newNode.parentNode.querySelector(".chat-profile")
    );
    const settingBtn = <Element>(
      newNode.parentNode.querySelector(".chat-header__setting")
    );
    const changeBtn = <Element>newNode.parentNode.querySelector(".change-data");
    const changeAvatar = <Element>(
      newNode.parentNode.querySelector(".set-avatar img")
    );
    const changePassword = <Element>(
      newNode.parentNode.querySelector(".change-pswd")
    );
    const addChatBtn = <Element>newNode.parentNode.querySelector(".chat-add");
    const chatPreview: Array<HTMLElement> = Array.from(
      newNode.parentNode.querySelectorAll(".chat-preview")
    );
    const sendMsgBtn = <Element>(
      newNode.parentNode.querySelector(".message-input__send-btn")
    );

    profileBtn &&
      profileBtn.addEventListener("click", () => {
        router.go("/settings");
      });
    settingBtn &&
      settingBtn.addEventListener("click", () => {
        router.go("/settings");
      });
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
          api.updateUserInfo(newData);
          changeBtn.parentElement?.classList.add("locked");
          changeBtn.textContent = "Изменить данные";
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
            api.loadAvatar(formData);
          }
        };
      });
    changePassword &&
      changePassword.addEventListener("click", (e) => {
        e.preventDefault();
        const oldPswd = prompt("Введите ТЕКУЩИЙ пароль:");
        const newPswd = prompt("Задайте НОВЫЙ пароль:");
        api.updatePassword(newPswd!, oldPswd!);
      });
    addChatBtn &&
      addChatBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const chatName = prompt("Название добавляемого чата:");
        api.createChat(chatName!);
      });
    chatPreview &&
      chatPreview.length &&
      chatPreview.forEach((element) => {
        element.addEventListener("click", () => {
          User.currentChat.id = parseInt(element.dataset.id!);
          api.getTokenChat(parseInt(element.dataset.id!));
        });

        element.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          const chatId = parseInt(element.dataset.id!);
          let submenu: HTMLElement = document.querySelector(".submenu")!;
          if (!submenu) {
            submenu = document.createElement("div");
            submenu.classList.add("submenu");
            const [subBtn1, subBtn2, subBtn3] = [
              document.createElement("div"),
              document.createElement("div"),
              document.createElement("div"),
            ];
            subBtn1.textContent = "добавить пользователя";
            subBtn2.textContent = "удалить пользователя";
            subBtn3.textContent = "удалить чат";
            [subBtn1, subBtn2, subBtn3].forEach((btn) => {
              btn.classList.add("submenu__btn");
              submenu.appendChild(btn);
            });
            document.body.appendChild(submenu);

            subBtn1.addEventListener("click", (e) => {
              e.preventDefault();
              submenu.classList.add("hide");
              const id = parseInt(
                prompt("Введите id ДОБАВЛЯЕМОГО пользователя:")!
              );
              api.addUsersToChat([id], chatId);
            });

            subBtn2.addEventListener("click", (e) => {
              e.preventDefault();
              submenu.classList.add("hide");
              const id = parseInt(
                prompt("Введите id УДАЛЯЕМОГО пользователя:")!
              );
              api.deleteUsersFromChat([id], chatId);
            });

            subBtn3.addEventListener("click", (e) => {
              e.preventDefault();
              submenu.classList.add("hide");
              const isDelete = confirm("Точно УДАЛИТЬ этот чат?");
              if (isDelete) {
                api.deleteChat(chatId);
              }
            });
          }
          [submenu.style.left, submenu.style.top] = [
            e.pageX.toString() + "px",
            e.pageY.toString() + "px",
          ];
          submenu.classList.remove("hide");
        });
      });
    sendMsgBtn &&
      sendMsgBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const input = document.querySelector(
          ".message-input input"
        ) as HTMLInputElement;
        const msg: string = input.value;
        input.value = "";
        sendMessage(msg);
      });
  }
  
  function sendPing() {
    User.currentChat.socket?.send(
      JSON.stringify({
        type: "ping",
      })
    );
  }
  
  function sendMessage(message: string) {
    User.currentChat.socket?.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }
*/
