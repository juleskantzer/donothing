"use client";

import { useState } from "react";

export default function TodoList() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setAnalyzing(false);
    setSubmitted(true);
  }

  function reset() {
    setInput("");
    setSubmitted(false);
    setAnalyzing(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <a href="/" className="text-[#444] text-xs tracking-widest hover:text-[#666] transition-colors mb-8 inline-block">
        ← back to nothing
      </a>

      <div className="mb-10">
        <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
          Organization
        </span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">Smart Todo List</h1>
        <p className="text-[#555] text-sm leading-relaxed">
          Powered by advanced task-prioritization AI. Add your tasks and let our system
          organize, prioritize, and manage everything for you.
        </p>
      </div>

      {/* The todo list — always empty */}
      <div className="border border-[#222] bg-[#0d0d0d] rounded-sm mb-6">
        <div className="border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-[#555] tracking-widest uppercase">My Tasks</span>
          <span className="text-xs text-[#333]">0 items</span>
        </div>
        <div className="px-4 py-12 text-center">
          <p className="text-[#2a2a2a] text-sm tracking-wide">Nothing to do.</p>
          <p className="text-[#222] text-xs mt-1">You&apos;re all caught up!</p>
        </div>
      </div>

      {!submitted && !analyzing && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-[#111] border border-[#222] text-[#e5e5e5] placeholder-[#333] px-4 py-3 text-sm focus:outline-none focus:border-[#444] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-[#e5e5e5] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Add Task
          </button>
        </form>
      )}

      {analyzing && (
        <div className="border border-[#222] p-6 space-y-2">
          {[
            "Analyzing task complexity...",
            "Checking your schedule...",
            "Prioritizing against existing tasks...",
            "Optimizing your workflow...",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-[#555]">
              <span className="blink text-[#333]">▸</span>
              {s}
            </div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="fade-in space-y-4">
          <div className="border border-[#1a1a1a] bg-[#0d0d0d] p-4 text-xs text-[#444] space-y-1">
            <p>✓ Task analyzed</p>
            <p>✓ Priority calculated: none</p>
            <p>✓ Added to list: no</p>
            <p>✓ Reason: nothing is important</p>
          </div>
          <p className="text-center text-[#333] text-xs">
            After careful analysis, this task was deemed unnecessary.
          </p>
          <button
            onClick={reset}
            className="w-full py-3 border border-[#222] text-[#555] text-sm tracking-widest uppercase hover:border-[#444] hover:text-[#888] transition-colors"
          >
            Try Adding Another Task
          </button>
        </div>
      )}
    </div>
  );
}
