import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NoiseChart = ({ noiseHistory }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Mức độ tiếng ồn theo thời gian thực
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={noiseHistory}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb" // Màu lưới sáng
              strokeOpacity={0.5}
              className="dark:[&>line]:stroke-gray-600" // Màu lưới tối
            />
            <XAxis
              dataKey="time"
              stroke="#6b7280" // Màu chữ trục X sáng
              className="dark:[&>text]:stroke-white" // Màu chữ trục X tối
            />
            <YAxis
              stroke="#6b7280" // Màu chữ trục Y sáng
              className="dark:[&>text]:stroke-white" // Màu chữ trục Y tối
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff', // Màu nền tooltip sáng
                border: '1px solid #e5e7eb',
                color: '#000',
              }}
              wrapperClassName="dark:[&>div]:bg-gray-900 dark:[&>div]:border-gray-700 dark:[&>div]:text-white" // Tooltip tối
            />
            <Legend
              wrapperStyle={{
                color: '#6b7280', // Màu chữ legend sáng
              }}
              className="dark:[&>div>svg]:text-white dark:[&>div]:text-white" // Legend tối
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6" // Màu đường sáng
              strokeWidth={2}
              name="Mức độ tiếng ồn (dB)"
              className="dark:[&>path]:stroke-blue-400" // Màu đường tối
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NoiseChart;