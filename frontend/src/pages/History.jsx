import { useState, useEffect } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/health/history")
      .then((res) => {
        setHistory(res.data || []);
      })
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Health History</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-700">No health submissions found.</p>
        ) : (
          <table className="min-w-full text-left border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Result</th>
                <th className="py-2 px-4 border-b">Sleep</th>
                <th className="py-2 px-4 border-b">Stress</th>
                <th className="py-2 px-4 border-b">Appetite</th>
                <th className="py-2 px-4 border-b">Activity</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(h.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{h.status}</td>
                  <td className="py-2 px-4 border-b">{h.sleepQuality}</td>
                  <td className="py-2 px-4 border-b">{h.stressLevel}</td>
                  <td className="py-2 px-4 border-b">{h.appetite}</td>
                  <td className="py-2 px-4 border-b">{h.activityType}</td>
                </tr>
              ))}
              {history.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">
                    Sleep Quality vs Stress (Last 10 Records)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={history.slice(0, 10).reverse()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(str) =>
                          new Date(str).toLocaleDateString()
                        }
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sleepQuality" fill="#38bdf8" name="Sleep" />
                      <Bar dataKey="stressLevel" fill="#f59e42" name="Stress" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </tbody>
          </table>
        )}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Sleep Quality vs Stress (Last 10 Records)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={history.slice(0, 10).reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => new Date(str).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sleepQuality" fill="#38bdf8" name="Sleep" />
                <Bar dataKey="stressLevel" fill="#f59e42" name="Stress" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;