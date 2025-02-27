import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo URI is missing");
}

declare global {
  var mongooseConnection: any;
}

const connectDB = async () => {
  if (global.mongooseConnection) {
    console.log("Conexion a mongodb establecida");
    return global.mongooseConnection;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
  
    global.mongooseConnection = conn;
    return conn;
  } catch (error: any) {
    console.error(`❌ ERROR: ${error.message}`);
    process.exit(1);
  }
};


export default connectDB;