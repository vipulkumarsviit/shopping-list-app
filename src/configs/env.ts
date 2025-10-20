import dotenv from "dotenv";

// Configure environment variables at the earliest possible moment
dotenv.config();

// Export configured environment variables with types and default values
export const env = {
  PORT: process.env.PORT || "3000",
  MODE: process.env.MODE || "mongoose",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/shopping-list"
} as const;