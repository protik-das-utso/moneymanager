"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const periods = ["Monthly", "Quarterly", "Yearly"] as const;
type Period = typeof periods[number];

const accountOptions = [
    "All Accounts", 
    "Checkings", 
    "Savings", 
    "Credit Cards"
];
const categoryOptions = [
    "All",
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Salary",
    "Freelance",
    "Investment",
];

interface DropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}

const Dropdown = ({ label, value, options, onChange }: DropdownProps) => (
    <div className="flex flex-col gap-1 min-w-45">
        <label className="text-xs font-medium text-gray-400 tracking-wide">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
            >
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
            <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3 text-gray-400 pointer-events-none"
            />
        </div>
    </div>
);

const Filters = () => {
    const [activePeriod, setActivePeriod] = useState<Period>("Monthly");
    const [account, setAccount] = useState("All Accounts");
    const [category, setCategory] = useState("All");

    return (
        <div className="bg-white rounded-xl px-6 py-4 flex items-end justify-between shadow-sm border border-gray-100">
            <div className="flex items-end gap-6">
                {/* Period toggle buttons */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-400 tracking-wide">Time Period</label>
                    <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                        {periods.map((p) => (
                            <button
                                key={p}
                                onClick={() => setActivePeriod(p)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                                    ${activePeriod === p
                                        ? "text-white shadow"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                style={activePeriod === p ? { background: "var(--primarycolor)" } : {}}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account dropdown */}
                <Dropdown label="Account" value={account} options={accountOptions} onChange={setAccount} />

                {/* Category dropdown */}
                <Dropdown label="Category" value={category} options={categoryOptions} onChange={setCategory} />
            </div>

            {/* Advanced Filters */}
            <button className="flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors pb-2">
                <FontAwesomeIcon icon={faSlidersH} className="w-4" />
                Advanced Filters
            </button>
        </div>
    );
};

export default Filters;
