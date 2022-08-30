const { expect } = require('chai');
const {describe, it }  = require('mocha');

import { ValidateForm } from './Validate';
const validator = new ValidateForm();

const error = "должно начинаться с заглавной буквы и состоять только из Кирилицы, Латиницы и - ";
const desc = "ValidateForm: Имя с большой буквы и только из Латиницы, Кирилицы и дефиса";
describe(desc, () => {
  [
    {value: "Имя", result: true},
    {value: "Name", result: true},
    {value: "Имяname", result: true},
    {value: "Имя-имячко", result: true},
    {value: "Name-middle-triple", result: true},
    {value: "имя", result: error},
    {value: "Имя312*", result: error},
    {value: "Имя_моё", result: error}
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isName(test.value)).to.equal(test.result);
      });
    });
})

const error2 = "может начинаться с плюса, состоит только из цифр";
const desc2 = "ValidateForm: Телефон - может начинаться с плюса, состоит только из цифр";
describe(desc2, () => {
  [
    {value: "89011233232", result: true},
    {value: "+7873123123", result: true},
    {value: "+9", result: true},
    {value: "1", result: true},
    {value: "123123123123123213", result: true},
    {value: "++13321", result: error2},
    {value: "+7(901)32132", result: error2},
    {value: "8901-3223-23", result: error2}
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isPhone(test.value)).to.equal(test.result);
      });
    });
})

function error3(min:number, max:number):string {
  return  "длина поля должна быть от " + min + " до " + max + " символов";
} 
const desc3 = "ValidateForm: Длина поля от мин до мах количества символов";
describe(desc3, () => {
  [
    {value: ['testString',5,10], result: true},
    {value: ['Строка',2,4], result: error3(2,4)}
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isValidLenght(test.value[0] as string, test.value[1] as number, test.value[2] as number)).to.equal(test.result);
      });
    });
})

const error4 = "Должна быть @ точка после неё и латинские буквы";
const desc4 = "ValidateForm: Почта должна быть @ точка после неё и латинские буквы";
describe(desc4, () => {
  [
    {value: "mail@domain.ru", result: true},
    {value: "mail@do.main.ru", result: true},
    {value: "mailDomain.ru", result: error4},
    {value: "почта@Domain.ru", result: error4},
    {value: "mail@domain", result: error4}
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isEmail(test.value)).to.equal(test.result);
      });
    });
})

const error5 = "Должна быть хотя бы одна заглавная буква";
const desc5 = "ValidateForm: Пароль - Должна быть хотя бы одна заглавная буква";
describe(desc5, () => {
  [
    {value: "фыаФавы", result: true},
    {value: "Fsdf", result: true},
    {value: "asfsa #42 аыаы", result: error5},
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isPassword(test.value)).to.equal(test.result);
      });
    });
})

const error6 = "должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква";
const desc6 = "ValidateForm: Логин - должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква";
describe(desc6, () => {
  [
    {value: "serg86_1", result: true},
    {value: "1f231_1f321", result: true},
    {value: "12345", result: error6},
    {value: "Печорин32", result: error6},
  ].forEach ( (test) => {
      it( test.value + ( (test.result === true)? ' correct' : ' incorrect'), () => {
        expect(validator.isLogin(test.value)).to.equal(test.result);
      });
    });
})
