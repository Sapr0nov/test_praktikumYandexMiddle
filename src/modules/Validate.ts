export class ValidateForm {
  isName(str: string): string | boolean {
    const regEx = /^[A-ZА-Я]+[a-zа-я\-]*$/gm; // cyrilic, latin, first Capital
    return regEx.test(str);
  }

  isPhone(str: string): string | boolean {
    const regEx = /^\+?\d*$/gm;
    return regEx.test(str);
  }

  isLogin(str: string): string | boolean {
    const regEx = /^\d?[a-zA-Z]+[a-zA-Z0-9-_]*/gm;
    return regEx.test(str);
  }

  isPassword(str: string) {
    const regEx = /.*[А-ЯA-Z]+.*/gm;
    return regEx.test(str);
  }

  isEmail(str: string) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
    return regEx.test(str);
  }

  isValidLenght(str: string, min: number, max: number) {
    return !(str.length < min || str.length > max);
  }

  validator(
    element: any,
    tests: Array<Function>,
    text_err: string,
    min: number | null,
    max: number | null
  ) {
    let error: string = "";
    tests.forEach((test) => {
      let result = test(element.value, min, max);
      if (!result) {
        error = text_err;
      }
    });
    return error;
  }
}
