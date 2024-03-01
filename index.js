import express from "express";
import "dotenv/config";
import { indexRouter } from "./routes/index.routes.js";
import mongoose from "mongoose";
import cors from "cors";

const whiteList = [
  "http://localhost:5173",
  "https://calendar-app-art.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};
const app = express();

const PORT = process.env.PORT;

mongoose.connect(
  process.env.MONGO_DB_CONNECT,
  console.log("Connected to MongoDB")
);

//Middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", indexRouter);

//Listen petitions
app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));
