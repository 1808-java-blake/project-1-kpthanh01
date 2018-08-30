import { connectionPool } from '../util/connection-util';
import { Reimbursement } from '../model/reimbursement';
import { reimbConverter } from '../util/reimb-converter';
import { SqlReimb } from '../dto/sql-reimb';

/**
 * Retreive all reimbursement from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
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
export async function findById(id: number): Promise<Reimbursement>{
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
            (amount, submitted, description, author, reimb_status_id, reimb_type_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING reimb_id`,
            [reimb.amount, reimb.submitted, reimb.description, reimb.author, reimb.statusId, reimb.typeId]
        );
        return res.rows[0].reimb_id;
    } finally {
        client.release();
    }
}