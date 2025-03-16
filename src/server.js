import express from "express";
import router from "./routes/index.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is11 running on url: http://localhost:${PORT}`);
});
