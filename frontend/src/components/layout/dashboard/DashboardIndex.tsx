import Filters from "./Filters";
import StatCardSection from "./StatCardSection";


const DashboardIndex = () => {
    return (
    <div className="bg-[#F1F5F9] h-screen overflow-y-auto px-6 py-6">
        
        <Filters />
        
        <StatCardSection />
        
    </div>
    )
}

export default DashboardIndex;