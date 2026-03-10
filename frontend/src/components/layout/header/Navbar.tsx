"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () =>
            setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <nav className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between sticky top-0 z-10">
            {/* Left: Heading and subtext */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-400 mt-0.5">Your money is under control.</p>
            </div>

            {/* Right: Time, Today, Category */}
            <div className="flex items-center gap-3">
                {/* Time tab */}
                <div className="flex items-center gap-2 bg-[#181F2A] border border-[#232B3B] rounded-lg px-4 py-2 text-white text-sm font-medium">
                    <FontAwesomeIcon icon={faClock} className="w-4"></FontAwesomeIcon>
                    {time}
                </div>
                {/* Today button */}
                <button className="flex items-center gap-2 bg-[#232B3B] text-[#A5B4FC] px-4 py-2 rounded-lg text-sm font-medium">
                    <FontAwesomeIcon icon={faCalendar} className="w-4"></FontAwesomeIcon>
                    Today
                </button>
                {/* Category button */}
                <button className="flex items-center gap-2 bg-[#FF8800] hover:bg-[#e28214] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-colors">
                    <FontAwesomeIcon icon={faPlus} className="w-3"></FontAwesomeIcon>
                    Category
                </button>

                <button className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5052d1] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-colors">
                    <FontAwesomeIcon icon={faPlus} className="w-3"></FontAwesomeIcon>
                    Transaction
                </button>
            </div>
        </nav>
    );
};

export default Navbar;