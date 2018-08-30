import express from 'express';
import * as reimbDao from '../dao/reimb-dao';

export const reimbRouter = express.Router();

/**
 * Find all reimbursement
 */
reimbRouter.get('', async (req, res) => {
    try {
        console.log('retrieving all reimbursement tickets');
        let reimb = await reimbDao.findAll();
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
    console.log(`retrieving movie with ${id}`);
    try {
        let reimb = await reimbDao.findById(id);
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