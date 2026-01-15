import express from 'express';
import {Newcontact} from "../controllers/newContact.js"
const Router = express.Router();

Router.post('/newcontact', Newcontact);

export default Router;