import { User } from "./user.model";

export class News{
    userName: string;
    date: Date;
    description: string;
    country: string;

    constructor(userName: string, date: Date, description: string, country: string){
        this.userName = userName;
        this.date = date;
        this.description = description;
        this.country = country;
    }
}