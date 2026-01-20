"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Globe, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] pointer-events-none" />

      <main className="z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Hackathon 2026 Edition
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 dark:from-blue-100 dark:via-white dark:to-blue-100">
              Digital Twin of India
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A dynamic, data-driven model of 1.3 billion lives.
            Simulate pandemics, economic shocks, and policy reforms in a safe, virtual environment powered by Aadhaar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/dashboard" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900">
              <span className="mr-2">Enter Simulation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>

            <Link href="https://event.data.gov.in" target="_blank" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-8 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hover:text-slate-900 dark:hover:text-white backdrop-blur-sm">
              Official Challenge
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left max-w-4xl mx-auto"
        >
          {[
            { title: "Real-time Modeling", desc: "Granular demographic simulation based on Aadhaar identity integration.", icon: Activity },
            { title: "Policy Stress-Testing", desc: "Forecast outcomes of education reforms and health interventions.", icon: Globe },
            { title: "Privacy First", desc: "Aggregated, anonymized data ensures citizen rights are protected.", icon: Shield },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl border-t border-white/50 dark:border-white/5 hover:-translate-y-1 transition-transform cursor-default bg-white/40 dark:bg-slate-900/40">
              <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="absolute bottom-6 text-slate-600 text-xs">
        © 2026 UIDAI Hackathon Submission. All rights reserved.
      </footer>
    </div>
  );
}
