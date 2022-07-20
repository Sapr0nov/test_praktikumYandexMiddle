document.addEventListener("DOMContentLoaded", function(event) {
    const auth = document.querySelector("#authPopup");
    const reg = document.querySelector("#regPopup");
    const profileBtn = document.querySelector(".chat-profile");
    const settingBtn = document.querySelector(".chat-header__setting");
    const chatList = document.querySelector(".message-history");

    auth.classList.add("hide");
    reg.classList.add("hide");
    
    document.querySelectorAll(".message").forEach( (el, index) => {
        if (index % 3) { el.classList.remove("self"); }
    })
    let chatListMemo = JSON.stringify(chatList.innerHTML);
    chatList.innerHTML = "<p style=\"margin: auto; font-family: Arial;\">выберите чат для начала диалога<p>";

    document.querySelectorAll(".chat-preview").forEach(el => {
        el.addEventListener("click", (e) => {
            el.querySelector(".chat-preview__mark").classList.add("hide");
            el.querySelector(".chat-preview__mark").innerHTML = '';
            chatList.innerHTML = JSON.parse(chatListMemo);
        })
    })
    profileBtn.addEventListener("click", (e)=> {
        console.log('Open profile');
    });



});