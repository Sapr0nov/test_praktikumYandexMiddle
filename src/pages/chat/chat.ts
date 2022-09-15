import hbs_index from "./chat.hbs";
import "./chat.css";
import Block from "../../modules/Block";
import renderSideBarPreview from "../../components/side_bar/side_bar";
import renderChatPreview from "../../components/chat/chat";
import { user as User } from "../../modules/User"
import Router from "../../modules/Router"
import { ApiAction } from "../../modules/ApiAction"

export default class Chat extends Block {
  constructor() {
    super();
    this._name = "Chat";
      this.eventBus.register("flow:render:" + this._name, () => {
        this.addEvents();   
      });
  
      const router = new Router(window);
      const api = new ApiAction();
      const req = api.getUser();
      
      req.then( data => {
        [User.id, User.login, User.display_name, User.first_name, User.second_name, User.email, User.phone, User.avatar] =
        [data.id, data.login, data.display_name, data.first_name, data.second_name, data.email, data.phone, data.avatar];
        router._onRoute(window.location.pathname);
      });

      const req2 = api.getUser();
      req2.then ( data => {
        console.log(data);
      })
    }
  


  render() {
    let outLine: string = "";
    outLine = hbs_index({
      side_bar: renderSideBarPreview(),
      main: renderChatPreview(),
    });

    return outLine;
  }


  addEvents() {
    const router = new Router(window);
    const api = new ApiAction();

    const settingBtn = <Element>( document.querySelector(".chat-header__setting") );
    const profileBtn = <Element>document.querySelector(".change-data");
    const addChatBtn = <Element>document.querySelector(".chat-add");
    const chatPreview: Array<HTMLElement> = Array.from(document.querySelectorAll(".chat-preview"));
    const sendMsgBtn = <Element>(document.querySelector(".message-input__send-btn"));
    profileBtn &&
    profileBtn.addEventListener("click", () => {
      router.go("/settings");
    });
    settingBtn &&
    settingBtn.addEventListener("click", () => {
      router.go("/settings");
    });
    
    addChatBtn && chatPreview && sendMsgBtn;

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
        sendPing();
      });
  }
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