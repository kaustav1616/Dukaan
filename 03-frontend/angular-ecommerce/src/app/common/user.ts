export class User 
{
    id: string;
    userName: string;
    password: string;
    active: boolean;
    jwt: string;

    constructor()
    {
        this.id = "";
        this.userName = "";
        this.password = "";
        this.active = true;
        this.jwt = "";
    }
}