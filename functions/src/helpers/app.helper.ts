export const createRandomOTP = (otpLength: number = +(process.env.OTP_LENGTH!)) => {
    const otpAllowedCharOrNumber = process.env.OTP_ALLOWED_CHAR_OR_NUMBERS!;
    let randomOTP = '';
    for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * otpAllowedCharOrNumber.length);
        randomOTP += otpAllowedCharOrNumber[randomIndex];
    }
    return randomOTP;
}