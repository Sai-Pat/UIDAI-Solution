"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

interface ChartsProps {
    stateData: Record<string, number>;
    ageData: Record<string, number>;
}

const COLORS = ['#3b82f6', '#22d3ee', '#34d399', '#f472b6', '#a78bfa'];

export function OverviewCharts({ stateData, ageData }: ChartsProps) {
    const stateChartData = Object.entries(stateData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    // Calculate Total for Percentage Logic
    const totalAgeCount = Object.values(ageData).reduce((acc, curr) => acc + curr, 0);

    const ageChartData = Object.entries(ageData)
        .map(([name, value]) => ({
            name,
            value,
            // Pre-calculate percentage for display
            percentage: totalAgeCount > 0 ? ((value / totalAgeCount) * 100).toFixed(1) : "0"
        }))
        .filter(item => item.value > 0); // Hide empty segments

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[450px]">

            {/* State Distribution */}
            <div className="dashboard-card p-8 rounded-3xl flex flex-col group relative overflow-hidden bg-white/50 dark:bg-slate-900/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Top Enrolment States</h3>
                        <p className="text-sm text-slate-500 mt-1">Leading adoption regions</p>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stateChartData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.1} horizontal={false} />
                            <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                stroke="#475569"
                                fontSize={13}
                                tickLine={false}
                                axisLine={false}
                                width={120}
                                fontWeight={700}
                                tick={{ fill: '#475569' }}
                            />
                            <Tooltip
                                cursor={{ fill: '#3b82f6', opacity: 0.05 }}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: 'rgba(0,0,0,0.05)',
                                    color: '#0f172a',
                                    backdropFilter: 'blur(16px)',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                                }}
                                itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[0, 6, 6, 0]}
                                barSize={24}
                                animationDuration={1500}
                            >
                                {stateChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill="#3b82f6"
                                        style={{
                                            filter: `drop-shadow(0 0 ${index === 0 ? '8px' : '0px'} rgba(59, 130, 246, 0.4))`,
                                            opacity: 0.9
                                        }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Age Distribution */}
            <div className="dashboard-card p-8 rounded-3xl flex flex-col relative overflow-hidden bg-white/50 dark:bg-slate-900/50">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="mb-8 relative z-10">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Usage Demographics</h3>
                    <p className="text-sm text-slate-500 mt-1">Age group stats</p>
                </div>

                <div className="flex-1 w-full min-h-[300px] relative z-10 flex flex-col items-center justify-center">
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ageChartData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={75}
                                    outerRadius={105}
                                    paddingAngle={6}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {ageChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            style={{ filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}20)` }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(2, 6, 23, 0.95)',
                                        borderColor: 'rgba(255,255,255,0.05)',
                                        color: '#f8fafc',
                                        backdropFilter: 'blur(16px)',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    formatter={(value: any, name: any, entry: any) => [`${entry.payload.percentage}%`, name]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Fixed Legend with Correct Percentages */}
                    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                        {ageChartData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                                <span
                                    className="w-2 h-2 rounded-full ring-2 ring-transparent transition-all shadow-sm shrink-0"
                                    style={{
                                        backgroundColor: COLORS[index % COLORS.length],
                                        boxShadow: `0 0 6px ${COLORS[index % COLORS.length]}`
                                    }}
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis">{entry.name}</span>
                                    <span className="text-[10px] font-mono text-slate-500">{entry.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
