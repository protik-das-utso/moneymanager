// Demo data for Income vs Expense Chart
// Weekly aggregation with cumulative values (running totals)

export const incomeVsExpenseData = [
    {
        date: "JAN 01",
        income: 1200,
        expense: 650
    },
    {
        date: "JAN 08", 
        income: 2800,
        expense: 1350
    },
    {
        date: "JAN 15",
        income: 4500,
        expense: 2100
    },
    {
        date: "JAN 22",
        income: 5800,
        expense: 2850
    },
    {
        date: "JAN 29",
        income: 6700,
        expense: 3524
    }
];

// Stats card demo data
export const statsData = {
    totalIncome: 6700.00,
    totalExpenses: 3524.00,
    netBalance: 3176.00,
    savingsRate: 47
};

// Weekly spending data for bar chart
export const weeklySpendingData = [
    { day: "MON", amount: 850, dayIndex: 1 },
    { day: "TUE", amount: 1200, dayIndex: 2 },
    { day: "WED", amount: 980, dayIndex: 3 },
    { day: "THU", amount: 1450, dayIndex: 4 },
    { day: "FRI", amount: 1520, dayIndex: 5 },
    { day: "SAT", amount: 750, dayIndex: 6 },
    { day: "SUN", amount: 620, dayIndex: 0 }
];

// Savings goal data
export const vacationSavingsGoalData = {
    goalName: "Vacation Fund",
    currentAmount: 3200,
    goalAmount: 5000,
    percentageReached: 64,
    amountLeft: 1800
};

// Category configuration with icons and colors
export const categoryConfig = {
    salary: {
        iconName: 'briefcase',
        bgColor: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
    },
    freelance: {
        iconName: 'file-lines',
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    groceries: {
        iconName: 'utensils',
        bgColor: 'bg-orange-100',
        iconColor: 'text-orange-600'
    },
    transport: {
        iconName: 'car',
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600'
    },
    shopping: {
        iconName: 'shopping-bag',
        bgColor: 'bg-pink-100',
        iconColor: 'text-pink-600'
    },
    bills: {
        iconName: 'file-invoice-dollar',
        bgColor: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
    },
    entertainment: {
        iconName: 'film',
        bgColor: 'bg-indigo-100',
        iconColor: 'text-indigo-600'
    },
    investment: {
        iconName: 'chart-line',
        bgColor: 'bg-teal-100',
        iconColor: 'text-teal-600'
    }
};

// Recent transactions dummy data
export const recentTransactionsData = [
    {
        id: 1,
        title: "Monthly Salary",
        description: "Corporate Inc",
        date: "Jan 29, 2026",
        amount: 5200.00,
        type: "income",
        categoryKey: "salary"
    },
    {
        id: 2,
        title: "Freelance Project",
        description: "UI Design",
        date: "Jan 29, 2026",
        amount: 1500.00,
        type: "income",
        categoryKey: "freelance"
    },
    {
        id: 3,
        title: "Groceries",
        description: "SuperMart",
        date: "Jan 28, 2026",
        amount: 125.40,
        type: "expense",
        categoryKey: "groceries"
    },
    {
        id: 4,
        title: "Uber Ride",
        description: "Transport",
        date: "Jan 28, 2026",
        amount: 24.50,
        type: "expense",
        categoryKey: "transport"
    },
    {
        id: 5,
        title: "Netflix Subscription",
        description: "Entertainment",
        date: "Jan 27, 2026",
        amount: 15.99,
        type: "expense",
        categoryKey: "entertainment"
    },
    {
        id: 6,
        title: "Online Shopping",
        description: "Amazon",
        date: "Jan 26, 2026",
        amount: 89.50,
        type: "expense",
        categoryKey: "shopping"
    }
];

// Budget progress data
export const budgetProgressData = [
    {
        id: 1,
        category: "Food & Dining",
        spent: 680,
        budget: 800,
        color: "bg-amber-500",
        bgColor: "bg-amber-100"
    },
    {
        id: 2,
        category: "Transportation",
        spent: 245,
        budget: 300,
        color: "bg-indigo-500",
        bgColor: "bg-indigo-100"
    },
    {
        id: 3,
        category: "Shopping",
        spent: 420,
        budget: 400,
        color: "bg-rose-500",
        bgColor: "bg-rose-100",
        exceeded: true,
        exceededBy: 20
    },
    {
        id: 4,
        category: "Utility Bills",
        spent: 380,
        budget: 500,
        color: "bg-emerald-500",
        bgColor: "bg-emerald-100"
    }
];
