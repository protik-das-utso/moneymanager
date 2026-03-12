"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { budgetProgressData } from '../../../lib/data';

const BudgetProgress = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm col-span-1">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Budget Progress
                </h2>
            </div>

            {/* Budget List */}
            <div className="space-y-6">
                {budgetProgressData.map((budget) => {
                    const percentage = Math.min((budget.spent / budget.budget) * 100, 100);
                    const isExceeded = budget.exceeded || false;

                    return (
                        <div key={budget.id}>
                            {/* Category and Amount */}
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {budget.category}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    ${budget.spent} / ${budget.budget}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className={`w-full h-2 ${budget.bgColor} rounded-full overflow-hidden`}>
                                    <div 
                                        className={`h-full ${budget.color} rounded-full transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Exceeded Warning */}
                            {isExceeded && budget.exceededBy && (
                                <div className="flex items-center gap-1.5 mt-2">
                                    <FontAwesomeIcon 
                                        icon={faExclamationTriangle} 
                                        className="text-rose-500 text-xs"
                                    />
                                    <p className="text-xs font-semibold text-rose-500 uppercase">
                                        Budget exceeded by ${budget.exceededBy}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Manage Budgets Button */}
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-all">
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className="text-gray-600 text-sm"
                />
                <span className="text-sm font-medium text-gray-600">
                    Manage Budgets
                </span>
            </button>
        </div>
    );
};

export default BudgetProgress;
