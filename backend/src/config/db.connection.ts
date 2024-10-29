import "dotenv/config";
import mongoose from "mongoose";

const URI: string = process.env.DB_URI || "YOUR URI CONNECTION TO MONGO_DB";

const connection = async () => {
  try {
    return await mongoose.connect(URI, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default connection;
