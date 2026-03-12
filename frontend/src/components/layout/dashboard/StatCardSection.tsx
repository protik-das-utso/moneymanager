import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowTrendUp, 
    faArrowTrendDown, 
    faBuilding, 
    faPiggyBank 
} from '@fortawesome/free-solid-svg-icons';
import StatCard from "./statCard"

const StatCardSection = () => {
    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
            <StatCard 
                type="income"
                label="Total Income"
                value={6700.00}
                percentage={12}
                icon={<FontAwesomeIcon icon={faArrowTrendUp} className="w-6 h-6" />}
            />
            
            <StatCard 
                type="expense"
                label="Total Expenses"
                value={3524.00}
                percentage={5}
                icon={<FontAwesomeIcon icon={faArrowTrendDown} className="w-6 h-6" />}
            />
            
            <StatCard 
                type="balance"
                label="Net Balance"
                value={3176.00}
                badge="Global"
                icon={<FontAwesomeIcon icon={faBuilding} className="w-6 h-6" />}
            />
            
            <StatCard 
                type="savings"
                label="Savings Rate"
                value="47%"
                badge="Poor"
                icon={<FontAwesomeIcon icon={faPiggyBank} className="w-6 h-6" />}
            />
        </div>
        </div>
    )
}

export default StatCardSection;