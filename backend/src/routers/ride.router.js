import Router from "express"
import { authUser } from "../middlewares/auth.middleware.js"
import { createRide, fare } from "../controllers/ride.controllers.js"

const router = Router()

router.route("/create").post(authUser,createRide )
router.route("/get-fare").get(authUser, fare)

export default router