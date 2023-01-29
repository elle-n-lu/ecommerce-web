import mongoose from "mongoose";
import "dotenv-safe/config";

const dbcommect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err.message);
  }
};

export default dbcommect;
