import Fetch  from './Fetch';
import type { Options }  from './Fetch';

export class ApiAction {
    BASE_URL:string = 'https://ya-praktikum.tech/api/v2';
    GET_USER:string = '/auth/user';
    SIGNUP:string='/auth/signup';
    
    getUser() {
        const options:Options = {
            headers: {},
            data: {},
            timeout: 1000
        };
        const fetch = new Fetch();
        let result:string = '';
        let data = fetch.get(this.BASE_URL + this.GET_USER, options);
        data.then(el => {
            return el;
        })
        return result;
    }
    signUp(name:string, surname:string,login:string,email:string,phone:string,pswd:string) {
        const options:Options = {
            headers: {
                'content-type': 'application/json', // Данные отправляем в формате JSON
            },
            data: {
                first_name: name,
                second_name: surname,
                login: login,
                email: email,
                phone: phone,
                password: pswd,
            },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data = fetch.post(this.BASE_URL + this.SIGNUP, options);
        data.then( (req:XMLHttpRequest) => {
            try {
                const request = JSON.parse(req.response);
                if (request.reason) {
                    alert(request.reason); 
                }else {
                    console.log('registration finished id: ' + request.id + ' ')
                }
            } catch (error) {
                console.log(error);
            }

            return req;
        })
        return;
      }
}