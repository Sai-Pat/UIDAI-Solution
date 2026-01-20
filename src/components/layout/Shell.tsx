"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Activity, LayoutDashboard, FileText, Settings, Menu, X, Database, Sun, Moon, LogOut, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Insights", href: "/insights", icon: FileText },
    { label: "Simulation", href: "/simulation", icon: Activity },
    { label: "State Simulation", href: "/state-simulation", icon: Map },
    { label: "Data Sources", href: "/data", icon: Database },
];

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleSettingsClick = () => {
        alert("Settings Panel: \n\n• System Version: 3.2.0 (Polished)\n• Connected Nodes: 4\n• API Status: Healthy");
    };

    return (
        <div className="h-screen flex bg-background text-foreground font-sans transition-colors duration-500 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Enhanced Style */}
            <aside
                className={cn(
                    "fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-slate-950/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 lg:translate-x-0 lg:static lg:block transition-transform duration-300 flex flex-col h-full",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/20">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">Digital Twin</div>
                            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">India Stack</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-600/20 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 hover:shadow-sm"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-transparent shrink-0">
                    <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-2">System Status</p>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Online & Syncing</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-md z-30 shrink-0">
                    <div className="font-bold text-foreground">Digital Twin</div>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:text-foreground">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>

                {/* Top Bar (Desktop) */}
                <header className="hidden lg:flex h-20 border-b border-slate-200 dark:border-slate-800 items-center justify-between px-8 bg-white/80 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-20 transition-colors shadow-sm dark:shadow-none shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                            Simulating: <span className="text-slate-900 dark:text-slate-200 font-bold ml-1">India (2026)</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Settings Button */}
                        <button
                            onClick={handleSettingsClick}
                            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                            title="System Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        <div className="h-6 w-[1px] bg-slate-300 dark:bg-slate-700 mx-2" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden xl:block leading-tight">
                                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">Admin</div>
                                <div className="text-[11px] text-slate-500 font-medium">UIDAI Level 5</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold ring-2 ring-white dark:ring-slate-800 shadow-md">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto w-full bg-slate-50/50 dark:bg-transparent relative h-full">
                    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
