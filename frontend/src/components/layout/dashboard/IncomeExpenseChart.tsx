"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { incomeVsExpenseData } from '../../../lib/data';

const IncomeExpenseChart = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Header with Legend */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Income vs Expense
                    </h2>
                    <p className="text-sm text-gray-500">
                        Cash flow analysis for the current month
                    </p>
                </div>
                
                {/* Custom Legend */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-gray-700">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-gray-700">Expenses</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                    data={incomeVsExpenseData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#f1f5f9" 
                        vertical={false}
                    />
                    
                    <XAxis 
                        dataKey="date" 
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
                        formatter={(value) => value ? `৳${Number(value).toLocaleString()}` : '৳0'}
                        labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                    
                    <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Income"
                        fill="url(#incomeGradient)"
                    />
                    
                    <Line 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Expenses"
                        fill="url(#expenseGradient)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IncomeExpenseChart;
