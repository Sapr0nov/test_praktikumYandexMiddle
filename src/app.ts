interface FormData {
    key:  keyof FormData;
    value: string;
}

import { Error404 } from './pages/404/404.ts';
import { Error500 } from './pages/500/500.ts';
import { Index } from './pages/index/index.ts';
import { AuthForm } from './pages/form_auth/form_auth.ts';
import { RegForm } from './pages/form_registration/form_registration.ts';
import { Settings } from './components/settings/settings.ts';
import { Block } from './modules/Block';
import './pages/index/index.css';
import './modules/form.css';

let currentPage:Block;

const urlPath = document.location.pathname;
switch (urlPath) {
    case '/' : 
    case '/index' : 
        currentPage = new Index(); 
        break;
    case '/login' : 
        currentPage = new AuthForm(); 
        break;
    case '/reg' : 
        currentPage = new RegForm(); 
        break;
    case '/settings' : 
        currentPage = new Settings(); 
        break;
    case '/500' : 
        currentPage = new Error500();
        break;
    default : 
        currentPage = new Error404();
}


let tmpText:string = '';
tmpText = currentPage.render();

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
    
    profileBtn && profileBtn.addEventListener("click", () => { document.location.href = "/settings"; });
    settingBtn && settingBtn.addEventListener("click", () => { document.location.href = "/settings"; });
}

// check forms
if (form) {
    form.querySelectorAll('input').forEach(el => {
        if (el.tagName == "INPUT") {
            if (el.name == "login") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isLogin, isValidLenght], "Логин не корректен: ", 3, 20, 0);
                })
            }
            if (el.name == "password") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isPassword, isValidLenght], "Пароль не корректен: ", 8, 40, 0);
               })
            }
            if (el.name == "first_name") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isName], "Имя не корректено: ", null, null, 0);
                })
            }
            if (el.name == "second_name") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isName], "Фамилия не корректена: ", null, null, 0);
                })
            }
            if (el.name == "email") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isEmail], "Email не корректен: ", null, null, 0);
                })
            }
            if (el.name == "phone") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isPhone, isValidLenght], "Телефон не корректен: ", 10, 15, 0);
                })
            }
            if (el.name == "message") {
                addMultipleEventListener(el,['focus', 'blur'], ()=> {
                    validator(el, 'form-error', [isValidLenght], "Сообщение не корректно: ", 1, 255, 0);
                })
            }
        }
        
    form?.addEventListener("submit", validate);
    })
}

function validate(e:Event) {
    e.preventDefault();
    
    const formData:FormData | any = {};
    form?.querySelectorAll('input').forEach(el => {
        let key:keyof typeof formData = el.name;
        formData[key] = el.value;

        switch (el.name) {
            case "login":
                validator(el, 'form-error', [isLogin, isValidLenght], "Логин не корректен: ", 3, 20, 1); break;
            case "password":
                validator(el, 'form-error', [isPassword, isValidLenght], "Пароль не корректен: ", 8, 40, 1); break;
            case "first_name":
                validator(el, 'form-error', [isName], "Имя не корректено: ", null, null, 1); break;
            case "second_name":
                validator(el, 'form-error', [isName], "Фамилия не корректена: ", null, null, 1); break;
            case "email":
                validator(el, 'form-error', [isEmail], "Email не корректен: ", null, null, 1); break;
            case "phone":
                validator(el, 'form-error', [isPhone, isValidLenght], "Телефон не корректен: ", 10, 15, 1); break;
            case "message":
                validator(el, 'form-error', [isValidLenght], "Сообщение не корректно: ", 1, 255, 1); break;
            default:
                break;
        }
    })

    const form_error:Element | null = document.querySelector('.form-error');
    if (form_error && form_error.textContent == '') {
        console.log(formData);
        //form.submit();
    }
}

function isName(str:string) {
    const regEx = /^[A-ZА-Я]+[a-zа-я\-]*/gm;    // cyrilic, latin, first Capital
    if (!regEx.test(str)) { throw "должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - "; };
}
function isPhone(str:string) {
    const regEx = /^\+?[0-9]*/gm;
    if (!regEx.test(str)) { throw "может начинаться с плюса, состоит только из цифр"; };
}
function isLogin(str:string) {
    const regEx = /^[0-9]?[a-zA-Z]+[a-zA-Z0-9-_]*/gm;
    if (!regEx.test(str)) { throw "должен состоять из цифр и латинцицы, тире и подчеркивания, должна быть хотя бы одна буква"; };
}
function isPassword(str:string) {
    const regEx = /.*[А-ЯA-Z]+.*/gm;
    if (!regEx.test(str)) { throw "Должна быть хотя бы одна заглавная буква"; };
}
function isEmail(str:string) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
    if (!regEx.test(str)) { throw "Должна быть @ точка после неё и латинские буквы"; };
}
function isValidLenght(str:string,min:number,max:number) {
    if (str.length < min || str.length > max) { throw "длина поля должна быть от " + min + " до " + max + " символов" ; };
}

function addMultipleEventListener(element:Element, events:Array<any>, handler:any) {
    events.forEach(el => element.addEventListener(el, handler))
  }

//  flag 1 - check all form, collect errors
function validator(element:any, error_class:string, tests:Array<Function>, text_err:string, min:number | null, max:number | null, flag:number) {
    if (flag == 0) {
        const form_error:Element | null = document.querySelector('.'+error_class);
        if (form_error) {
            form_error.textContent = "";
        }  
    }
    try {
        tests.forEach(test => {
            test(element.value, min, max);
        })
    }
    catch(err) {
        const form_error:Element | null = document.querySelector('.'+error_class);
        if (form_error) {
            form_error.textContent += " " + text_err + err;
        }  
    }
}