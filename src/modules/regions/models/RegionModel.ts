import mongoose, { Schema, Document } from "mongoose";

export interface Region extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  coordinates: {
    type: string;
    coordinates: number[][][];
  };
}

const RegionSchema = new Schema<Region>({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coordinates: {
    type: { type: String, enum: ["Polygon"], required: true },
    coordinates: { type: [[[Number]]], required: true },
  },
});

RegionSchema.index({ coordinates: "2dsphere" });

export const RegionModel = mongoose.model<Region>("Region", RegionSchema);
