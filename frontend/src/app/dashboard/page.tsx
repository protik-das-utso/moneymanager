import DashboardIndex from "@/src/components/layout/dashboard/DashboardIndex";
import Sidebar from
"@/src/components/layout/sidebar/Sidebar";
import Navbar from "@/src/components/layout/header/Navbar";
const page = () => {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-1/6 min-h-screen">
                <Sidebar />
            </div>
            <div className="w-5/6 min-h-screen flex flex-col">
                <Navbar />
                <DashboardIndex />
            </div>
        </div>
    )
}

export default page;