import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middleware';
export const reimbRouter = express.Router();

/**
 * Find all reimbursement
 */
reimbRouter.get('', [/*uthMiddleware('Administrator'),*/ async (req, res) => {
    try {
        console.log('retrieving all reimbursement tickets');
        console.log(req.session);
        let reimb = await reimbDao.findReimbAll();
        res.json(reimb);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}]);

/**
 * Create Reimbursement ticket
 */
reimbRouter.post('/create', async (req, res) => {
    try {
        console.log('creating reimbursement ticket');
        let reimbId = req.session.user.id;
        const id = await reimbDao.createReimbursement(req.body, reimbId);
        res.status(201);
        res.json(id);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

/**
 * Find Reimbursement ticket by id
 */
reimbRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    console.log(`retrieving reimbursement ticket with ${id}`);
    try {
        let reimb = await reimbDao.findReimbById(id);
        if(reimb !== undefined) {
            res.json(reimb);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

 /**
 * Update Reimbursement ticket by id
 */
reimbRouter.patch('/update/:id', async (req, res) => {
    const id = +req.params.id;
    console.log(`updating reimbursement ticket with ${id}`);
    console.log(req.session);
    try {
        let resolverId = req.session.user.id;
        let reimb = await reimbDao.updateReimbursement(resolverId, req.body.statusId, id);
        if(reimb !== undefined) {
            res.json(reimb);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})