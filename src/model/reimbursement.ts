export class Reimbursement {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = 0;
    resolver = 0;
    statusId = 0;
    reimbStatus = '';
    typeId = 0;
    reimbType = '';


    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, 
        description?: string, author?: number, resolver?: number, statusId?: number, 
        reimbStatus?: string, typeId?: number,  reimbType?: string){
            id && (this.id = id);
            amount && (this.amount = amount);
            submitted && (this.submitted = submitted);
            resolved && (this.resolved = resolved);
            description && (this.description = description);
            author && (this.author = author);
            resolver && (this.resolver = resolver);
            statusId && (this.statusId = statusId);
            reimbStatus && (this.reimbStatus = reimbStatus);
            typeId && (this.typeId = typeId);
            reimbType && (this. reimbType =  reimbType);
    }
}