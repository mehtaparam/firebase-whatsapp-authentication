import { IWAMessageReq } from '../models/codingmantra-ai/wa-message.model';
import { sendCMWhatsappMessage } from "../helpers/codingmantra-ai.helper";


// This method will be used to send confirmation message to customer for their payment
export const sendOTPWAMessage = async (contact:string,otp:string | number): Promise<any> => {
        const waMessageReq: IWAMessageReq = {} as IWAMessageReq;
        waMessageReq.to = contact;
        waMessageReq.message = `
        Your otp is ${otp}`
        return await sendCMWhatsappMessage(waMessageReq)
}

// This method will be used to send success message after authentication
export const sendSuccessWAMessage = async (contact: string): Promise<any> => {
        const waMessageReq: IWAMessageReq = {} as IWAMessageReq;
        waMessageReq.to = contact;
        waMessageReq.message = `
        Congratulations your authentication completed`
        return await sendCMWhatsappMessage(waMessageReq);
}
