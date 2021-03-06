import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import { reimbRouter } from './routers/reimb-router';

// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 8080;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false
};
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
  
// register session middleware
app.use(session(sess));

// log the request being made
app.use((req, res, next) => {
    console.log(`request made with path: ${req.path} and type: ${req.method}`);
    next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
    express.static(path.join(__dirname, 'public'))
);

// use the body parser to convert request json
app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
    (process.env.MOVIE_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `http://localhost:3000`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/

app.use('/users', userRouter);
app.use('/reimbursement', reimbRouter);

const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
});