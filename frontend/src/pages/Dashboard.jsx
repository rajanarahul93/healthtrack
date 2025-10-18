import { useState } from "react";
import api from "../services/api";

const activityTypes = [
  { value: "", label: "Select Activity Type" },
  { value: "Sedentary", label: "Sedentary" },
  { value: "Moderate", label: "Moderate" },
  { value: "Active", label: "Active" },
];

const Dashboard = () => {
  const [form, setForm] = useState({
    sleepQuality: "",
    appetite: "",
    stressLevel: "",
    activityType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Submit health form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (
      !form.sleepQuality ||
      !form.appetite ||
      !form.stressLevel ||
      !form.activityType
    ) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/health", form);
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-3">Health Assessment</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sleep Quality */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Sleep Quality{" "}
              <span className="text-gray-400 text-xs">(1–10)</span>
            </label>
            <input
              type="number"
              name="sleepQuality"
              min="1"
              max="10"
              value={form.sleepQuality}
              onChange={handleChange}
              className="input-field"
              required
              disabled={loading}
            />
          </div>

          {/* Appetite */}
          <div>
            <label className="block text-sm font-medium mb-2">Appetite</label>
            <select
              name="appetite"
              value={form.appetite}
              onChange={handleChange}
              className="input-field"
              required
              disabled={loading}
            >
              <option value="">Choose</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Stress Level <span className="text-gray-400 text-xs">(1–10)</span>
            </label>
            <input
              type="number"
              name="stressLevel"
              min="1"
              max="10"
              value={form.stressLevel}
              onChange={handleChange}
              className="input-field"
              required
              disabled={loading}
            />
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Activity Type
            </label>
            <select
              name="activityType"
              value={form.activityType}
              onChange={handleChange}
              className="input-field"
              required
              disabled={loading}
            >
              {activityTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Show result after submission */}
      {result && (
        <div className="card bg-blue-50 border-blue-200 mt-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Your Health Result
          </h3>
          <p className="text-blue-800 font-medium">{result.status}</p>
          <div className="mt-3 text-blue-700 text-sm">
            {result.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;