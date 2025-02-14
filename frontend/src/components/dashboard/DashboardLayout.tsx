"use client";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({
    children,
    username,
    onLogout,
}: {
    children: React.ReactNode;
    username: string;
    onLogout: () => void;
}) {
    return (
        <div className="min-h-screen">
            <Sidebar onLogout={onLogout} />
            <div className="ml-64">
                <DashboardHeader username={username} />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}