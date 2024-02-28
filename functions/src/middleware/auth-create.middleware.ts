import { NextFunction, Response } from 'express';
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from '../constants/app.constant';

// Middleware to check mobile number is passsed in body request
export const authCreateMiddleware = async (req:any, res: Response, next: NextFunction) => {
    if (req.body.contact) {
        return next();
    } else {
        return res.status(HTTP_REPONSE_STATUS.BAD_REQUEST).send(HTTP_REPONSE_STATUS_MESSAGE.BAD_REQUEST);
    }
};