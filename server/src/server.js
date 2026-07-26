import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
