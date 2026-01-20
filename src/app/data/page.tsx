"use client";

import { Database, CheckCircle, RefreshCw, Server, Shield, Activity } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DataPage() {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            alert("Connections refreshed successfully.");
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />
                    <span className="text-xs font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 hidden sm:block">SYSTEM STATUS: ONLINE</span>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Data Sources</h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">Manage real-time datasets and connectors powering the Digital Twin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="dashboard-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-emerald-500/20 rounded-xl">
                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">System Health</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">99.9%</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Total Records</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">1.4B+</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-card p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">Latency</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">12ms</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-card rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-950/50 text-slate-500 font-medium border-b border-slate-200 dark:border-white/5">
                            <tr>
                                <th className="px-8 py-6 uppercase text-xs tracking-wider">Dataset Name</th>
                                <th className="px-8 py-6 uppercase text-xs tracking-wider">Status</th>
                                <th className="px-8 py-6 uppercase text-xs tracking-wider">Last Sync</th>
                                <th className="px-8 py-6 uppercase text-xs tracking-wider text-right">Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                            <Server className="w-5 h-5 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Aadhaar Enrolment Registry</div>
                                            <div className="text-xs text-slate-500">Master demographic database</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                                        CONNECTED
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-slate-500 font-mono text-xs">2026-01-19 22:15:00 UTC</td>
                                <td className="px-8 py-6 text-right">
                                    <button onClick={() => alert("Showing details")} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">View Logs</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                            <Shield className="w-5 h-5 text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Security Surveillance Feed</div>
                                            <div className="text-xs text-slate-500">Real-time threat monitoring</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                        OFFLINE
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-slate-500 font-mono text-xs">--</td>
                                <td className="px-8 py-6 text-right">
                                    <button onClick={() => alert("Connecting...")} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-bold uppercase tracking-wider transition-colors px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20">Initialize</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/30 flex justify-center">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors px-6 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
                        disabled={refreshing}
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-500" : ""}`} />
                        {refreshing ? "Synching Nodes..." : "Force Sync All Nodes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
