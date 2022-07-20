import Cookies from '/src/utils/Cookies'

document.addEventListener("DOMContentLoaded", function(e) {
    const cookie = new Cookies();
    const auth = document.querySelector("#auth-popup");
    const reg = document.querySelector("#reg-popup");
    const profileBtn = document.querySelector(".chat-profile");
    const settingBtn = document.querySelector(".chat-header__setting");
    const authBtn = document.querySelector(".form-auth__btn");
    const authLing = document.querySelector(".form-auth__link");
    const regBtn = document.querySelector(".form-reg__btn");
    const regLing = document.querySelector(".form-reg__link");
    const messageHistory = document.querySelector(".message-history");
    const messagesList = document.querySelector("#messages-list");
    const chatList = document.querySelector(".chat-list");
    const userSettings = document.querySelector("#user-settings");
    
    document.querySelectorAll(".message").forEach( (el, index) => {
        if (index % 3) { el.classList.remove("self"); }
    })
    let chatListMemo = JSON.stringify(messageHistory.innerHTML);
    messageHistory.innerHTML = "<p style=\"margin: auto; font-family: Arial;\">выберите чат для начала диалога<p>";

    document.querySelectorAll(".chat-preview").forEach(el => {
        el.addEventListener("click", (e) => {
            el.querySelector(".chat-preview__mark").classList.add("hide");
            el.querySelector(".chat-preview__mark").innerHTML = '';
            messageHistory.innerHTML = JSON.parse(chatListMemo);
        })
    })


    profileBtn.addEventListener("click", e => {
        e.preventDefault();
        userSettings.classList.remove("hide");
        console.log('Open profile');
    });
    settingBtn.addEventListener("click", e => {
        e.preventDefault();
        userSettings.classList.remove("hide");
        console.log('Open settings');
    });
    authBtn.addEventListener("click", e => {
        e.preventDefault();
        cookie.setCookie('logined','true');
        checkAccess(userSettings, messagesList, chatList, auth, reg)
        console.log('auth checking');
    });
    regBtn.addEventListener("click", e => {
        e.preventDefault();
        cookie.setCookie('logined','true');
        checkAccess(userSettings, messagesList, chatList, auth, reg)
        console.log('reg checking');
    });
    regLing.addEventListener("click", e => {
        e.preventDefault();
        auth.classList.add("hide");
        reg.classList.remove("hide");
        console.log('reg show');
    });
    authLing.addEventListener("click", e => {
        e.preventDefault();
        auth.classList.remove("hide");
        reg.classList.add("hide");
        console.log('auth show');
    });

    checkAccess(userSettings, messagesList, chatList, auth, reg);
});



function checkAccess(userSettings, messagesList, chatList, auth, reg) {
    const cookie = new Cookies();
    userSettings.classList.add("hide");
    if (cookie.getCookie('logined')) {
        messagesList.classList.remove("hide");
        chatList.classList.remove("hide");    
        auth.classList.add("hide");
        reg.classList.add("hide");
    }else{
        messagesList.classList.add("hide");
        chatList.classList.add("hide");
        auth.classList.add("hide");
        reg.classList.remove("hide");
    }
}

