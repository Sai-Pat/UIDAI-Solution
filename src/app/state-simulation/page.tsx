"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, RotateCcw, TrendingUp, TrendingDown, Activity, Search, MapPin, Users, Building2, Settings } from "lucide-react";
import Link from "next/link";
import { runSimulation, SimulationResults, getSimulationContext } from "@/lib/simulation_engine";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface StateData {
    population: number;
    children: number;
    adults: number;
    enrolment_rate: number;
    biometric_coverage: number;
    districts: number;
}

export default function StateSimulationPage() {
    const [stateData, setStateData] = useState<Record<string, StateData> | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [scenario, setScenario] = useState("Pandemic Spread");

    // Simulation parameters
    const [R0, setR0] = useState(2.5);
    const [healthcare, setHealthcare] = useState(60);
    const [lockdown, setLockdown] = useState(80);
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState<SimulationResults | null>(null);

    const context = getSimulationContext(scenario);

    // Load state data
    useMemo(() => {
        fetch("/data/aggregated_stats.json")
            .then(res => res.json())
            .then(data => {
                setStateData(data.state_data || {});
                if (data.state_data && Object.keys(data.state_data).length > 0 && !selectedState) {
                    setSelectedState(Object.keys(data.state_data)[0]);
                }
            })
            .catch(err => console.error("Failed to load state data:", err));
    }, [selectedState]);

    const handleRunSimulation = () => {
        if (!selectedState || !stateData) return;

        setRunning(true);
        setResults(null);

        setTimeout(() => {
            const result = runSimulation({
                scenario,
                R0,
                healthcare,
                lockdown,
                population: stateData[selectedState].population,
                state: selectedState
            });

            setResults(result);
            setRunning(false);
        }, 1500);
    };

    const selectedStateData = selectedState && stateData ? stateData[selectedState] : null;
    const stateNames = stateData ? Object.keys(stateData).sort() : [];

    // Filter states based on search
    const filteredStates = stateNames.filter(state =>
        state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 lg:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/dashboard"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        State-wise Simulation
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Regional pandemic modeling with state-specific parameters
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* State Selector - 1 column */}
                <div className="dashboard-card p-6 rounded-3xl h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Select State</h2>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {stateNames.length} states
                        </span>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search states..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* State Cards */}
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredStates.map(state => {
                            const data = stateData?.[state];
                            const isSelected = selectedState === state;

                            return (
                                <motion.button
                                    key={state}
                                    onClick={() => {
                                        setSelectedState(state);
                                        setResults(null);
                                    }}
                                    className={`w-full text-left p-4 rounded-xl transition-all ${isSelected
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                                        : "bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-blue-500"}`} />
                                                <h3 className="font-bold text-sm">{state}</h3>
                                            </div>
                                            {data && (
                                                <div className={`flex items-center gap-3 text-xs mt-2 ${isSelected ? "text-blue-100" : "text-slate-500"
                                                    }`}>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {(data.population / 1000000).toFixed(1)}M
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        {data.districts}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {isSelected && (
                                            <div className="ml-2">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            </div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Simulation Panel - 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Selected State Info */}
                    {selectedStateData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-card p-8 rounded-3xl"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedState}</h2>
                                    <p className="text-slate-600 dark:text-slate-400">State Demographics & Infrastructure</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl border border-blue-200/50 dark:border-blue-800/30">
                                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
                                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 font-bold uppercase tracking-wider mb-1">Population</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedStateData.population.toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-2xl border border-purple-200/50 dark:border-purple-800/30">
                                    <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-3" />
                                    <p className="text-xs text-purple-600/80 dark:text-purple-400/80 font-bold uppercase tracking-wider mb-1">Districts</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedStateData.districts}
                                    </p>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30">
                                    <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-bold uppercase tracking-wider mb-1">Enrolment</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedStateData.enrolment_rate.toFixed(1)}%
                                    </p>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-2xl border border-amber-200/50 dark:border-amber-800/30">
                                    <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-3" />
                                    <p className="text-xs text-amber-600/80 dark:text-amber-400/80 font-bold uppercase tracking-wider mb-1">Biometric</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedStateData.biometric_coverage.toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Parameters */}
                    <div className="dashboard-card p-8 rounded-3xl">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            Select Scenario
                        </h3>

                        <div className="mb-8">
                            <select
                                value={scenario}
                                onChange={(e) => setScenario(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all cursor-pointer"
                            >
                                <option>Pandemic Spread</option>
                                <option>Economic Shock</option>
                                <option>Cyber Infrastructure</option>
                                <option>Supply Chain Crisis</option>
                                <option>Climate Emergency</option>
                                <option>Urban Migration</option>
                                <option>Energy Grid Failure</option>
                            </select>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            Simulation Parameters
                        </h3>

                        <div className="space-y-8">
                            {/* R0 Slider */}
                            <div>
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {context.parameters.r0}
                                        </label>
                                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-tight">
                                            Status: {R0 < 1 ? "Stable" : R0 < 1.5 ? "Slow Spread" : R0 < 2.5 ? "Moderate Outbreak" : R0 < 4 ? "Rapid Contagion" : "Extreme Pandemic"}
                                        </span>
                                    </div>
                                    <span className="text-sm font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg">{R0}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={R0}
                                    onChange={(e) => setR0(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${(R0 / 5) * 100}%, #e2e8f0 ${(R0 / 5) * 100}%, #e2e8f0 100%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                                    <span>LOW</span>
                                    <span>MED</span>
                                    <span>HIGH</span>
                                </div>
                            </div>

                            {/* Healthcare Slider */}
                            <div>
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {context.parameters.healthcare}
                                        </label>
                                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-tight">
                                            Status: {healthcare < 25 ? "Critical" : healthcare < 50 ? "Strained" : healthcare < 75 ? "Standard" : "Optimal"}
                                        </span>
                                    </div>
                                    <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">{healthcare}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={healthcare}
                                    onChange={(e) => setHealthcare(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
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

                            {/* Lockdown Slider */}
                            <div>
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {context.parameters.lockdown}
                                        </label>
                                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-tight">
                                            Status: {lockdown < 20 ? "Unrestricted" : lockdown < 45 ? "Partial" : lockdown < 75 ? "Intermediate" : "Full"}
                                        </span>
                                    </div>
                                    <span className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">{lockdown}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={lockdown}
                                    onChange={(e) => setLockdown(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
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

                        <div className="flex gap-3 mt-10">
                            <motion.button
                                onClick={handleRunSimulation}
                                disabled={!selectedState || running}
                                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${running
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/40"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30 hover:shadow-blue-500/50"
                                    } ${!selectedState ? "opacity-50 cursor-not-allowed" : ""}`}
                                whileTap={{ scale: running ? 1 : 0.98 }}
                            >
                                {running ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Activity className="w-5 h-5" />
                                        </motion.div>
                                        Simulating...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 fill-white" />
                                        Run Simulation
                                    </>
                                )}
                            </motion.button>
                            <button
                                onClick={() => setResults(null)}
                                disabled={!results}
                                className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-30"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <AnimatePresence>
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="dashboard-card p-8 rounded-3xl"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Simulation Results</h3>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                            {results.accuracy}% Accuracy
                                        </span>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Peak Day</p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.peakDay}</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Effective R0 (Rt)</p>
                                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.finalR0}</p>
                                        </div>
                                        <TrendingDown className="w-5 h-5 text-emerald-500 mt-1" />
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 text-center">{results.chartLabels.peak}</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                                            {results.peakInfections >= 1000000
                                                ? `${(results.peakInfections / 1000000).toFixed(1)}M`
                                                : results.peakInfections.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 text-center">{results.chartLabels.deaths}</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                                            {results.totalDeaths >= 1000000
                                                ? `${(results.totalDeaths / 1000000).toFixed(1)}M`
                                                : results.totalDeaths.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Insights Section */}
                                <div className="mb-8 space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Strategic Analysis</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {results.insights.map((insight, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                                    <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{insight}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline Chart */}
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">{scenario} Dynamics (SIR Model)</h4>
                                    <div className="h-[320px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={results.timeSeries.filter((_, i) => i % 3 === 0)}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
                                                <XAxis
                                                    dataKey="day"
                                                    stroke="#64748b"
                                                    fontSize={11}
                                                    label={{ value: "TIMELINE (DAYS)", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                                                />
                                                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString()} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        borderRadius: "12px",
                                                    }}
                                                    formatter={(value: any, name?: string) => [value.toLocaleString(), name ? (results.chartLabels[name as keyof typeof results.chartLabels]?.toUpperCase() || name) : ""]}
                                                />
                                                <Legend />
                                                <Line type="monotone" dataKey="susceptible" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="susceptible" />
                                                <Line type="monotone" dataKey="infected" stroke="#ef4444" strokeWidth={2.5} dot={false} name="infected" />
                                                <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2.5} dot={false} name="recovered" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
