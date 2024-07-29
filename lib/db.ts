import mongoose from "mongoose";

/**
 * Mongoose: Using Sring URI Format
 */
const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) throw new Error("Missing MONGO_URI environment variable inside `.env(.*).local`");

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: {
  conn: typeof mongoose|null;
  promise: Promise<typeof mongoose>|null;
} = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false
      })
      .then((instance) => instance)
  }
  try {
    cached.conn = await cached.promise;
    console.log("[INFO] Connected MongoDB");
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export default connectDB;