type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type MethodsCollection = {
    GET:Methods,
    POST:Methods,
    PUT:Methods,
    DELETE:Methods
}
type Options = {
    headers: Record<string, string>, 
    method: Methods,
    data: Object,
    timeout: number
  };

export default class Fetch {
    
    METHODS:MethodsCollection = {
        GET: 'GET',
		POST: 'POST',
		PUT: 'PUT',
		DELETE: 'DELETE',
    };

    // Необязательный метод
    queryStringify(data:Record<string, string>) {
        if (typeof data !== 'object') {
            throw new Error('Data must be object');
        }
        
        // Здесь достаточно и [object Object] для объекта
        const keys = Object.keys(data);
        return keys.reduce((result:Object, key:string, index:number) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }

    get = (url: string, options: Options) => {
        return this.request(url, {...options, method: this.METHODS.GET});
    };

    post = (url: string, options: Options) => {
        return this.request(url, {...options, method: this.METHODS.POST});
    };
    
    put = (url: string, options: Options) => {
        return this.request(url, {...options, method: this.METHODS.PUT});
    };

    delete = (url: string, options: Options) => {
        return this.request(url, {...options, method: this.METHODS.DELETE});
    };
    
    request = (url:string, options: Options, timeout:number = 5000) => {
        const headers:Record<string, string> = options.headers;
        const method = options.method;
        const data:any = options.data;

        return new Promise(function(resolve, reject) {
            if (!method) {
                    reject('No method');
                    return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === this.METHODS.GET;

            xhr.open(
                method, 
                isGet && !!data
                    ? `${url}${this.queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
        
            xhr.onload = function() {
                resolve(xhr);
            };
        
            xhr.onabort = reject;
            xhr.onerror = reject;
        
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
                
            if (isGet || !data) {
                xhr.send();
            } else {
                    xhr.send(data);
            }
        });
    };
}