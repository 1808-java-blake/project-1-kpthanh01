import { Reimbursement } from "../model/reimbursement";
import { SqlReimb } from "../dto/sql-reimb";
import { runInContext } from "vm";

export function reimbConverter(reimb: SqlReimb){
    return new Reimbursement(
        reimb.reimb_id,
        reimb.amount,
        reimb.submit_date,
        reimb.resolve_date,
        reimb.description,
        reimb.author_id,
        reimb.firstname,
        reimb.lastname,
        reimb.resolver_id,
        reimb.reimb_status_id,
        reimb.reimb_status,
        reimb.reimb_type_id,
        reimb.reimb_type,
    );
}