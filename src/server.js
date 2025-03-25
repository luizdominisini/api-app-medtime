import cors from "cors";
import express from "express";
import router from "./routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on url: http://localhost:${PORT}`);
});
