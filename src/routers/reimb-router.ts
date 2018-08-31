import express from 'express';
import * as reimbDao from '../dao/reimb-dao';

export const reimbRouter = express.Router();

/**
 * Find all reimbursement
 */
reimbRouter.get('', async (req, res) => {
    try {
        console.log('retrieving all reimbursement tickets');
        let reimb = await reimbDao.findReimbAll();
        res.json(reimb);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * Create Reimbursement ticket
 */
reimbRouter.post('', async (req, res) => {
    try {
        console.log('creating reimbursement ticket');
        const id = await reimbDao.createReimbursement(req.body);
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
    const resolverId = req.body.resolver;
    const statusId = req.body.status;
    console.log(`updating reimbursement ticket with ${id}`);
    try {
        let reimb = await reimbDao.updateReimbursement(resolverId, statusId, id);
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