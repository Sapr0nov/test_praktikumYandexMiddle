export type Methods = "GET" | "POST" | "PUT" | "DELETE";

export type MethodsCollection = {
  GET: Methods;
  POST: Methods;
  PUT: Methods;
  DELETE: Methods;
};

export type Options = {
  headers: Record<string, string>;
  data: Object;
  timeout: number;
};
type ReqOptions = {
  headers: Record<string, string>;
  method: Methods;
  data: Object;
  timeout: number;
};

export class Fetch {
  METHODS: MethodsCollection = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };

  // Необязательный метод
  queryStringify(data: Record<string, string>) {
    if (typeof data !== "object") {
      throw new Error("Data must be object");
    }

    const keys = Object.keys(data);
    const result = keys.reduce((result: Object, key: string, index: number) => {
      return `${result}${key}=${data[key]}${
        index < keys.length - 1 ? "&" : ""
      }`;
    }, "?");
    return result.length > 1 ? result : "";
  }

  get = (url: string, options: Options) => {
    return this.request(url, { ...options, method: this.METHODS.GET });
  };

  post = (url: string, options: Options) => {
    return this.request(url, { ...options, method: this.METHODS.POST });
  };

  put = (url: string, options: Options) => {
    return this.request(url, { ...options, method: this.METHODS.PUT });
  };

  delete = (url: string, options: Options) => {
    return this.request(url, { ...options, method: this.METHODS.DELETE });
  };

  request = (url: string, options: ReqOptions, timeout: number = 5000) => {
    const headers: Record<string, string> = options.headers;
    const method = options.method;
    const data: any = options.data;
    let ctxFetch = this;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === ctxFetch.METHODS.GET;
      const dataModifity = ctxFetch.queryStringify(data);
      xhr.withCredentials = true;
      xhr.open(method, isGet && !!dataModifity ? `${url}${dataModifity}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (
        headers["content-type"] &&
        headers["content-type"].indexOf("json") > -1
      ) {
        if (isGet || !dataModifity) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      } else {
        //send as FormData
        xhr.send(data);
      }
    });
  };
}
