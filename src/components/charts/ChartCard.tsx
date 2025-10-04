import React from 'react';
import Card from '../ui/Card';
import type { ChartData } from '../../types';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: ChartData[];
  type: 'bar' | 'pie';
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, data, type, height = 300 }) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <div style={{ height }} className="flex items-end justify-between space-x-2 p-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t"
                style={{
                  height: `${(item.value / Math.max(...data.map(d => d.value))) * (height - 60)}px`,
                  backgroundColor: item.color || COLORS[index % COLORS.length]
                }}
              ></div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {item.name}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'pie') {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = 0;

      return (
        <div style={{ height }} className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const angle = (percentage / 100) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                currentAngle += angle;

                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                const largeArcFlag = angle > 180 ? 1 : 0;

                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');

                return (
                  <path
                    key={item.name}
                    d={pathData}
                    fill={item.color || COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
          <div className="ml-8 space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-medium text-gray-900">
                  {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card title={title} subtitle={subtitle}>
      {renderChart()}
    </Card>
  );
};

export default ChartCard;