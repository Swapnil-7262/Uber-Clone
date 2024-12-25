import {Router} from "express"
import { getUserProfile, logoutUser, userLogin, userRegister } from "../controllers/user.controllers.js"
import { authUser } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/logout").get(authUser, logoutUser )
router.route("/profile").get(authUser, getUserProfile )

export default router