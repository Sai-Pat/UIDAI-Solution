"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
    color?: "blue" | "emerald" | "purple" | "rose" | "amber";
}

const colorMap = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    purple: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    default: "text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/20"
};

export function StatsCard({ title, value, change, icon: Icon, trend, color = "blue" }: StatsCardProps) {
    const trendColor = trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-slate-500";
    const iconStyles = colorMap[color] || colorMap.default;

    return (
        <div className="dashboard-card rounded-2xl p-6 relative overflow-hidden group">
            {/* Background Glow Blob - Restored from Level 11 */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[50px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${color === 'blue' ? 'bg-blue-500' : color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'}`} />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent skew-x-12 z-10 pointer-events-none" />

            <div className="flex items-start justify-between relative z-20">
                <div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">{value}</h3>

                    {change && (
                        <div className="flex items-center gap-2 mt-3">
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 flex items-center gap-1", trendColor)}>
                                {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"} {change}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
                        </div>
                    )}
                </div>

                <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", iconStyles)}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {/* Animated Bottom Border (Activity Indicator) - Restored from Level 11 */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800">
                <motion.div
                    className={`h-full ${color === 'blue' ? 'bg-blue-500' : color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
            </div>
        </div>
    );
}
