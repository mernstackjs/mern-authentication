import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import { dbConnected } from "./utility/db.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: `Api is running on ${PORT} port`,
  });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
dbConnected();
