import hbs_index from "./chat.hbs";
import "./chat.css";
<<<<<<< HEAD
import Block from "Modules/Block";
import renderSideBarPreview from "Components/side_bar/side_bar";
import renderChatPreview from "Components/chat/chat";
import { user as User } from "Modules/User";
import Router from "Modules/Router";
import { ApiAction } from "Modules/ApiAction";

export default class Chat extends Block {
  constructor() {
    super();
    this._name = "Chat";
    this.eventBus.register("flow:render:" + this._name, () => {
      this.addEvents();
    });

    const router = new Router(window);
    const api = new ApiAction();
    const req = api.chatList();

    req.then((data) => {
      try {
        User.chats = JSON.parse(data.response);
      } catch (e) {
        console.warn(e);
      }
      router._onRoute(window.location.pathname);
    });
  }

=======
import Block from "../../modules/Block";
import renderSideBarPreview from "../../components/side_bar/side_bar";
import renderChatPreview from "../../components/chat/chat";

export default class Chat extends Block {
>>>>>>> main
  render() {
    let outLine: string = "";
    outLine = hbs_index({
      side_bar: renderSideBarPreview(),
      main: renderChatPreview(),
    });

    return outLine;
  }
<<<<<<< HEAD

  addEvents() {
    const router = new Router(window);
    const api = new ApiAction();
    const settingBtn = <Element>document.querySelector(".chat-header__setting");
    const profileBtn = <Element>document.querySelector(".chat-profile");
    const addChatBtn = <Element>document.querySelector(".chat-add");
    const chatPreview: Array<HTMLElement> = Array.from(
      document.querySelectorAll(".chat-preview")
    );
    const sendMsgBtn = <Element>(
      document.querySelector(".message-input__send-btn")
    );

    profileBtn &&
      profileBtn.addEventListener("click", () => {
        router.go("/settings");
      });

    settingBtn &&
      settingBtn.addEventListener("click", () => {
        router.go("/settings");
      });

    addChatBtn &&
      addChatBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const chatName = prompt("Название добавляемого чата:");
        const req = api.createChat(chatName!);
        req.then((data) => {
          if (data.status === 200) {
            router._onRoute(window.location.pathname);
          }
        });
      });

    chatPreview &&
      chatPreview.length &&
      chatPreview.forEach((element) => {
        element.addEventListener("click", () => {
          User.currentChat.id = parseInt(element.dataset.id!);
          const req = api.getTokenChat(parseInt(element.dataset.id!));
          req.then((data) => {
            if (data.status === 200) {
              try {
                User.currentChat.token = JSON.parse(data.response).token;
              } catch (e) {
                console.warn(e);
              }

              this.connectToNewChat();
            }
          });
        });
        this.addSubMenu(element);
      });

    sendMsgBtn &&
      sendMsgBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const input = document.querySelector(
          ".message-input input"
        ) as HTMLInputElement;
        const msg: string = input.value;
        input.value = "";
        this.sendMessage(msg);
      });
  }

  sendPing() {
    User.currentChat.socket?.send(
      JSON.stringify({
        type: "ping",
      })
    );
  }

  sendMessage(message: string) {
    if (User.currentChat.socket?.readyState === 1) {
      User.currentChat.socket?.send(
        JSON.stringify({
          content: message,
          type: "message",
        })
      );
    } else {
      setTimeout(function () {
        this.sendMessage(message);
      }, 500);
    }
  }

  addSubMenu(element: HTMLElement) {
    const api = new ApiAction();
    element.addEventListener("contextmenu", (event: MouseEvent) => {
      event.preventDefault();
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
          const id = parseInt(prompt("Введите id ДОБАВЛЯЕМОГО пользователя:")!);
          api.addUsersToChat([id], chatId);
        });
        subBtn2.addEventListener("click", (e) => {
          e.preventDefault();
          submenu.classList.add("hide");
          const id = parseInt(prompt("Введите id УДАЛЯЕМОГО пользователя:")!);
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
        event.pageX.toString() + "px",
        event.pageY.toString() + "px",
      ];
      submenu.classList.remove("hide");
    });
  }

  connectToNewChat() {
    const api = new ApiAction();
    if (User.currentChat.pingId) {
      clearInterval(User.currentChat.pingId);
    }
    api.socketConnect(User.id!, User.currentChat.id!, User.currentChat.token!);
    User.currentChat.pingId = setInterval(() => {
      this.sendPing();
    }, 10000);

    setTimeout(function () {
      User.currentChat.socket?.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    }, 500);

    User.currentChat.socket?.addEventListener("message", (event) => {
      const router = new Router(window);
      try {
        const data = JSON.parse(event.data);
        if (data.type && data.type === "pong") {
          return;
        }
        if (data.type && data.type === "message") {
          User.messages?.push(data);
          router.refresh();
          return;
        }
        if (Array.isArray(data)) {
          User.messages = [...data].reverse();
          router.refresh();
        }
      } catch (e) {
        console.warn(e);
      }
    });
  }
=======
>>>>>>> main
}
