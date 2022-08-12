interface FormData {
    key:  keyof FormData;
    value: string;
}

export class ValidateForm {
    validate(e:Event, inputs:Array<HTMLInputElement>) {
        e.preventDefault();
        
        const formData:FormData | any = {};
        inputs.forEach(el => {
            let key:keyof typeof formData = el.name;
            formData[key] = el.value;
    
            switch (el.name) {
                case "login":
                    this.validator(el, 'form-error', [this.isLogin, this.isValidLenght], "Логин не корректен: ", 3, 20, true); break;
                case "password":
                    this.validator(el, 'form-error', [this.isPassword, this.isValidLenght], "Пароль не корректен: ", 8, 40, true); break;
                case "first_name":
                    this.validator(el, 'form-error', [this.isName], "Имя не корректено: ", null, null, true); break;
                case "second_name":
                    this.validator(el, 'form-error', [this.isName], "Фамилия не корректена: ", null, null, true); break;
                case "email":
                    this.validator(el, 'form-error', [this.isEmail], "Email не корректен: ", null, null, true); break;
                case "phone":
                    this.validator(el, 'form-error', [this.isPhone, this.isValidLenght], "Телефон не корректен: ", 10, 15, true); break;
                case "message":
                    this.validator(el, 'form-error', [this.isValidLenght], "Сообщение не корректно: ", 1, 255, true); break;
                default:
                    break;
            }
        })
    
        const form_error:Element | null = document.querySelector('.form-error');
        if (form_error && form_error.textContent == '') {
            return;
        }
    }
    
    isName(str:string) {
        const regEx = /^[A-ZА-Я]+[a-zа-я\-]*/gm;    // cyrilic, latin, first Capital
        if (!regEx.test(str)) { throw "должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - "; };
    }
    
    isPhone(str:string) {
        const regEx = /^\+?[0-9]*/gm;
        if (!regEx.test(str)) { throw "может начинаться с плюса, состоит только из цифр"; };
    }
    
    isLogin(str:string) {
        const regEx = /^[0-9]?[a-zA-Z]+[a-zA-Z0-9-_]*/gm;
        if (!regEx.test(str)) { throw "должен состоять из цифр и латинцицы, тире и подчеркивания, должна быть хотя бы одна буква"; };
    }
    
    isPassword(str:string) {
        const regEx = /.*[А-ЯA-Z]+.*/gm;
        if (!regEx.test(str)) { throw "Должна быть хотя бы одна заглавная буква"; };
    }
    
    isEmail(str:string) {
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
        if (!regEx.test(str)) { throw "Должна быть @ точка после неё и латинские буквы"; };
    }
    
    isValidLenght(str:string,min:number,max:number) {
        if (str.length < min || str.length > max) { throw "длина поля должна быть от " + min + " до " + max + " символов" ; };
    }
    
    //  shouldCleanError  true - check all form, collect errors
    validator(element:any, error_class:string, tests:Array<Function>, text_err:string, min:number | null, max:number | null, shouldCleanError:boolean) {
        if (shouldCleanError) {
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
}