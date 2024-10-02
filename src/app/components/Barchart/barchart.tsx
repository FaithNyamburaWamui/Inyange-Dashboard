import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Define the structure of the data object
interface BarChartData {
  [key: string]: string | number;  // This allows flexibility in data fields for both string and number types
}

// Define the props for the component with a specific data type
interface BarChartComponentProps {
  data: BarChartData[];  // The data is an array of BarChartData objects
  xAxisKey: string;
  barDataKey: string;
  title: string;
  barColor?: string;
  yAxisLabel?: string; 
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data, xAxisKey, barDataKey, title, barColor = '#8884d8', yAxisLabel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 md:mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#666' }} 
            tickLine={false} 
          />
          <YAxis
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#666' }} 
            tickLine={false}
            label={{
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft', 
              offset: -5, 
              style: { textAnchor: 'middle', fill: '#666', fontSize: '12px' }, 
            }}
          />
          <Tooltip />
          <Bar dataKey={barDataKey} fill={barColor} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
