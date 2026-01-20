"use client";

import { FileText, Download, Share2, Sparkles } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function InsightsPage() {
    const reports = [
        { title: "Demographic Shift 2025-2026", date: "Jan 15, 2026", type: "PDF", desc: "Analysis of rural-to-urban migration patterns." },
        { title: "Impact of Digital Literacy", date: "Jan 10, 2026", type: "PDF", desc: "Correlation between UPI usage and enrolment." },
        { title: "Regional Anomaly Detection", date: "Jan 02, 2026", type: "CSV", desc: "Outlier detection in biometric update requests." },
    ];

    const handleDownload = (title: string) => {
        alert(`Downloading report: ${title}...`);
    };

    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: "Insights", url: window.location.href }).catch(console.error);
        } else {
            alert("Link copied to clipboard!");
        }
    };

    const handleGenerate = () => {
        alert("Triggering generation pipeline... This might take a few moments.");
    };

    return (
        <div className="space-y-8 animate-fade-in p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <BackButton />
                        <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />
                        <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 hidden sm:block">AI ANALYTICS ENGINE</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Generated Insights</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Automated intelligence reports derived from the Digital Twin model.</p>
                    </div>
                </div>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl transition-all border border-slate-700 text-sm font-bold shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5"
                >
                    <Share2 className="w-4 h-4" /> Share Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reports.map((report, i) => (
                    <div
                        key={i}
                        onClick={() => handleDownload(report.title)}
                        className="dashboard-card p-8 rounded-3xl group hover:border-blue-500/50 transition-all cursor-pointer bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden active:scale-[0.98] shadow-sm"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-500" />

                        <div className="flex items-start justify-between mb-6 relative z-10">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-500 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-colors shadow-sm">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 uppercase">{report.type}</span>
                        </div>

                        <div className="relative z-10 space-y-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors leading-tight">{report.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-500 line-clamp-2">{report.desc}</p>
                        </div>

                        <div className="mt-8 flex items-center justify-between text-xs font-medium text-slate-500 relative z-10 pt-6 border-t border-white/5">
                            <span>{report.date}</span>
                            <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                Download <Download className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* New Report Button */}
                <div
                    onClick={handleGenerate}
                    className="dashboard-card p-8 rounded-3xl border-dashed border-2 border-slate-800 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-900/80 hover:border-slate-600 hover:text-slate-300 transition-all cursor-pointer min-h-[250px] bg-transparent group active:scale-[0.98]"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all shadow-xl">
                        <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12" />
                    </div>
                    <p className="font-bold text-lg">Generate New Report</p>
                    <p className="text-xs mt-2 opacity-50 text-center max-w-[200px]">Run AI diagnostics to create a new briefing</p>
                </div>
            </div>
        </div>
    );
}
