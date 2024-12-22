import mongoose from "mongoose";
import {DB_NAME} from"../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB