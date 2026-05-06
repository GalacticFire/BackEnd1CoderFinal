import express from "express";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import apiRouter from "./routes/index.js";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.listen(config.port, () => {
  console.log(`Server escuchando en:`, config.port);
});
