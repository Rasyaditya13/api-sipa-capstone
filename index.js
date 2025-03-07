import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/web.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });