const { expect } = require('chai');
const {describe, it }  = require('mocha');

import Router from '../src/modules/Router';
/*
import { bus as eventsBus } from './modules/EventBus';
*/

//import { Block } from '../src/modules/Block';
import { ApiAction } from '../src/modules/ApiAction';

const block = new ApiAction();
const window = global;
const router = new Router(window);
console.log(router.history);
//router.go('/');
//const str:string = block.render();
//const doc = new DOMParser().parseFromString(str, "text/xml");

describe('Наличие поля авторизации', () => {
  it('Проверяем наличие поля input name = "login" name = "password"', () => {
    expect(block);
//    expect(doc.querySelector('input[name="login"]')).to.equal(null);
  })
});