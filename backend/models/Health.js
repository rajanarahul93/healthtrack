import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sleepQuality: { type: Number, required: true, min: 1, max: 10 },
    appetite: {
      type: String,
      enum: ["Good", "Average", "Poor"],
      required: true,
    },
    stressLevel: { type: Number, required: true, min: 1, max: 10 },
    activityType: {
      type: String,
      enum: ["Sedentary", "Moderate", "Active"],
      required: true,
    },
    status: { type: String, required: true },
    recommendation: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

healthSchema.index({ user: 1, date: -1 });

const Health = mongoose.model("Health", healthSchema);
export default Health;