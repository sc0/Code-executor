import express from 'express';
import { executeCommand, getCommand, getLastTenEntries } from '../controllers/executor.controller.js';

const executerRouter = express.Router();

executerRouter.route('/api/execute').post(executeCommand);
executerRouter.route('/api/command/:id').get(getCommand);
executerRouter.route('/api/history').get(getLastTenEntries);

export default executerRouter;
