import { NextFunction, Response } from 'express';
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from '../constants/app.constant';
import { decryptToken } from '../helpers/token.helper';

// Middleware to authenticate user based on the token
export const authValidateMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const body = req.body;
    if (body.token && body.otp) {
        try {
            const data = decryptToken(body.token);
            req.id = data.id
            return next();
        } catch (error) {
            return res.status(HTTP_REPONSE_STATUS.UNAUTHORISED).send(HTTP_REPONSE_STATUS_MESSAGE.UNAUTHORISED);
        }
    } else {
        return res.status(HTTP_REPONSE_STATUS.BAD_REQUEST).send(HTTP_REPONSE_STATUS_MESSAGE.BAD_REQUEST);
    }
};