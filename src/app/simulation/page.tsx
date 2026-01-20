"use client";

import { Activity, Play, RotateCcw, Settings, CheckCircle2, TrendingDown, TrendingUp, AlertTriangle, Cpu, ShieldCheck, Zap } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { runSimulation, SimulationResults, getSimulationContext } from "@/lib/simulation_engine";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function SimulationPage() {
    const [running, setRunning] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<SimulationResults | null>(null);

    // Control States
    const [scenario, setScenario] = useState("Pandemic Spread");
    const [r0, setR0] = useState(2.5);
    const [healthcare, setHealthcare] = useState(60);
    const [lockdown, setLockdown] = useState(85);

    const context = getSimulationContext(scenario);

    // Spotlight Effect Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const activeSpotlight = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(59, 130, 246, 0.15),
      transparent 80%
    )
  `;

    const handleRun = () => {
        setRunning(true);
        setShowResults(false);

        // Run actual simulation
        setTimeout(() => {
            const simulationResult = runSimulation({
                scenario,
                R0: r0,
                healthcare,
                lockdown,
                population: 10000000 // 10M for simulation
            });

            setResults(simulationResult);
            setRunning(false);
            setShowResults(true);
        }, 2000);
    };

    const handleReset = () => {
        setShowResults(false);
        setRunning(false);
    };

    return (
        <div className="space-y-8 animate-fade-in text-slate-900 dark:text-slate-100 perspective-1000 p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                        Simulation Core <span className="text-xs font-mono text-cyan-500/50 ml-2 tracking-widest align-middle border border-cyan-500/20 px-2 py-0.5 rounded-full">v3.0</span>
                    </h1>
                </div>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-blue-500/50"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Neural Engine Active
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
                {/* Main Viewport with Spotlight Effect */}
                <div
                    onMouseMove={handleMouseMove}
                    className="lg:col-span-2 relative rounded-[2rem] overflow-hidden group bg-slate-950 border border-slate-800 shadow-2xl isolate"
                >
                    {/* Dynamic Spotlight */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                        style={{ background: activeSpotlight }}
                    />

                    <ParticleBackground />

                    {/* Ambient Lighting Layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-50" />

                    {/* Cyberspace Grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.07] bg-center bg-[length:50px_50px] mask-gradient-to-b" />

                    {/* HUD Overlay */}
                    <div className="absolute top-8 right-8 font-mono text-[10px] text-blue-400/50 flex flex-col items-end gap-2 z-20">
                        <div className="flex items-center gap-2">
                            <span>SYS.RDY</span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                        <span>CPU: {running ? "98%" : "12%"}</span>
                        <span>MEM: {running ? "16.4GB" : "1.2GB"}</span>
                    </div>

                    {/* Central Core UI - Refined */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                        <div className="relative w-64 h-64 mx-auto flex items-center justify-center mb-10">
                            {/* Outer Static Ring */}
                            <div className="absolute inset-0 rounded-full border border-slate-800/80" />

                            {/* Rotating Rings */}
                            <motion.div
                                animate={{ rotate: 360, scale: running ? [1, 1.02, 1] : 1 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border border-dashed border-slate-700/60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-10 rounded-full border border-dotted border-blue-500/20"
                            />
                            <motion.div
                                animate={{ rotate: 180 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 rounded-full border border-slate-800 opacity-50"
                            />

                            {/* Core Glow */}
                            {running && (
                                <div className="absolute inset-16 rounded-full bg-blue-500/10 blur-[60px] animate-pulse" />
                            )}

                            {/* Central Orb */}
                            <div className={`relative z-30 w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-105 ${running
                                ? "border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(34,211,238,0.3)]"
                                : "border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                                }`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 rounded-full opacity-90" />
                                <Zap className={`relative z-10 w-10 h-10 transition-all duration-500 ${running ? "text-cyan-400 fill-cyan-400/20 animate-pulse scale-110" : "text-slate-600"}`} />
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight">
                                {running ? (
                                    <span className="animate-pulse bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                                        Simulating Neural Vectors...
                                    </span>
                                ) : (
                                    <span className="text-slate-100">Aadhaar Digital Twin</span>
                                )}
                            </h3>
                            <p className="text-sm font-mono text-slate-500 max-w-sm mx-auto tracking-wide">
                                {running ? `[PROCESSING] >>> Calculating R0=${r0} impact across nodes...` : "Initialize parameters to project demographic futures."}
                            </p>
                        </div>
                    </div>

                    {/* Result Modal - Ultra Premium Glass */}
                    <AnimatePresence>
                        {showResults && results && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                    className="w-full max-w-4xl bg-[#020617]/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 max-h-[90vh] overflow-y-auto"
                                >
                                    {/* Header Gradient Line */}
                                    <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />

                                    <div className="p-8">
                                        <div className="flex flex-col items-center mb-8">
                                            <div className="mb-4 relative">
                                                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20" />
                                                <CheckCircle2 className="w-14 h-14 text-emerald-400 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">Simulation Complete</h2>
                                            <p className="text-emerald-400/80 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">Scenario: {scenario}</p>
                                            <div className="mt-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                                <p className="text-sm font-bold text-blue-400">Accuracy: {results.accuracy}%</p>
                                            </div>
                                        </div>

                                        {/* Key Metrics Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col items-center gap-2 hover:bg-slate-800/50 transition-colors">
                                                <TrendingDown className="w-5 h-5 text-emerald-400 mb-1" />
                                                <span className="text-3xl font-bold text-white tracking-tighter">{results.finalR0}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Effective R0 (Rt)</span>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col items-center gap-2 hover:bg-slate-800/50 transition-colors">
                                                <Activity className="w-5 h-5 text-orange-400 mb-1" />
                                                <span className="text-3xl font-bold text-white tracking-tighter">{results.peakDay}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold text-center">Peak Day</span>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col items-center gap-2 hover:bg-slate-800/50 transition-colors">
                                                <TrendingUp className="w-5 h-5 text-blue-400 mb-1" />
                                                <span className="text-2xl font-bold text-white tracking-tighter">
                                                    {results.peakInfections >= 1000000
                                                        ? `${(results.peakInfections / 1000000).toFixed(1)}M`
                                                        : results.peakInfections.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold text-center">{results.chartLabels.peak}</span>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col items-center gap-2 hover:bg-slate-800/50 transition-colors">
                                                <AlertTriangle className="w-5 h-5 text-purple-400 mb-1" />
                                                <span className="text-2xl font-bold text-white tracking-tighter">
                                                    {results.totalDeaths >= 1000000
                                                        ? `${(results.totalDeaths / 1000000).toFixed(1)}M`
                                                        : results.totalDeaths.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold text-center">{results.chartLabels.deaths}</span>
                                            </div>
                                        </div>

                                        {/* Timeline Chart */}
                                        <div className="mb-8 p-6 rounded-2xl bg-slate-900/30 border border-white/5">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">{scenario} Dynamics</h3>
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                        <span className="text-[10px] text-slate-400 font-mono uppercase">{results.chartLabels.susceptible}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        <span className="text-[10px] text-slate-400 font-mono uppercase">{results.chartLabels.infected}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span className="text-[10px] text-slate-400 font-mono uppercase">{results.chartLabels.recovered}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-[320px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={results.timeSeries.filter((_, i) => i % 4 === 0)} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.1} />
                                                        <XAxis
                                                            dataKey="day"
                                                            stroke="#64748b"
                                                            fontSize={10}
                                                            tickLine={false}
                                                            axisLine={false}
                                                            label={{ value: "TIMELINE (DAYS)", position: "insideBottom", offset: -15, fill: "#475569", fontSize: 10, fontWeight: 700 }}
                                                        />
                                                        <YAxis
                                                            stroke="#64748b"
                                                            fontSize={10}
                                                            tickLine={false}
                                                            axisLine={false}
                                                            tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString()}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: "rgba(2, 6, 23, 0.95)",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                borderRadius: "16px",
                                                                fontSize: "12px",
                                                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                                            }}
                                                            labelStyle={{ color: "#94a3b8", fontWeight: 700, marginBottom: "8px" }}
                                                            formatter={(value, name) => [value, results.chartLabels[name as keyof typeof results.chartLabels]?.toUpperCase() || name]}
                                                        />
                                                        <Line type="monotone" dataKey="susceptible" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={2000} name="susceptible" />
                                                        <Line type="monotone" dataKey="infected" stroke="#ef4444" strokeWidth={3} dot={false} animationDuration={2000} name="infected" />
                                                        <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={2000} name="recovered" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Insights Section */}
                                        <div className="mb-8 space-y-3">
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Narrative Analysis</h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                {results.insights.map((insight, idx) => (
                                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                                        <Activity className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleReset}
                                            className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] text-sm uppercase tracking-wide"
                                        >
                                            Run New Analysis
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Configuration Panel - Sleek Light/Dark Mode */}
                <div className="dashboard-card rounded-[2rem] p-8 flex flex-col bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-xl backdrop-blur-xl h-full">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/5">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Parameters</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Configure input vectors for the model</p>
                        </div>
                    </div>

                    <div className="space-y-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Scenario Prototype</label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                <select
                                    value={scenario}
                                    onChange={(e) => setScenario(e.target.value)}
                                    className="relative w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-4 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 appearance-none transition-colors hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-sm dark:shadow-inner"
                                >
                                    <option>Pandemic Spread</option>
                                    <option>Economic Shock</option>
                                    <option>Cyber Infrastructure</option>
                                    <option>Supply Chain Crisis</option>
                                    <option>Climate Emergency</option>
                                    <option>Urban Migration</option>
                                    <option>Energy Grid Failure</option>
                                </select>
                                <div className="absolute right-4 top-4 pointer-events-none text-slate-500">▼</div>
                            </div>
                        </div>

                        {/* Viral R0 Factor Slider */}
                        <div className="space-y-4 group relative">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                        {context.parameters.r0}
                                    </label>
                                    <span className="text-[10px] text-blue-500/70 font-bold mt-1 uppercase tracking-tight">
                                        Status: {r0 < 1 ? "Stable" : r0 < 1.5 ? "Slow Spread" : r0 < 2.5 ? "Moderate Outbreak" : r0 < 4 ? "Rapid Contagion" : "Extreme Pandemic"}
                                    </span>
                                </div>
                                <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-xs border border-blue-500/20">{r0}</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="0" max="5" step="0.1"
                                    value={r0}
                                    onChange={(e) => setR0(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${(r0 / 5) * 100}%, #e2e8f0 ${(r0 / 5) * 100}%, #e2e8f0 100%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                                    <span>LOW</span>
                                    <span>MED</span>
                                    <span>HIGH</span>
                                </div>
                            </div>
                        </div>

                        {/* Healthcare Cap Slider */}
                        <div className="space-y-4 group relative">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                                        {context.parameters.healthcare}
                                    </label>
                                    <span className="text-[10px] text-emerald-500/70 font-bold mt-1 uppercase tracking-tight">
                                        Status: {healthcare < 25 ? "Critical" : healthcare < 50 ? "Strained" : healthcare < 75 ? "Standard" : "Optimal"}
                                    </span>
                                </div>
                                <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs border border-emerald-500/20">{healthcare}%</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={healthcare}
                                    onChange={(e) => setHealthcare(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 0%, #14b8a6 ${healthcare}%, #e2e8f0 ${healthcare}%, #e2e8f0 100%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                                    <span>MIN</span>
                                    <span>50%</span>
                                    <span>OPTIMAL</span>
                                </div>
                            </div>
                        </div>

                        {/* Lockdown Stringency Slider */}
                        <div className="space-y-4 group relative">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                                        {context.parameters.lockdown}
                                    </label>
                                    <span className="text-[10px] text-purple-500/70 font-bold mt-1 uppercase tracking-tight">
                                        Status: {lockdown < 20 ? "Unrestricted" : lockdown < 45 ? "Partial" : lockdown < 75 ? "Intermediate" : "Full"}
                                    </span>
                                </div>
                                <span className="font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-1 rounded text-xs border border-purple-500/20">{lockdown}%</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={lockdown}
                                    onChange={(e) => setLockdown(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                    style={{
                                        background: `linear-gradient(to right, #9333ea 0%, #ec4899 ${lockdown}%, #e2e8f0 ${lockdown}%, #e2e8f0 100%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                                    <span>OFF</span>
                                    <span>PARTIAL</span>
                                    <span>STRICT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={handleRun}
                        disabled={running}
                        className="relative overflow-hidden flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:to-cyan-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:shadow-none uppercase tracking-wide"
                    >
                        <Play className="w-4 h-4 fill-white" /> {running ? "Core Processing..." : "Initiate Simulation"}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-5 py-4 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-800"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
