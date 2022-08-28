import Fetch  from './Fetch';
import type { Options }  from './Fetch';
import type { UserFields } from './User';
import { bus as eventsBus } from './EventBus';

export class ApiAction {
    BASE_URL:string = 'https://ya-praktikum.tech/api/v2';
    GET_USER:string = '/auth/user';
    SIGNUP:string='/auth/signup';
    SIGNIN:string='/auth/signin';
    LOGOUT:string='/auth/logout';
    GET_CHATS:string='/chats/';

    async getUser():Promise<UserFields> {
        const options:Options = {
            headers: {
                'content-type': 'application/json',
            },
            data: {},
            timeout: 1000
        };
        const fetch = new Fetch();
        let req:XMLHttpRequest = await fetch.get(this.BASE_URL + this.GET_USER, options) as XMLHttpRequest;
        const data:UserFields = await JSON.parse(req.response);
        eventsBus.dispatch('getUser', data);
        return data;
    }


    async signUp(name:string, surname:string,login:string,email:string,phone:string,pswd:string):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
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
        let data:XMLHttpRequest = await fetch.post(this.BASE_URL + this.SIGNUP, options) as XMLHttpRequest;
        return data;
    }


    async signIn(login:string,pswd:string):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                login: login,
                password: pswd
            },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.post(this.BASE_URL + this.SIGNIN, options) as XMLHttpRequest;
        eventsBus.dispatch('signIn', data);
        return data;
    }

    async logout():Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {},
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.post(this.BASE_URL + this.LOGOUT, options) as XMLHttpRequest;
        eventsBus.dispatch('goAuth', data);
        return data;
    }

    async chatList(offset:number|null = null,limit:number|null = null,search:string|null = null):Promise<XMLHttpRequest> {
        let additionalString:string = '?';
        if (offset) { additionalString += 'offset=' + offset + '&'; }
        if (search) { additionalString += 'search' + encodeURI(search) + '&'; }
        if (limit) { additionalString += 'limit' + limit; }
        if (additionalString == '?' || additionalString[additionalString.length] == '&') {
            additionalString = additionalString.substring(0, additionalString.length - 1);
        }
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: { },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.get(this.BASE_URL + this.GET_CHATS + additionalString, options) as XMLHttpRequest;
        eventsBus.dispatch('loadedChatList', data);
        return data;
    }

}