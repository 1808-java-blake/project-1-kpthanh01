import { Reimbursement } from "../model/reimbursement";
import { SqlReimb } from "../dto/sql-reimb";

export function reimbConverter(reimb: SqlReimb){
    return new Reimbursement(
        reimb.reimb_id,
        reimb.amount,
        reimb.submitted,
        reimb.resolved,
        reimb.description,
        reimb.author,
        reimb.resolver,
        reimb.reimb_status_id,
        reimb.reimb_status,
        reimb.reimb_type_id,
        reimb.reimb_type
    );
}