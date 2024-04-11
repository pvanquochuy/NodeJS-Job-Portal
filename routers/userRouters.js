import express from 'express'
import { updateUserController } from '../controllers/userController.js'
import userAuth from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

// routers
// GET USERS || GET

// UPDATE USER || PUT
router.put('/update-user' ,updateUserController)

export default router