"use client";

import { useState, useEffect } from "react";
import { Users, Smartphone, TrendingUp, Activity, Globe2, ShieldCheck } from "lucide-react"; // Added Icons
import { StatsCard } from "@/components/ui/StatsCard";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { motion } from "framer-motion";

// ... Types ...
interface Metrics {
    total_population: number;
    avg_age: number;
    mobile_linked_percent: number;
}
interface DashboardData {
    metrics: Metrics;
    state_distribution: Record<string, number>;
    age_distribution: Record<string, number>;
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data/aggregated_stats.json");
                if (!response.ok) throw new Error("Failed to load data");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500"></div>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center text-red-400">Error loading dashboard data.</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400">
                            Live Overview
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Real-time demographic surveillance provided by UIDAI Interface v2.0</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20 px-3 py-1.5 rounded-full bg-emerald-500/5">System Optimal</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* 4 col layout for level 10 */}
                <StatsCard
                    title="Total Registrations"
                    value={data.metrics.total_population.toLocaleString()}
                    change="+12.5%"
                    trend="up"
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Mobile Linked"
                    value={`${data.metrics.mobile_linked_percent}%`}
                    change="+5.2%"
                    trend="up"
                    icon={Smartphone}
                    color="purple"
                />
                <StatsCard
                    title="Average Age"
                    value={`${data.metrics.avg_age} yrs`}
                    change="-0.8%"
                    trend="down"
                    icon={Activity}
                    color="amber"
                />
                <StatsCard
                    title="Biometric Integrity"
                    value="99.9%"
                    change="+0.1%"
                    trend="up"
                    icon={ShieldCheck}
                    color="emerald"
                />
            </div>

            {/* Charts Section */}
            <div className="min-h-[500px]">
                <OverviewCharts
                    stateData={data.state_distribution}
                    ageData={data.age_distribution}
                />
            </div>
        </div>
    );
}
