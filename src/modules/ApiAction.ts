import Fetch  from './Fetch';
import type { Options }  from './Fetch';
import { UserFields } from './User';
import { user as User } from './User';
import { bus as eventsBus } from './EventBus';

export class ApiAction {
    BASE_URL:string = 'https://ya-praktikum.tech/api/v2';
    GET_USER:string = '/auth/user';
    UPDATE_USER:string = '/user/profile';
    SIGNUP:string='/auth/signup';
    SIGNIN:string='/auth/signin';
    LOGOUT:string='/auth/logout';
    GET_CHATS:string='/chats/';
    LOAD_AVATAR:string='/user/profile/avatar';
    UPDATE_PSWD:string='/user/password';
    ACTION_CHAT:string='/chats';
    USERIN_CHAT:string='/chats/users';
    GET_TOKEN:string='/chats/token/';

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

    async updateUserInfo(info:UserFields):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: info,
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.put(this.BASE_URL + this.UPDATE_USER, options) as XMLHttpRequest;
        eventsBus.dispatch('updateUserData', data);
        return data;

    }

    async loadAvatar(file:FormData):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: { },
            data: file,
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.put(this.BASE_URL + this.LOAD_AVATAR, options) as XMLHttpRequest;
        eventsBus.dispatch('uploadedAvatar', data);
        return data;

    }

    async updatePassword(newPassword:string, oldPassword:string):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {"oldPassword":oldPassword, "newPassword":newPassword},
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.put(this.BASE_URL + this.UPDATE_PSWD, options) as XMLHttpRequest;
        eventsBus.dispatch('updatedPassword', data);
        return data;
    }

    async createChat(title:string):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {"title":title},
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.post(this.BASE_URL + this.ACTION_CHAT, options) as XMLHttpRequest;
        eventsBus.dispatch('createdChat', data);
        return data;
    }

    async deleteChat(chatId:number):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {"chatId":chatId},
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.delete(this.BASE_URL + this.ACTION_CHAT, options) as XMLHttpRequest;
        eventsBus.dispatch('deletedChat', data);
        return data;
    }

    async addUsersToChat(users:Array<number>, chatId:number):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "users" : users,
                "chatId": chatId
            },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.put(this.BASE_URL + this.USERIN_CHAT, options) as XMLHttpRequest;
        eventsBus.dispatch('addedUserToChat', data);
        return data;
    }

    async deleteUsersFromChat(users:Array<number>, chatId:number):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "users" : users,
                "chatId": chatId
            },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.delete(this.BASE_URL + this.USERIN_CHAT, options) as XMLHttpRequest;
        eventsBus.dispatch('deletedUserFromChat', data);
        return data;
    }

    async getTokenChat(chatId:number):Promise<XMLHttpRequest> {
        const options:Options = {
            headers: {
                'content-type': 'application/json'
            },
            data: { },
            timeout: 1000
        };
        const fetch = new Fetch();
        let data:XMLHttpRequest = await fetch.post(this.BASE_URL + this.GET_TOKEN + '/' + chatId, options) as XMLHttpRequest;
        eventsBus.dispatch('gotToken', data);
        return data;

    }

    async socketConnect(userId:number, chatId:number, token:string) {
        const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' + userId.toString() + '/' + chatId.toString() + '/' + token); 
        User.currentChat.socket = socket;
        socket.addEventListener('open', () => {
            User.currentChat.status = 'connect';
        });

        socket.addEventListener('close', event => {
            User.currentChat.status = 'disconnect';

            if (event.wasClean) {
                console.log('Соединение закрыто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
        });
          
        socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        }); 
                
    }

  
  

}