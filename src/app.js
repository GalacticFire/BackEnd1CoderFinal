import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import { apiRouter, viewRouter } from "./routes/index.js";
import __dirname from "./utils/path.js";

connectDB();

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", apiRouter);
app.use("/", viewRouter);

app.listen(config.port, () => {
  console.log(`Server escuchando en:`, config.port);
});
