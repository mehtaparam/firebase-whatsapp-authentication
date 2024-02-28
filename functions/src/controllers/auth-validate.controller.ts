import * as admin from 'firebase-admin';
import { sendSuccessWAMessage } from './auth-wa-message.controller';
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from '../constants/app.constant';

const AUTH_REQ_COLLECTION_NAME = 'authRequests';

export const validateOTPRequest= async (req: any): Promise<any> => {
    const db = admin.firestore();

    // Store the new Auth Request
    const data = await db.collection(AUTH_REQ_COLLECTION_NAME).doc(req.id).get();
    if(data.exists){
        const storedData = data.data();
        if (storedData?.otp == req.body.otp){
            await sendSuccessWAMessage(storedData?.contact);
            return {
                status:true,
                data:{
                    authId:req.id
                },
                code: HTTP_REPONSE_STATUS.SUCCESS,
                message: HTTP_REPONSE_STATUS_MESSAGE.SUCCESS
            }
        } else {
            return {
                status: false,
                code: HTTP_REPONSE_STATUS.UNAUTHORISED,
                message: HTTP_REPONSE_STATUS_MESSAGE.UNAUTHORISED
            }
        }
    } else {
        return {
            status: false,
            code: HTTP_REPONSE_STATUS.NOT_FOUND,
            message: HTTP_REPONSE_STATUS_MESSAGE.NOT_FOUND
        }
    }
}