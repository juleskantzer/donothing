"use client";

import { useState } from "react";

export default function PrivateNotes() {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  async function save() {
    if (!text.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    // We respect your privacy by saving absolutely nothing.
    setSaving(false);
    const now = new Date();
    setSavedAt(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    );
    setText("");
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
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">Private Notes</h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          A secure, end-to-end nothing-encrypted space for your most important thoughts. We respect
          your privacy so deeply that we save absolutely nothing. Reload the page to verify.
        </p>
      </div>

      <div className="border border-[#e2e2e0] bg-[#f7f7f5] rounded-sm mb-4">
        <div className="border-b border-[#ececec] px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-[#707070] tracking-widest uppercase">My Notes</span>
          <span className="flex items-center gap-2 text-[10px] text-[#b0b0b0] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-900 inline-block" />
            encrypted
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSavedAt(null);
          }}
          placeholder="Start typing your most important, private thoughts..."
          rows={10}
          className="w-full bg-transparent text-[#141414] placeholder-[#b0b0b0] px-4 py-4 text-sm leading-relaxed focus:outline-none resize-none"
        />
        <div className="border-t border-[#ececec] px-4 py-2 flex items-center justify-between text-[10px] text-[#b0b0b0] tracking-widest uppercase">
          <span>{text.length} characters</span>
          <span>{savedAt ? `saved at ${savedAt}` : "unsaved"}</span>
        </div>
      </div>

      <button
        onClick={save}
        disabled={!text.trim() || saving}
        className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {saving ? "Securely saving..." : "Save Note"}
      </button>

      {savedAt && (
        <div className="fade-in mt-6 border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] space-y-1">
          <p>✓ Note encrypted</p>
          <p>✓ Transmitted to our servers: no</p>
          <p>✓ Written to disk: no</p>
          <p>✓ Bytes stored: 0</p>
          <p>✓ Your privacy: perfectly preserved</p>
        </div>
      )}

      <div className="mt-16 border-t border-[#ececec] pt-8">
        <p className="text-[#b0b0b0] text-xs leading-relaxed">
          <span className="text-[#8a8a8a]">Privacy guarantee:</span> Because we never store your notes,
          they cannot be leaked, hacked, subpoenaed, or recovered — including by you. Refresh the
          page and witness true, uncompromising data security.
        </p>
      </div>
    </div>
  );
}
