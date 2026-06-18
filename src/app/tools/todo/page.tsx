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
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#8a8a8a] text-xs tracking-widest hover:text-[#5a5a5a] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase border border-[#dcdcdc] px-2 py-0.5 rounded-sm">
          Organization
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">Smart Todo List</h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          Powered by advanced task-prioritization AI. Add your tasks and let our system
          organize, prioritize, and manage everything for you.
        </p>
      </div>

      {/* The todo list — always empty */}
      <div className="border border-[#e2e2e0] bg-[#f7f7f5] rounded-sm mb-6">
        <div className="border-b border-[#ececec] px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-[#707070] tracking-widest uppercase">My Tasks</span>
          <span className="text-xs text-[#b0b0b0]">0 items</span>
        </div>
        <div className="px-4 py-12 text-center">
          <p className="text-[#dcdcdc] text-sm tracking-wide">Nothing to do.</p>
          <p className="text-[#e2e2e0] text-xs mt-1">You&apos;re all caught up!</p>
        </div>
      </div>

      {!submitted && !analyzing && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-[#ffffff] border border-[#e2e2e0] text-[#141414] placeholder-[#b0b0b0] px-4 py-3 text-sm focus:outline-none focus:border-[#8a8a8a] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Add Task
          </button>
        </form>
      )}

      {analyzing && (
        <div className="border border-[#e2e2e0] p-6 space-y-2">
          {[
            "Analyzing task complexity...",
            "Checking your schedule...",
            "Prioritizing against existing tasks...",
            "Optimizing your workflow...",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-[#707070]">
              <span className="blink text-[#b0b0b0]">▸</span>
              {s}
            </div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="fade-in space-y-4">
          <div className="border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] space-y-1">
            <p>✓ Task analyzed</p>
            <p>✓ Priority calculated: none</p>
            <p>✓ Added to list: no</p>
            <p>✓ Reason: nothing is important</p>
          </div>
          <p className="text-center text-[#b0b0b0] text-xs">
            After careful analysis, this task was deemed unnecessary.
          </p>
          <button
            onClick={reset}
            className="w-full py-3 border border-[#e2e2e0] text-[#707070] text-sm tracking-widest uppercase hover:border-[#8a8a8a] hover:text-[#454545] transition-colors"
          >
            Try Adding Another Task
          </button>
        </div>
      )}
    </div>
  );
}
