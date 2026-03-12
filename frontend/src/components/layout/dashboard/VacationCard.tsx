import { vacationSavingsGoalData } from "@/src/lib/data";

const VacationCard = () => {
    return (
        <div>
               {/* vacation card */}
            <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl py-10 px-6 shadow-lg min-w-87.5 h-full flex flex-col justify-between relative overflow-hidden z-10">
                {/* Decorative circles */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-700/20 rounded-full"></div>
                <div className="absolute -right-4 top-20 w-32 h-32 bg-indigo-400/10 rounded-full"></div>
                
                <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="6" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className="text-white text-lg font-semibold">
                            {vacationSavingsGoalData.goalName}
                        </h3>
                    </div>

                    {/* Amount Display */}
                    <div className="mb-2">
                        <p className="text-white text-4xl font-bold">
                            ${vacationSavingsGoalData.currentAmount.toLocaleString()} / ${vacationSavingsGoalData.goalAmount.toLocaleString()}
                        </p>
                    </div>

                    {/* Percentage */}
                    <p className="text-indigo-100 text-sm mb-6">
                        {vacationSavingsGoalData.percentageReached}% of goal reached
                    </p>

                    {/* Progress Bar */}
                    <div className="relative">
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${vacationSavingsGoalData.percentageReached}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Amount Left Badge */}
                <div className="relative z-10 flex justify-end">
                    <div className="bg-indigo-700/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <p className="text-white text-sm font-medium">
                            ${vacationSavingsGoalData.amountLeft.toLocaleString()} left to go
                        </p>
                    </div>
                </div>
            </div>   
        </div>
)}

export default VacationCard;