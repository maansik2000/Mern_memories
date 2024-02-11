import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoute from "./routes/post.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/posts", postRoute);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to our memories api");
});

mongoose
  .connect(
    "mongodb+srv://mansisarkar:JjIoxfbQvEKbCdWP@cluster0.5qcu97y.mongodb.net/cluster0?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`server is up and running at ${PORT}`))
  )
  .catch((err) => console.log(err.message));
