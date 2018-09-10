import { connectionPool } from '../util/connection-util';
import { Reimbursement } from '../model/reimbursement';
import { reimbConverter } from '../util/reimb-converter';
import { SqlReimb } from '../dto/sql-reimb';

/**
 * Retreive all reimbursement from the database
 */
export async function findReimbAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `SELECT * FROM reimbursement.reimb_ticket r
            LEFT JOIN reimbursement.reimb_type rt
            ON r.reimb_type_id = rt.reimb_type_id
            LEFT JOIN reimbursement.reimb_status st
            ON r.reimb_status_id = st.reimb_status_id
            LEFT JOIN reimbursement.reimb_user ru
			ON ru.user_id = r.author_id
            ORDER BY user_id DESC, reimb_status DESC`
        );
        return res.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
 * Retreive reimbursement by id from the database
 */
export async function findReimbById(id: number): Promise<Reimbursement>{
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `SELECT * FROM reimbursement.reimb_ticket
            WHERE reimb_id = $1`, 
            [id]
        );
        let reimb: SqlReimb = res.rows[0];
        if(reimb !== undefined){
            return reimbConverter(reimb);
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

/**
 * Add a new reimbursement ticket
 */
export async function createReimbursement(reimb: Reimbursement, reimbId: number): Promise<number>{
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `INSERT INTO reimbursement.reimb_ticket
            (amount, submit_date, description, author_id, reimb_status_id, reimb_type_id)
            VALUES ($1, localtimestamp(0), $2, $3, 3, $4)
            RETURNING reimb_id`,
            [reimb.amount, reimb.description, reimbId, reimb.reimbTypeId]
        );
        return res.rows[0].reimb_id;
    } finally {
        client.release();
    }
}

/**
 * Update reimbursement by id from the database
 */
export async function updateReimbursement(resolverId: number, status: string, reimbId: number): Promise<number>{
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `UPDATE reimbursement.reimb_ticket rt
                SET resolve_date = localtimestamp(0), resolver_id = $1, reimb_status_id = $2 
                WHERE rt.reimb_id = $3`,
            [resolverId, status, reimbId]
        );
        // console.log(res);
        return 1;
    } finally {
        client.release();
    }
}