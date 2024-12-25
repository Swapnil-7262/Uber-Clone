import Router from "express"
import { captainLogin, captainRegister, captainLogout, getCaptainProfile } from "../controllers/captain.controllers.js"
import { authCaptain } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(captainRegister)
router.route("/login").post(captainLogin)
router.route("/logout").get(authCaptain, captainLogout)
router.route("/profile").get(authCaptain, getCaptainProfile)

export default router