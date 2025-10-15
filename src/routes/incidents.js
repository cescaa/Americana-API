import express from "express";
import { Incidents } from "../models/incident.js";

const incidentsRouter = express.Router();

// replace _id with id for cleaner code;
// When res.json(...) runs, properties with "undefined" are omitted, so _id disappears from the output
const withId = (doc) => ({ id: doc._id.toString(), ...doc, _id: undefined });

incidentsRouter.get("/", async (req, res) => {
  try {
    // set num of results limit
    const limit = Math.min(parseInt(req.query.limit || "30", 10), 100);
    const offset = parseInt(req.query.offset || "0", 10);

    // create filter object
    const filter = {};

    // declare filter params for state
    if (req.query.state) filter.State = req.query.state;

    // date range
    if (req.query.startdate || req.query.enddate) {
      filter.Date = {};
      if (req.query.startdate) filter.Date.$gte = new Date(req.query.startdate);
      if (req.query.enddate) filter.Date.$lte = new Date(req.query.enddate);
    }

    // returns a single promise when all promises are fulfilled
    const [rows, total] = await Promise.all([
      Incidents.find(filter)
        .sort({ Date: -1, _id: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Incidents.countDocuments(filter),
    ]);

    // pass each doc of each row to withId
    const data = rows.map((doc) => {
      return withId(doc);
    });

    res.json({ data, total, limit, offset });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default incidentsRouter;
