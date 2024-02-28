import { sendOTPWAMessage } from './auth-wa-message.controller';
import { getNewFireStoreID } from './../helpers/firestore.helper';
import * as admin from 'firebase-admin';
import { createRandomOTP } from '../helpers/app.helper';
import { encryptToken } from '../helpers/token.helper';
import { logInfo } from '../helpers/firebase-logger.helper';
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from '../constants/app.constant';

const AUTH_REQ_COLLECTION_NAME = 'authRequests';

export const createAuthRequest= async (reqBody: any): Promise<any> => {
    const contact = reqBody.contact;
    if (contact) {
        // Store Auth Request
        return await storeAuthRequest(contact);
    } else {
        return null
    }
}

export const storeAuthRequest = async (contact: string): Promise<any> => {
    const randomOTP = createRandomOTP();
    const waResult = await sendOTPWAMessage(contact, randomOTP);
    logInfo('waResult', waResult);
    if(waResult.status){
        const id = getNewFireStoreID(AUTH_REQ_COLLECTION_NAME);
        const db = admin.firestore();

        // Store the new Auth Request
        db.collection(AUTH_REQ_COLLECTION_NAME).doc(id).set({
            otp: randomOTP,
            id: id,
            contact,
            createdAt: new Date()
        }, { merge: true });

        return {
            status: true,
            token: encryptToken({ id }),
            code: HTTP_REPONSE_STATUS.SUCCESS,
            message: HTTP_REPONSE_STATUS_MESSAGE.SUCCESS
        } 
    } else {
        return {
            status: false,
            code: HTTP_REPONSE_STATUS.BAD_REQUEST,
            message: HTTP_REPONSE_STATUS_MESSAGE.INVALID_WHATSAPP_NUMBER
        }
    }
}
