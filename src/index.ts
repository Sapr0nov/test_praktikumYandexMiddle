import { LoginPage, SettingsPage, RegistrationPage, ErrorPage404, ErrorPage500 } from './pages'
import { default as Index } from './pages/chat/chat'
import { ValidateForm } from "./modules/Validate"
import { ApiAction } from "./modules/ApiAction"
import { bus as eventsBus } from "./modules/EventBus"
import { UserFields, user as User } from "./modules/User"
import Router from "./modules/Router";

const api = new ApiAction();
const validator = new ValidateForm();
const urlPath = document.location.pathname;

const router = new Router(window);
if (
  window.location.pathname == "/404/" ||
  window.location.pathname == "/500/"
) {
  document.body.classList.add("e404");
} else {
  document.body.classList.remove("e404");
}

router.use("/messenger", new Index());
router.use("/sign-up", new RegistrationPage());
router.use("/", new LoginPage());
router.use("", new LoginPage());
router.use("/settings", new SettingsPage());
router.use("/500/", new ErrorPage500());
router.use("/404/", new ErrorPage404());

router.start();

eventsBus.register("getUser", (user: UserFields) => {
  if (user.reason) {
    console.log("error: ", user.reason);
    router.go("/");
  } else {
    [
      User.id,
      User.first_name,
      User.second_name,
      User.display_name,
      User.login,
      User.email,
      User.phone,
      User.avatar,
    ] = [
      user.id,
      user.first_name,
      user.second_name,
      user.display_name,
      user.login,
      user.email,
      user.phone,
      user.avatar,
    ];
    User.currentChat = {
      id: null,
      status: null,
      socket: null,
      token: null,
      pingId: null,
    };
    User.setCookie();
    api.chatList();
    // open messenger after registration or authorization
    if (User.id && (urlPath == "/" || urlPath == "" || urlPath == "/sign-up")) {
      api.chatList();
      router.go("/messenger");
    }
  }
});

eventsBus.register("goAuth", () => {
  router.go("/");
});


eventsBus.register("signIn", (req: XMLHttpRequest) => {
  if (req.response == "OK") {
    api.getUser();
    router.go("/messenger");
  } else {
    const err = JSON.parse(req.response as string);
    if (err.reason == "User already in system") {
      api.getUser();
      router.go("/messenger");
    } else {
      alert(err.reason);
    }
  }
});

eventsBus.register("rendered", (newNode: ChildNode) => {
  if (
    !User.id &&
    (window.location.pathname == "/messenger" ||
      window.location.pathname == "/settings")
  ) {
    api.getUser();
  }
  reEvents(newNode);
});

eventsBus.register("loadedChatList", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    User.chats = JSON.parse(req.response);
    if (window.location.pathname == "/messenger") {
      router.go("/messenger");
    }
  }
});

eventsBus.register("updateUserData", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    api.getUser();
    alert("Данные обновлены");
  }
});

eventsBus.register("uploadedAvatar", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    api.getUser();
    if (window.location.pathname == "/settings") {
      router.go("/settings");
    }
  }
});

eventsBus.register("updatedPassword", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    alert("Пароль обновлен");
  } else {
    console.log(req.response);
  }
});

eventsBus.register("createdChat", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    alert("Чат успешно создан!");
    if (window.location.pathname == "/messenger") {
      router.go("/messenger");
    }
  } else {
    console.log(req.response);
  }
});

eventsBus.register("addedUserToChat", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    alert("Пользователь добавлен!");
  } else {
    console.log(req.response);
  }
});

eventsBus.register("deletedUserFromChat", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    alert("Пользователь удален!");
  } else {
    console.log(req.response);
  }
});

eventsBus.register("gotToken", (req: XMLHttpRequest) => {
  if (req.status == 200) {
    User.currentChat.token = JSON.parse(req.response).token;
    api.socketConnect(User.id!, User.currentChat.id!, User.currentChat.token!);
    if (User.currentChat.pingId) {
      clearInterval(User.currentChat.pingId);
    }
    User.currentChat.pingId = setInterval(() => {
      if (User.currentChat.status == "connect") {
        sendPing();
      } else {
        clearInterval(User.currentChat.pingId);
      }
    }, 1000);
  }
});

router.start();

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

  // check forms
  if (form && form.name !== "settings") {
    form.querySelectorAll("input").forEach((el) => {
      if (el.tagName == "INPUT") {
        addMultipleEventListener(el, ["focus", "blur"], (e: Event) => {
          validator.validate(e, [el]);
        });
      }
    });

    form?.addEventListener("submit", (e) => {
      validator.validate(e, Array.from(form?.querySelectorAll("input")!));
    });
  }

  // send forms
  if (form) {
    if (form.name == "reg") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (
          !validator.validate(e, Array.from(form?.querySelectorAll("input")!))
        ) {
          return;
        }

        const formData = new FormData(form as HTMLFormElement);
        const data = api.signUp(
          formData.get("first_name") as string,
          formData.get("second_name") as string,
          formData.get("login") as string,
          formData.get("email") as string,
          formData.get("phone") as string,
          formData.get("password") as string
        );
        data.then((req: XMLHttpRequest) => {
          const JSONreqest: UserFields = JSON.parse(req.response);
          if (JSONreqest.id) {
            router.go("/messenger");
          }
        });
      });
    }

    if (form.name == "auth") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (
          !validator.validate(e, Array.from(form?.querySelectorAll("input")!))
        ) {
          return;
        }

        const formData = new FormData(form as HTMLFormElement);
        api.signIn(
          formData.get("login") as string,
          formData.get("password") as string
        );
      });
    }
  }
}

function addMultipleEventListener(
  element: Element,
  events: Array<any>,
  handler: any
) {
  events.forEach((el) => element.addEventListener(el, handler));
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
