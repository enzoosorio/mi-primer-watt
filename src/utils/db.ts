import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo URI is missing");
}

// Evitar `declare global` y usar una variable en `globalThis`
const globalWithMongoose = globalThis as unknown as { mongooseConnection?: Mongoose };

const connectDB = async (): Promise<Mongoose> => {
  if (globalWithMongoose.mongooseConnection) {
    console.log("✅ Using existing MongoDB connection");
    return globalWithMongoose.mongooseConnection;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);

    globalWithMongoose.mongooseConnection = conn; // Almacenar conexión en globalThis
    return conn;
  } catch (error: unknown) {
    console.error(`❌ ERROR: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
