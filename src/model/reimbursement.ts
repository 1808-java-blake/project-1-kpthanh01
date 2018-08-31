export class Reimbursement {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    authorId = 0;
    resolverId = 0;
    reimbStatus = '';
    reimbType = '';


    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, 
        description?: string, authorId?: number, resolverId?: number, 
        reimbStatus?: string, reimbType?: string){
            id && (this.id = id);
            amount && (this.amount = amount);
            submitted && (this.submitted = submitted);
            resolved && (this.resolved = resolved);
            description && (this.description = description);
            authorId && (this.authorId = authorId);
            resolverId && (this.resolverId = resolverId);
            reimbStatus && (this.reimbStatus = reimbStatus);
            reimbType && (this. reimbType =  reimbType);
    }
}