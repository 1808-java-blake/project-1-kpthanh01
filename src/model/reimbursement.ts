export class Reimbursement {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    authorId = 0;
    authorFirstname = '';
    authorLastname = '';
    resolverId = 0;
    reimbStatusId = 0;
    reimbStatus = '';
    reimbTypeId = 0;
    reimbType = '';
    


    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, 
        description?: string, authorId?: number, authorFirstname?: string, authorLastname?: string, 
        resolverId?: number, reimbStatusId?: number, reimbStatus?: string, reimbTypeId?: number, reimbType?: string){
            id && (this.id = id);
            amount && (this.amount = amount);
            submitted && (this.submitted = submitted);
            resolved && (this.resolved = resolved);
            description && (this.description = description);
            authorId && (this.authorId = authorId);
            authorFirstname && (this.authorFirstname = authorFirstname);
            authorLastname && (this.authorLastname = authorLastname);
            resolverId && (this.resolverId = resolverId);
            reimbStatusId && (this.reimbStatusId = reimbStatusId);
            reimbStatus && (this.reimbStatus = reimbStatus);
            reimbTypeId && (this. reimbTypeId =  reimbTypeId);
            reimbType && (this. reimbType =  reimbType);
    }
}