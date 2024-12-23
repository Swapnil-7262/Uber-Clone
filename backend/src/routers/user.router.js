import {Router} from "express"
import { getUserProfile, logoutUser, userLogin, userRegister } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/logout").get(verifyJWT, logoutUser )
router.route("/profile").get(verifyJWT, getUserProfile )

export default router