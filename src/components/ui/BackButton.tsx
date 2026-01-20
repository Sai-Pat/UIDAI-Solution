"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-4 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-900 w-fit"
        >
            <ArrowLeft className="w-4 h-4" />
            Back
        </button>
    );
}
