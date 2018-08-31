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
            `SELECT * FROM reimbursement.reimbursement_ticket`
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
            `SELECT * FROM reimbursement.reimbursement_ticket
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
export async function createReimbursement(reimb: Reimbursement): Promise<number>{
    const client = await connectionPool.connect();
    try {
        const res = await client.query(
            `INSERT INTO reimbursement.reimbursement_ticket
            (amount, submit_date, description, author_id, reimb_status, reimb_type)
            VALUES ($1, current_date, $2, $3, 'Pending', $4)
            RETURNING reimb_id`,
            [reimb.amount, reimb.description, reimb.authorId, reimb.reimbType]
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
            `UPDATE reimbursement.reimbursement_ticket rt
                SET resolve_date = current_date, resolver_id = $1, reimb_status = $2 
                WHERE rt.reimb_id = $3`,
            [resolverId, status, reimbId]
        );
        return res.rows[0].reimb_id;
    } finally {
        client.release();
    }
}