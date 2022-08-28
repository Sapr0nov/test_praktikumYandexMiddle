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
        break;
        case '/sign-up' :
        case '/sign-up/' :
        currentPage = new RegForm();
        break;
        case '/settings/' :
        case '/settings' :
        currentPage = new Settings(); 
        api.getUser();
        break;
    case '/500/' : 
        currentPage = new Error500();
        break;
    default : 
        currentPage = new Error404();
}


function reRender(currentPage:Block) {
    const newNode = new DOMParser().parseFromString(currentPage.render(), "text/html").body.firstChild;
    const root = document.getElementById("root");
    if (root && newNode) {
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
    console.log(req);
    console.log(User);
})


// Events
function reEvents(newNode:ChildNode) {
    let form:HTMLFormElement|null|undefined = newNode?.parentElement?.querySelector('form');
    if (newNode && newNode.parentNode) {
        const profileBtn = <Element>newNode.parentNode.querySelector('.chat-profile');
        const settingBtn = <Element>newNode.parentNode.querySelector('.chat-header__setting');
        form = <HTMLFormElement>newNode.parentNode.querySelector('form');
        
        profileBtn && profileBtn.addEventListener("click", () => { document.location.href = "/settings/"; });
        settingBtn && settingBtn.addEventListener("click", () => { document.location.href = "/settings/"; });
    }

    // check forms
    if (form) {
        form.querySelectorAll('input').forEach(el => {
            if (el.tagName == "INPUT") {
                addMultipleEventListener(el,['focus', 'blur'], (e:Event)=> {
                    validator.validate(e, [el]);
                })
            }
        })

        form?.addEventListener("submit", (e)=> { validator.validate(e, Array.from(form?.querySelectorAll('input')!)) });
    }
        
    function addMultipleEventListener(element:Element, events:Array<any>, handler:any) {
        events.forEach(el => element.addEventListener(el, handler))
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
                        console.log("userID; ", JSONreqest.id);
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