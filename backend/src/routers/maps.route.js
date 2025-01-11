import Router from "express"
import { authUser } from "../middlewares/auth.middleware.js"
import { getCoordinate } from "../controllers/maps.controllers.js"
import { getDistanceTime } from "../controllers/maps.controllers.js"
import { getAutoSuggestions } from "../controllers/maps.controllers.js"

const router = Router()

router.route("/get-coordinate").get(authUser, getCoordinate )
router.route("/get-distance-time").get(authUser, getDistanceTime)
router.route("/get-auto-suggest").get(authUser, getAutoSuggestions )

export default router