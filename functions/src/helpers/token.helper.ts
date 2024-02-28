
import jwt from "jsonwebtoken";
import { logWarning } from "./firebase-logger.helper";

export const encryptToken = (tokenData: any): string | null => {
    try {
        return jwt.sign(tokenData, process.env.AUTH_SECRET_KEY!, { expiresIn: (+(process.env.OTP_EXPIRE_MINUTES ?? 3) * 60) });
    } catch (error) {
        logWarning('TOKEN_CREATE_ERROR', error);
        return null;
    }
}

export const decryptToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.AUTH_SECRET_KEY!);
    } catch (error) {
        logWarning('TOKEN_DECRYPT_ERROR', error);
        return null;
    }
}
