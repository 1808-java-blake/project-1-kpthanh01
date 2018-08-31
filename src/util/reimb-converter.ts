import { Reimbursement } from "../model/reimbursement";
import { SqlReimb } from "../dto/sql-reimb";

export function reimbConverter(reimb: SqlReimb){
    return new Reimbursement(
        reimb.reimb_id,
        reimb.amount,
        reimb.submit_date,
        reimb.resolve_date,
        reimb.description,
        reimb.author_id,
        reimb.resolver_id,
        reimb.reimb_status,
        reimb.reimb_type
    );
}