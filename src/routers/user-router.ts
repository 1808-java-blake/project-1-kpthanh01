import express from 'express';
import * as userDao from '../dao/user-dao';

export const userRouter = express.Router();

/**
 * Find all users
 */
userRouter.get('', async (req, res) => {
    try {
        console.log('retrieving all users');
        let users = await userDao.findAllUsers();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * Find user by id
 */
userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    console.log(`retreiving user with id ${id}`);
    try {
        let user = await userDao.findUserById(id);
        if(user != undefined){
            res.json(user);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

/**
 * Find user by username and password
 */
userRouter.post('/login', async (req, res) => {
    try {
        const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);

        if(user) {
            req.session.user = user;
            res.json(user);
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * Add a new user
 */
userRouter.post('/register', async (req, res) => {
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
