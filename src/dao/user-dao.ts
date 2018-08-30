import {connectionPool} from '../util/connection-util';
import {User} from '../model/user';
import {userConverter} from '../util/user-converter';

/**
 * Add a new user to the DB
 */
export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `INSERT INTO reimbursement.reimb_user
            (username, password, firstname, lastname, email, user_role_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id`,
            [user.username, user.password, user.firstname, user.lastname, user.email, user.role]
        );
        return res.rows[0].user_id;
    } finally {
        client.release();
    }
}

/**
 * Retreive a single user by username and password, will also retreive all of their reimbursements
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();

    try {
        const res = await client.query(
            `SELECT * FROM reimbursement.reimb_user u
            WHERE u.username = $1 
            AND u.password = $2`,
            [username, password]
        );
        if(res.rows.length !== 0) {
            return userConverter(res.rows[0]);
        }
        return null;
    } finally {
        client.release();
    }
}

/**
 * Retreive all users from the DB along with all their reimbursement
 */
export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
      const resp = await client.query(
        `SELECT * FROM reimbursement.reimb_user`);
  
      // extract the users from the result set
      const users = [];
      resp.rows.forEach((user_result) => {
        const user = userConverter(user_result);
        users.push(user);
      })
      return users;
    } finally {
      client.release();
    }
}

/**
 * Retreive a single user by id from the DB along with all their reimbursement
 */
export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try{
       const res = await client.query(
           `SELECT * FROM reimbursement.reimb_user u
           WHERE u.user_id = $1`,
           [id]
        );
        const user = userConverter(res.rows[0]);
        return user;
    } finally {
        client.release();
    }
}




 /**
 * 
 */