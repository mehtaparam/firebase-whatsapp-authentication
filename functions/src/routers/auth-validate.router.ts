import express from 'express';
import { validateOTPRequest } from '../controllers/auth-validate.controller';
const router = express.Router();

// Login
router.post('/', async (req, res) => {
    const validateRes = await validateOTPRequest(req);

    return res.status(validateRes.code).json(
        validateRes
    );

});


export default router;
