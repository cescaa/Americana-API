import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import incidentsRouter from "./routes/incidents.js";

const PORT = process.env.PORT || 3000;
const app = express(); // create server

app.use(cors()); // enable CORS for all origins
app.use(express.json()); // parse incoming requests with a JSON body into req.body
app.get("/health", (_req, res) => res.json({ ok: true })); // check server is running correctly

app.use(incidentsRouter);

// connect first, then start listening
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI, process.env.DB_NAME);
    app.listen(PORT, () =>
      console.log(`API running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
})();

// start server
//app.listen(port, () => console.log(`API on http://localhost:${port}`));
/*
connectDB(process.env.MONGODB_URI, process.env.DB_NAME).then(() => {
  app.listen(port, () => console.log(`API on http://localhost:${port}`));
});
*/
