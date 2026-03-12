"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBriefcase, 
    faFileLines, 
    faUtensils, 
    faCar, 
    faShoppingBag,
    faFileInvoiceDollar,
    faFilm,
    faChartLine,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { recentTransactionsData, categoryConfig } from '../../../lib/data';

// Icon mapping for FontAwesome
const iconMap: Record<string, IconDefinition> = {
    'briefcase': faBriefcase,
    'file-lines': faFileLines,
    'utensils': faUtensils,
    'car': faCar,
    'shopping-bag': faShoppingBag,
    'file-invoice-dollar': faFileInvoiceDollar,
    'film': faFilm,
    'chart-line': faChartLine
};

const RecentTransactions = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm col-span-1 lg:col-span-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Recent Transactions
                </h2>
                <button className="text-indigo-600 text-base font-medium hover:text-indigo-700 transition-colors">
                    View All
                </button>
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
                {recentTransactionsData.map((transaction) => {
                    const category = categoryConfig[transaction.categoryKey as keyof typeof categoryConfig];
                    const icon = iconMap[category.iconName];
                    const isIncome = transaction.type === 'income';

                    return (
                        <div 
                            key={transaction.id}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                                <FontAwesomeIcon 
                                    icon={icon} 
                                    className={`${category.iconColor} text-lg`}
                                />
                            </div>

                            {/* Transaction Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-gray-900 truncate">
                                    {transaction.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {transaction.description} • {transaction.date}
                                </p>
                            </div>

                            {/* Amount */}
                            <div className="text-right shrink-0">
                                <p className={`text-base font-bold ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isIncome ? '+' : '-'}৳{transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentTransactions;
