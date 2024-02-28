import axios from "axios";
import formData from 'form-data';
import { logError, logInfo, logWarning } from "./firebase-logger.helper";
import { IWAMessageReq } from "../models/codingmantra-ai/wa-message.model";
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from "../constants/app.constant";


export const sendCMWhatsappMessage = async (waMessageReq: IWAMessageReq): Promise<any> => {
    if (process.env.CODINGMANTRA_AI_APP_KEY && process.env.CODINGMANTRA_AI_AUTH_KEY){
        let data = new formData();
        data.append('appkey', process.env.CODINGMANTRA_AI_APP_KEY);
        data.append('authkey', process.env.CODINGMANTRA_AI_AUTH_KEY);

        data.append('to', waMessageReq.to);

        if (waMessageReq.message) {
            data.append('message', waMessageReq.message);
        }

        if (waMessageReq.file) {
            data.append('file', waMessageReq.file);
        }

        if (waMessageReq.template_id) {
            data.append('template_id', waMessageReq.template_id);
            if (waMessageReq.template_variables) {
                waMessageReq.template_variables.forEach((variableValue, index) => {
                    data.append(`variables[{${index + 1}}]`, variableValue);
                });
            }
        }

        let res;
        try {
            res = await axios.post(process.env.CODINGMANTRA_AI_API_URL!, data);
            logInfo('Axios res', res);
            return {
                status:true
            }
        } catch (error) {
            logError('Axios Error', error);
            return {
                status: false,
                code: HTTP_REPONSE_STATUS.NOT_FOUND,
                message: HTTP_REPONSE_STATUS_MESSAGE.NOT_FOUND
            } 
        }
    } else {
        logWarning('No Authkey or API key found for CodingMantra AI for sending whatsapp messages.')
    }
}

