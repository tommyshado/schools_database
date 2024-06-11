import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/SchoolSystemRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api", router);
app.listen(PORT, () => console.log("🚀 Schools Database started @:", PORT));