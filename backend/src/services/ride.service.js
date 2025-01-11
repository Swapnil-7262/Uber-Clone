import { Ride } from "../models/ride.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getAddressCoordinate, getDistanceTimes } from "./maps.service.js"
import crypto from "crypto"

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new ApiError(400, "Pickup and Destination are required")
    }

    const pickUp = await getAddressCoordinate(pickup)
    const drop = await getAddressCoordinate(destination)
    console.log(pickUp);
    console.log(drop);
    
    
    const distanceTime = await getDistanceTimes(pickUp, drop)

    console.log(distanceTime);
    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.lengthInMeters / 1000) * perKmRate.auto) + ((distanceTime.travelTimeInSeconds / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.lengthInMeters / 1000) * perKmRate.car) + ((distanceTime.travelTimeInSeconds / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.lengthInMeters / 1000) * perKmRate.moto) + ((distanceTime.travelTimeInSeconds/ 60) * perMinuteRate.moto))
    };

    console.log(fare);
    

    return fare;

}




const createRides = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new ApiError(404, "All fiedls are requried")
    }

    const fare = await getFare(pickup, destination)

    const ride = Ride.create({
        user, 
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6)
    })

    return ride;
}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

export {createRides}
