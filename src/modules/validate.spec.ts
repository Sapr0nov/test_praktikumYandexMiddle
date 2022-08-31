const { expect } = require("chai");
const { describe, it } = require("mocha");

import { ValidateForm } from "./Validate";
const validator = new ValidateForm();

const desc =
  "ValidateForm: Имя с большой буквы и только из Латиницы, Кирилицы и дефиса";
describe(desc, () => {
  [
    { value: "Имя", result: true },
    { value: "Name", result: true },
    { value: "Имяname", result: true },
    { value: "Имя-имячко", result: true },
    { value: "Name-middle-triple", result: true },
    { value: "имя", result: false },
    { value: "Имя312*", result: false },
    { value: "Имя_моё", result: false },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(validator.isName(test.value)).to.equal(test.result);
    });
  });
});

const desc2 =
  "ValidateForm: Телефон - может начинаться с плюса, состоит только из цифр";
describe(desc2, () => {
  [
    { value: "89011233232", result: true },
    { value: "+7873123123", result: true },
    { value: "+9", result: true },
    { value: "1", result: true },
    { value: "123123123123123213", result: true },
    { value: "++13321", result: false },
    { value: "+7(901)32132", result: false },
    { value: "8901-3223-23", result: false },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(validator.isPhone(test.value)).to.equal(test.result);
    });
  });
});

const desc3 = "ValidateForm: Длина поля от мин до мах количества символов";
describe(desc3, () => {
  [
    { value: ["testString", 5, 10], result: false },
    { value: ["Строка", 2, 4], result: true },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(
        validator.isValidLenght(
          test.value[0] as string,
          test.value[1] as number,
          test.value[2] as number
        )
      ).to.equal(test.result);
    });
  });
});

const desc4 =
  "ValidateForm: Почта должна быть @ точка после неё и латинские буквы";
describe(desc4, () => {
  [
    { value: "mail@domain.ru", result: true },
    { value: "mail@do.main.ru", result: true },
    { value: "mailDomain.ru", result: false },
    { value: "почта@Domain.ru", result: false },
    { value: "mail@domain", result: false },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(validator.isEmail(test.value)).to.equal(test.result);
    });
  });
});

const desc5 = "ValidateForm: Пароль - Должна быть хотя бы одна заглавная буква";
describe(desc5, () => {
  [
    { value: "фыаФавы", result: true },
    { value: "Fsdf", result: true },
    { value: "asfsa #42 аыаы", result: false },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(validator.isPassword(test.value)).to.equal(test.result);
    });
  });
});

const desc6 =
  "ValidateForm: Логин - должен состоять из цифр и латиницы, тире и подчеркивания, должна быть хотя бы одна буква";
describe(desc6, () => {
  [
    { value: "serg86_1", result: true },
    { value: "1f231_1f321", result: true },
    { value: "12345", result: false },
    { value: "Печорин32", result: false },
  ].forEach((test) => {
    it(test.value + (test.result === true ? " correct" : " incorrect"), () => {
      expect(validator.isLogin(test.value)).to.equal(test.result);
    });
  });
});
