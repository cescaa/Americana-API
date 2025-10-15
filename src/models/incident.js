import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
  {
    Incident_ID: String,

    // Date & parts
    Date: { type: Date, index: true, required: true },
    Year: Number,
    Month: Number,
    Day: Number,

    // Location / school
    School: { type: String, trim: true },
    City: { type: String, trim: true },
    State: { type: String, trim: true, match: /^[A-Za-z]{2}$/ },
    Zipcode: { type: String, trim: true },
    LAT: Number,
    LNG: Number,

    // Counts
    Victims_Killed: Number,
    Victims_Wounded: Number,
    Number_Victims: Number,
    Shooter_Killed: Number,
    Shots_Fired: Number,
    Duration_min: Number,

    // Flags
    Involves_Students_Staff: Boolean,
    Accomplice: Boolean,
    Hostages: Boolean,
    Barricade: Boolean,
    Officer_Involved: Boolean,
    Bullied: Boolean,
    Domestic_Violence: Boolean,
    Gang_Related: Boolean,
    Active_Shooter_FBI: Boolean,
    Preplanned: Boolean,

    // Text
    Summary: { type: String, trim: true },
    Narrative: { type: String, trim: true },
    Situation: { type: String, trim: true },
    GV_Type: { type: String, trim: true },
    Targets: { type: String, trim: true },
    Time_Period: { type: String, trim: true },
    First_Shot: { type: String, trim: true },
    Quarter: { type: String, trim: true },
    School_Level: { type: String, trim: true },
  },
  { collection: "Incidents" }
);

// Transform to nicer JSON: add id and remove _id + __v
// doc = original Mongoose document instance
// ret = plain JS object that Mongoose just created from doc and returned as JSON
IncidentSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export const Incidents = mongoose.model("Incidents", IncidentSchema);
