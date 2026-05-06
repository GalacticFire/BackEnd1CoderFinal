import mongoose from "mongoose";
import {config} from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error de conexión: ", error.message);
    process.exit(1);
  }
};