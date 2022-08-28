import { Error404 } from './pages/404/404.ts';
import { Error500 } from './pages/500/500.ts';
import { Index } from './pages/index/index.ts';
import { AuthForm } from './pages/form_auth/form_auth.ts';
import { RegForm } from './pages/form_registration/form_registration.ts';
import { Settings } from './components/settings/settings.ts';
import { Block } from './modules/Block';
import { ValidateForm } from './modules/Validate';
import { ApiAction } from './modules/ApiAction';
import './pages/index/index.css';
import './modules/form.css';
import { bus as eventsBus } from './modules/EventBus';
import { UserFields } from './modules/User';
import {user as User } from './modules/User';

const api = new ApiAction();
const validator = new ValidateForm();
const urlPath = document.location.pathname;
let currentPage:Block;


switch (urlPath) {
    case '/messenger' :
    case '/messenger/' :
        currentPage = new Index();
        api.getUser();
        break;
    case '/' :
    case '' :
        currentPage = new AuthForm();
        reRender(currentPage);
        break;
        case '/sign-up' :
        case '/sign-up/' :
        currentPage = new RegForm();
        reRender(currentPage);
        break;
        case '/settings/' :
        case '/settings' :
        currentPage = new Settings(); 
        api.getUser();
        break;
    case '/500/' : 
        currentPage = new Error500();
        reRender(currentPage);
        break;
    default : 
        currentPage = new Error404();
        reRender(currentPage);
}


function reRender(currentPage:Block) {
    const newNode = new DOMParser().parseFromString(currentPage.render(), "text/html").body.firstChild;
    const root = document.getElementById("root");
    if (root && newNode) {
        root.textContent = '';
        root.appendChild(newNode);
    }
    reEvents(newNode!);
}


eventsBus.register('getUser', (user:UserFields)=>{
    if (user.reason) {
        console.log('error: ', user.reason);
        api.logout();
    }else{
        [User.first_name, User.second_name, User.display_name, User.login, User.email, User.phone, User.avatar] = 
        [user.first_name, user.second_name, user.display_name, user.login, user.email, user.phone, user.avatar];
        reRender(currentPage);

        api.chatList();
        // open messanger after registration or authorization
        if (urlPath == '/' || urlPath == '' || urlPath == '/sign-up' ) {
            document.location.pathname = '/messenger';
        }
    }
});

eventsBus.register('goAuth', ()=>{
    if (document.location.pathname !== '/') {
        document.location.pathname = '/';
    }
})

eventsBus.register('signIn', (req:XMLHttpRequest)=>{
    if (req.response == 'OK') {
        api.getUser();
        document.location.pathname = '/messenger';
    }else{
        const err = JSON.parse(req.response as string);
        if (err.reason == 'User already in system') {
            api.getUser();
            document.location.pathname = '/messenger';
        }else{
            alert(err.reason);
        }
    }
})

eventsBus.register('loadedChatList', (req:XMLHttpRequest)=> {
    console.log('loadedChatList?', req);
})

eventsBus.register('updateUserData', (req:XMLHttpRequest)=> {
    if (req.status == 200) {
        alert('Данные обновлены');
    }
})

eventsBus.register('uploadedAvatar', (req:XMLHttpRequest)=> {
    if (req.status == 200) {
        api.getUser();
        reRender(currentPage);
    }
})


// Events
function reEvents(newNode:ChildNode) {
    let form:HTMLFormElement|null|undefined = newNode?.parentElement?.querySelector('form');
    if (newNode && newNode.parentNode) {
        const profileBtn = <Element>newNode.parentNode.querySelector('.chat-profile');
        const settingBtn = <Element>newNode.parentNode.querySelector('.chat-header__setting');
        const changeBtn = <Element>newNode.parentNode.querySelector('.change-data');
        const changeAvatar = <Element>newNode.parentNode.querySelector('.set-avatar img');
        form = <HTMLFormElement>newNode.parentNode.querySelector('form');
        
        profileBtn && profileBtn.addEventListener("click", () => { document.location.href = "/settings/"; });
        settingBtn && settingBtn.addEventListener("click", () => { document.location.href = "/settings/"; });
        changeBtn && changeBtn.addEventListener("click", e => {
            e.preventDefault();
            if (changeBtn.parentElement?.classList.contains("locked")) {
                changeBtn.parentElement?.classList.remove("locked");
                changeBtn.textContent = "Сохранить данные";
            }else{
                const firstName:HTMLInputElement = document.querySelector('#first_name')!;
                const secondName:HTMLInputElement = document.querySelector('#second_name')!;
                const login:HTMLInputElement = document.querySelector('#login')!;
                const email:HTMLInputElement = document.querySelector('#email')!;
                const phone:HTMLInputElement = document.querySelector('#phone')!;
                const newData =
                {
                    "first_name": firstName.value,
                    "second_name": secondName.value,
                    "display_name": "",
                    "login": login.value,
                    "email": email.value,
                    "phone": phone.value
                } as UserFields;
                api.updateUserInfo(newData);
                changeBtn.parentElement?.classList.add("locked");
                changeBtn.textContent = "Изменить данные";
            }
        })
        changeAvatar && changeAvatar.addEventListener('click', e => {
            e.preventDefault();
            let uploadFile = document.querySelector('#avatar') as HTMLInputElement;
            uploadFile.click();
            uploadFile.onchange = () => {
                const file = uploadFile.files![0];
                if (!!file) {
                    const formData = new FormData;
                    formData.append("avatar", file, file.name);
                    api.loadAvatar(formData);
                }
              }
        })
    }

    // check forms
    if (form && form.name !== 'settings') {

        form.querySelectorAll('input').forEach(el => {
            if (el.tagName == "INPUT") {
                addMultipleEventListener(el,['focus', 'blur'], (e:Event)=> {
                    validator.validate(e, [el]);
                })
            }
        })

        form?.addEventListener("submit", (e)=> { validator.validate(e, Array.from(form?.querySelectorAll('input')!)) });
    }
        
    // send forms
    if (form) {
        if (form.name == 'reg') {
            form.addEventListener('submit', e => {
                e.preventDefault();
                if (!validator.validate(e, Array.from(form?.querySelectorAll('input')!)) ) {
                    return;
                };

                const formData = new FormData(form as HTMLFormElement);
                const data = api.signUp(
                    formData.get('first_name') as string,
                    formData.get('second_name') as string,
                    formData.get('login') as string,
                    formData.get('email') as string,
                    formData.get('phone') as string,
                    formData.get('password') as string
                );
                data.then( (req:XMLHttpRequest) => {
                    const JSONreqest:UserFields = JSON.parse(req.response);
                    if (JSONreqest.id) {
                        document.location.pathname = '/messenger';
                    }
                });

            });
        }

        if (form.name == 'auth') {
            form.addEventListener('submit', e => {
                e.preventDefault();
                if (!validator.validate(e, Array.from(form?.querySelectorAll('input')!)) ) {
                    return;
                };

                const formData = new FormData(form as HTMLFormElement);
                api.signIn(
                    formData.get('login') as string,
                    formData.get('password') as string
                );
            });
        }
    }
}

function addMultipleEventListener(element:Element, events:Array<any>, handler:any) {
    events.forEach(el => element.addEventListener(el, handler))
}
