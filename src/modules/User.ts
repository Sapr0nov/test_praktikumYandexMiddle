export type UserFields = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string | null,
    email: string,
    login: string,
    phone: string,
    avatar: string | null,
    reason: string
}

export class User {
    private static instance?: User = undefined;
    
    private constructor() {
    }
    
    public static getInstance(): User {
        if (this.instance === undefined) {
        this.instance = new User();
        }
    
        return this.instance;
    }
    public id:number | null;
    public first_name:string | null;
    public second_name:string | null;
    public display_name:string | null;
    public login:string | null;
    public avatar: string | null | any;
    public email:string | null;
    public phone:string | null;
}

export const user = User.getInstance();
