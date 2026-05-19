import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import handlebars from "express-handlebars";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import { apiRouter, viewRouter } from "./routes/index.js";
import { __dirname, handlebarsHelpers } from "./utils/index.js";

connectDB();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.engine("handlebars", handlebars.engine({ helpers: handlebarsHelpers }));
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", apiRouter);
app.use("/", viewRouter);

httpServer.listen(config.port, () => {
  console.log(`Server HTTP + Sockets escuchando en:`, config.port);
});
