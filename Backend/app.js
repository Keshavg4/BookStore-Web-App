import express from "express";
import "dotenv/config";
import dbConnect from "./dbConnect.js";
import { Book } from "./models/bookModel.js";
import { StatusCodes } from "http-status-codes";
import bookRoute from "./Routes/bookRoute.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server is started....");
    });
  } catch (error) {
    console.log(error);
  }
};
start();

app.use(express.static("public"));
app.use(bookRoute);

app.get("*", (req, res) => {
  res.send("How May i help you ?");
});
