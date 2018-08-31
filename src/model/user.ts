import { Reimbursement } from "./reimbursement";


export class User {
    id = 0;
    username = '';
    password = '';
    firstname = '';
    lastname = '';
    email = '';
    role = '';
    reimbTicket: Reimbursement[] = [];

    constructor(id?: number, username?: string, password?: string, firstname?: string, 
        lastname?: string, email?: string, role?: string, reimbTicket?: Reimbursement[]){
            id && (this.id = id);
            username && (this.username = username);
            password && (this.password = password);
            firstname && (this.firstname = firstname);
            lastname && (this.lastname = lastname);
            email && (this.email = email);
            role && (this.role = role);
            reimbTicket && (this.reimbTicket = reimbTicket);
    }
}