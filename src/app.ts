import { Error404 } from './pages/404/404.ts';
import { Error500 } from './pages/500/500.ts';
import { Index } from './pages/index/index.ts';
import { AuthForm } from './pages/form_auth/form_auth.ts';
import { RegForm } from './pages/form_registration/form_registration.ts';
import { Settings } from './components/settings/settings.ts';
import { Block } from './modules/Block';
import { ValidateForm } from './modules/Validate';

import './pages/index/index.css';
import './modules/form.css';

let currentPage:Block;
const validator = new ValidateForm();

const urlPath = document.location.pathname;
switch (urlPath) {
    case '/' : 
    case '/index/' : 
        currentPage = new Index(); 
        break;
    case '/login/' : 
        currentPage = new AuthForm(); 
        break;
    case '/reg/' : 
        currentPage = new RegForm(); 
        break;
    case '/settings/' :
        currentPage = new Settings(); 
        break;
    case '/500/' : 
        currentPage = new Error500();
        break;
    default : 
        currentPage = new Error404();
}


let tmpText:string = currentPage.render();

// Render from appendChild
const newNode = new DOMParser().parseFromString(tmpText, "text/html").body.firstChild;
const root = document.getElementById("root");


if (root && newNode) {
    root.appendChild(newNode);
}

// Events
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