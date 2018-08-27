export class User {
    id = 0;
    username = '';
    password = '';
    role = 'employee';

    constructor(id?: number, username?: string, password?: string, role?: string){
        id && (this.id = id);
        username && (this.username = username);
        password && (this.password = password);
        role && (this.role = role);
    }
}