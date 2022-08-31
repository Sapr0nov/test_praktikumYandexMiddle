interface FormData {
    key:  keyof FormData;
    value: string;
}

export class ValidateForm {
    validate(e:Event, inputs:Array<HTMLInputElement>) :boolean {

        e.preventDefault();
        const formData:FormData | any = {};
        const errors:Array<string> = [];
        const form_error:Element | null = document.querySelector('.form-error');
        form_error?.textContent == '';

        inputs.forEach(el => {
            let key:keyof typeof formData = el.name;
            let error: string;
            formData[key] = el.value;
           
            switch (el.name) {
                case "login":
                    error = this.validator(el, [this.isLogin, this.isValidLenght], "Логин не корректен: ", 3, 20);
                    if (error) { errors.push(error); } break;
                case "password":
                    error = this.validator(el, [this.isPassword, this.isValidLenght], "Пароль не корректен: ", 8, 40);
                    if (error) { errors.push(error); } break;
                case "first_name":
                    error = this.validator(el, [this.isName], "Имя не корректено: ", null, null);
                    if (error) { errors.push(error); } break;
                case "second_name":
                    error = this.validator(el, [this.isName], "Фамилия не корректена: ", null, null);
                    if (error) { errors.push(error); } break;
                case "email":
                    error = this.validator(el, [this.isEmail], "Email не корректен: ", null, null);
                    if (error) { errors.push(error); } break;
                case "phone":
                    error = this.validator(el, [this.isPhone, this.isValidLenght], "Телефон не корректен: ", 10, 15);
                    if (error) { errors.push(error); } break;
                case "message":
                    error = this.validator(el, [this.isValidLenght], "Сообщение не корректно: ", 1, 255);
                    if (error) { errors.push(error); } break;
                default:
                break;
            }
        })
        if (errors.length == 0) {
            form_error!.textContent = '';
            return true;
        }
        form_error!.textContent = errors.join("\r\n");
        return false;
    }
    
    isName(str:string):string|boolean {
        const regEx = /^[A-ZА-Я]+[a-zа-я\-]*$/gm;    // cyrilic, latin, first Capital
        if (!regEx.test(str)) { 
            return "должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - "; 
        }
        return true;
    }
    
    isPhone(str:string):string|boolean {
        const regEx = /^\+?[0-9]*$/gm;
        if (!regEx.test(str)) { 
            return "может начинаться с плюса, состоит только из цифр"; 
        }
        return true;
    }
    
    isLogin(str:string):string|boolean {
        const regEx = /^[0-9]?[a-zA-Z]+[a-zA-Z0-9-_]*/gm;
        if (!regEx.test(str)) { 
            return "должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква"; 
        }
        return true;
    }
    
    isPassword(str:string) {
        const regEx = /.*[А-ЯA-Z]+.*/gm;
        if (!regEx.test(str)) { 
            return "Должна быть хотя бы одна заглавная буква"; 
        }
        return true;
    }
    
    isEmail(str:string) {
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
        if (!regEx.test(str)) { 
            return "Должна быть @ точка после неё и латинские буквы"; 
        }
        return true;
    }
    
    isValidLenght(str:string,min:number,max:number) {
        if (str.length < min || str.length > max) { 
            return "длина поля должна быть от " + min + " до " + max + " символов"; 
        }
        return true;
    }
    
    //  shouldCleanError  true - check all form, collect errors
    validator(element:any, tests:Array<Function>, text_err:string, min:number | null, max:number | null) {
        let error:string = '';
        tests.forEach(test => {
            let result = test(element.value, min, max);
            if (result !== true) {
                error = text_err + result;
            }
        })
       return error;
    }
}