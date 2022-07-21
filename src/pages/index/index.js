import Cookies from '/src/utils/Cookies'

document.addEventListener("DOMContentLoaded", function(e) {
    const cookie = new Cookies();
    const auth = document.querySelector("#auth-popup");
    const reg = document.querySelector("#reg-popup");

    const profileBtn = document.querySelector(".chat-profile");
    const settingBtn = document.querySelector(".chat-header__setting");
    const authBtn = document.querySelector(".form-auth__btn");
    const regBtn = document.querySelector(".form-reg__btn");
    const closeSetBtn = document.querySelector(".close-settings");
    const changeDataBtn = document.querySelector(".change-data");
    const changePswdBtn = document.querySelector(".change-pswd");

    const authLing = document.querySelector(".form-auth__link");
    const regLing = document.querySelector(".form-reg__link");
    const messageHistory = document.querySelector(".message-history");
    const messagesList = document.querySelector("#messages-list");
    const chatList = document.querySelector(".chat-list");
    const userSettings = document.querySelector("#user-settings");
    const settingForm = document.querySelector(".form-set");
    
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
    });
    settingBtn.addEventListener("click", e => {
        e.preventDefault();
        userSettings.classList.remove("hide");
    });
    closeSetBtn.addEventListener("click", e => {
        e.preventDefault();
        userSettings.classList.add("hide");
    });
    authBtn.addEventListener("click", e => {
        e.preventDefault();
        cookie.setCookie('logined','true');
        checkAccess(userSettings, messagesList, chatList, auth, reg)
    });
    regBtn.addEventListener("click", e => {
        e.preventDefault();
        cookie.setCookie('logined','true');
        checkAccess(userSettings, messagesList, chatList, auth, reg)
    });
    changeDataBtn.addEventListener("click", e => {
        e.preventDefault();
        if ( settingForm.classList.contains("locked") ) {
            settingForm.classList.remove("locked");
            changeDataBtn.textContent = "Сохранить";            
        }else{            
            settingForm.classList.add("locked");
            changeDataBtn.textContent = "Изменить данные";
        }
    })
    changePswdBtn.addEventListener("click", e => {
        e.preventDefault();
        console.log('popup window');
    })
    regLing.addEventListener("click", e => {
        e.preventDefault();
        auth.classList.add("hide");
        reg.classList.remove("hide");
    });
    authLing.addEventListener("click", e => {
        e.preventDefault();
        auth.classList.remove("hide");
        reg.classList.add("hide");
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

