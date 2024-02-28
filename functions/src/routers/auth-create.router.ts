import express from 'express';
import { createAuthRequest } from '../controllers/auth-create.controller';
const router = express.Router();

// Login
router.post('/', async (req, res) => {
    const authTokenRes = await createAuthRequest(req.body);
    return res.status(authTokenRes.code).json(
        authTokenRes
    )
});


export default router;
