

import Filters from "./Filters";
import StatCardSection from "./StatCardSection";
import IncomeExpenseChart from "./IncomeExpenseChart";
import WeeklySpendingChart from "./WeeklySpendingChart";
import VacationCard from "./VacationCard";
import RecentTransactions from "./RecentTransactions";
import BudgetProgress from "./BudgetProgress";


const DashboardIndex = () => {
    return (
    <div className="bg-[#F1F5F9] flex-1 overflow-y-auto px-6 py-6">
        
        <Filters />
        
        <StatCardSection />
        
        {/* Income vs Expense Chart */}
        <div className="mt-6">
            <IncomeExpenseChart />
        </div>
        
        {/* Weekly Spending Chart */}
        <div className="mt-6 flex gap-6">
            <WeeklySpendingChart />
            <VacationCard />
        </div>
        
        {/* Recent Transactions & Budget Progress */}
        <div className="mt-6 grid grid-cols-3 gap-6 items-start">
            <RecentTransactions />
            <BudgetProgress />
        </div>
        
    </div>
    )
}

export default DashboardIndex;