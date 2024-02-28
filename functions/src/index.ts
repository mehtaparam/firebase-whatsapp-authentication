import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";

import express from 'express';
import cors from 'cors';

// Routers
import authCreateRouter from './routers/auth-create.router';
import authValidateRouter from './routers/auth-validate.router';
import { authCreateMiddleware } from './middleware/auth-create.middleware';
import { authValidateMiddleware } from './middleware/auth-validate.middleware';

// Initialze Firebase Admin
admin.initializeApp();

const auth = express();
auth.use(express.json({ limit: '100mb' }));
auth.use(cors({ origin: '*' }));
auth.use('/create', authCreateMiddleware,authCreateRouter);
auth.use('/validate', authValidateMiddleware, authValidateRouter);

// Expose the Express app as a Firebase Cloud Function
exports.auth = functions.https.onRequest(auth);