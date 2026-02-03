'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TeamPerformance() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Mock monthly performance data
    // In production, fetch from Notion with date filters
    const mockData = [
      { month: 'Oct', 'Supervisor A': 85, 'Supervisor B': 78, 'Staff 1': 92, 'Staff 2': 76, 'Staff 3': 88, 'Staff 4': 71, 'Staff 5': 83 },
      { month: 'Nov', 'Supervisor A': 88, 'Supervisor B': 82, 'Staff 1': 90, 'Staff 2': 79, 'Staff 3': 85, 'Staff 4': 74, 'Staff 5': 87 },
      { month: 'Dec', 'Supervisor A': 91, 'Supervisor B': 85, 'Staff 1': 94, 'Staff 2': 82, 'Staff 3': 89, 'Staff 4': 78, 'Staff 5': 90 },
      { month: 'Jan', 'Supervisor A': 87, 'Supervisor B': 88, 'Staff 1': 91, 'Staff 2': 85, 'Staff 3': 91, 'Staff 4': 81, 'Staff 5': 88 },
    ];
    setData(mockData);
  }, []);

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mb-8">
        <a href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
          ← Back to Dashboard
        </a>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📈 Team Performance Trends
        </h1>
        <p className="text-gray-600">
          Monthly grade tracking across all team members
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            {data.length > 0 && Object.keys(data[0])
              .filter(key => key !== 'month')
              .map((member, index) => (
                <Line
                  key={member}
                  type="monotone"
                  dataKey={member}
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Table */}
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Member</th>
              {data.map(d => (
                <th key={d.month} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  {d.month}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Avg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 && Object.keys(data[0])
              .filter(key => key !== 'month')
              .map((member, idx) => {
                const scores = data.map(d => d[member]);
                const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
                return (
                  <tr key={member} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{member}</td>
                    {scores.map((score, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          score >= 85 ? 'bg-green-100 text-green-800' :
                          score >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {score}
                        </span>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center font-bold text-lg">{avg}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
