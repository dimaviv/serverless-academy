import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = new Router();


// Auth
router.post('/auth/sign-up', userController.registration)
router.post('/auth/sign-in', userController.login)

router.post('/auth/refresh', userController.refreshAccessToken)


// User
router.get('/me', authMiddleware, userController.getCurrentUser)




export default router;