import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "@/components/common/Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">{<Outlet />}</div>
      </main>
    </div>
  );
}