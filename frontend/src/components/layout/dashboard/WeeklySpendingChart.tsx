"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklySpendingData } from '../../../lib/data';

const WeeklySpendingChart = () => {
    // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayIndex = new Date().getDay();

    // Custom bar color based on current day
    const getBarColor = (dayIndex: number) => {
        return dayIndex === currentDayIndex ? '#6366f1' : '#c7d2fe';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
            {/* Header */}
             
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Weekly Spending
                </h2>
                <p className="text-sm text-gray-500">
                    Daily spending breakdown for current week
                </p>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={250}>
                <BarChart 
                    data={weeklySpendingData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#f1f5f9" 
                        vertical={false}
                    />
                    
                    <XAxis 
                        dataKey="day" 
                        stroke="#94a3b8"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />
                    
                    <YAxis 
                        stroke="#94a3b8"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickFormatter={(value) => `৳${value}`}
                    />
                    
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value) => [`৳${Number(value).toLocaleString()}`, 'Spending']}
                        labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                        cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                    />
                    
                    <Bar 
                        dataKey="amount" 
                        fill="#c7d2fe"
                        radius={[8, 8, 0, 0]}
                        shape={(props) => {
                            const { x, y, width, height, payload } = props;
                            const barColor = getBarColor(payload.dayIndex);
                            return (
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill={barColor}
                                    rx={8}
                                    ry={8}
                                />
                            );
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
             

            
        </div>
    );
};

export default WeeklySpendingChart;
