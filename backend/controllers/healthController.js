import Health from "../models/Health.js";

// Mock health analysis logic
function getHealthResult({
  sleepQuality,
  appetite,
  stressLevel,
  activityType,
}) {
  if (sleepQuality < 4 && stressLevel > 7) {
    return {
      status: "High stress detected",
      recommendation:
        "Try relaxation and meditation. 7+ hours of sleep recommended.",
    };
  }
  if (appetite === "Poor" || sleepQuality < 5) {
    return {
      status: "Unbalanced",
      recommendation: "Focus on improving sleep and eating habits.",
    };
  }
  if (activityType === "Sedentary" && stressLevel > 6) {
    return {
      status: "Mild stress detected",
      recommendation: "Increase daily activity; take short walks and breaks.",
    };
  }
  return {
    status: "Balanced",
    recommendation: "Keep up healthy routines!",
  };
}

export const submitHealth = async (req, res) => {
  try {
    const { sleepQuality, appetite, stressLevel, activityType } = req.body;
    if (!sleepQuality || !appetite || !stressLevel || !activityType) {
      return res.status(400).json({ message: "All fields required." });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    // Mock analysis logic
    const result = getHealthResult({
      sleepQuality,
      appetite,
      stressLevel,
      activityType,
    });

    // Save submission in DB
    const record = await Health.create({
      user: userId,
      sleepQuality,
      appetite,
      stressLevel,
      activityType,
      ...result,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error submitting health form." });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized." });

    // Optional: support query params for search/filter
    const { resultType, fromDate, toDate } = req.query;
    let query = { user: userId };
    if (resultType) query.status = resultType;
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const history = await Health.find(query)
      .sort({ date: -1 }) // Latest first
      .select("-__v")
      .lean();

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching history." });
  }
};