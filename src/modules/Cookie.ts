type Options = {
  path: string;
  expires: any | string | null;
  "max-age": number | null;
};

export default class Cookies {
  getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  setCookie(
    name: string,
    value: string,
    options: Options = { path: "/", expires: null, "max-age": null }
  ) {
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    let key: keyof Options;
    for (key in options) {
      updatedCookie += "; " + key;
      updatedCookie += "=" + options[key];
    }
    document.cookie = updatedCookie;
  }

  delete(name: string) {
    this.setCookie(name, "", { path: "/", expires: null, "max-age": -1 });
  }
}
