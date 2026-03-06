import DashboardIndex from "@/src/components/layout/dashboard/DashboardIndex";
import Sidebar from "@/src/components/layout/sidebar/Sidebar";
import Navbar from "@/src/components/layout/header/Navbar";export default function Home() {
  return (
      <div className="grid grid-cols-2">
            <Sidebar />
            <div>
                <Navbar />
                <DashboardIndex />
            </div>
      </div>
  );
}
