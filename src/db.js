import mongoose from "mongoose";

// connect to SchoolShootingDB
export async function connectDB(uri, dbName) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName });
  console.log("MongoDB connected:", dbName);
}
