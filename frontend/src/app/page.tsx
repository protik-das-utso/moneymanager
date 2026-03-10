import DashboardIndex from "@/src/components/layout/dashboard/DashboardIndex";
import Sidebar from "@/src/components/layout/sidebar/Sidebar";
import Navbar from "@/src/components/layout/header/Navbar";export default function Home() {
  return (
      <div className="flex min-h-screen">
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-full">
                <Navbar />
                <DashboardIndex />
            </div>
      </div>
  );
}
