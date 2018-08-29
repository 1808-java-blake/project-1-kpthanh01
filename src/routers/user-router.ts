import express from 'express';
import * as userDao from '../dao/user-dao';

export const userRouter = express.Router();

/**
 * Find all users
 */
userRouter.get('', async (req, res) => {
    try {
        console.log('retrieving all users');
        let users = await userDao.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// userRouter.get('', async (req, res) => {
//     try {
        
//     } catch (err) {
        
//     }
// });

/**
 * Add a new user
 */
userRouter.post('', async (req, res) => {
    console.log('creating user');
    try {
        const id = await userDao.create(req.body);
        res.status(201);
        res.json(id);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// userRouter.post('', async (req, res) => {
//     try {
        
//     } catch (err) {
        
//     }
// });

// userRouter.post('', async (req, res) => {
//     try {
        
//     } catch (err) {
        
//     }
// });