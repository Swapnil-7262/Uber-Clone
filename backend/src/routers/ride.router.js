import Router from "express"
import { authUser } from "../middlewares/auth.middleware.js"
import { createRide } from "../controllers/ride.controllers.js"

const router = Router()

router.route("/create").post(authUser,createRide )

export default router