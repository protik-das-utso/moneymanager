type StatCardProps = {
    type: 'income' | 'expense' | 'balance' | 'savings';
    label: string;
    value: string | number;
    percentage?: number;
    badge?: string;
    icon: React.ReactNode;
}

const StatCard = ({ type, label, value, percentage, badge, icon }: StatCardProps) =>{
    // Color schemes based on card type
    const colorSchemes = {
        income: 'bg-emerald-100 text-emerald-600',
        expense: 'bg-red-100 text-red-600',
        balance: 'bg-purple-100 text-purple-600',
        savings: 'bg-amber-100 text-amber-600'
    };

    const getBadgeColor = () => {
        if (percentage !== undefined) {
            return percentage >= 0 ? 'text-green-500' : 'text-red-500';
        }
        return 'text-gray-500';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header with icon and badge */}
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorSchemes[type]}`}>
                    {icon}
                </div>
                {percentage !== undefined && (
                    <span className={`text-sm font-semibold ${getBadgeColor()}`}>
                        {percentage >= 0 ? '+' : ''}{percentage}%
                    </span>
                )}
                {badge && (
                    <span className="text-sm font-medium text-gray-500">
                        {badge}
                    </span>
                )}
            </div>

            {/* Label and Value */}
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                    {typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}
                </p>
            </div>
        </div>
    )
}

export default StatCard;