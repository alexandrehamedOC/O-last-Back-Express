import { Router } from 'express';
import profilRouter from './profil.router.js';


export const router = Router();
app.use('/api/v1', profilRouter);

export default router;