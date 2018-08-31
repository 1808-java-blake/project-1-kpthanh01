import {User} from "../model/user";
import {SqlUser} from "../dto/sql-user";

/**
 * This is used to convert a sql user into an actual user
 */

export function userConverter(user: SqlUser){
    return new User(
        user.user_id, 
        user.username, 
        undefined, 
        user.firstname, 
        user.lastname, 
        user.email, 
        user.role,
    );
}