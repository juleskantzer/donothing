"use client";

import { useState, useRef } from "react";

export default function ImagePassthrough() {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setDone(false);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }

  async function optimize() {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2800));
    setProcessing(false);
    setDone(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-[calc(100vh-9rem)] flex flex-col justify-center">
      <a href="/" className="text-[#8a8a8a] text-xs tracking-widest hover:text-[#5a5a5a] transition-colors mb-8 inline-block self-start">
        ← back to nothing
      </a>

      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase border border-[#dcdcdc] px-2 py-0.5 rounded-sm">
          AI-Powered
        </span>
        <h1 className="text-3xl font-bold text-[#141414] mt-4 mb-2 tracking-tight">Image Optimizer</h1>
        <p className="text-[#707070] text-sm leading-relaxed">
          Upload your image and let our proprietary AI pipeline analyze, process, and deliver
          a perfectly optimized version. Results are indistinguishable from the original.
        </p>
      </div>

      {/* Drop zone */}
      <div
        className="border border-dashed border-[#b0b0b0] rounded-sm p-10 text-center cursor-pointer hover:border-[#707070] transition-colors"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {!image ? (
          <div className="text-[#8a8a8a]">
            <div className="text-4xl mb-3">□</div>
            <p className="text-sm tracking-wide">Drop image here or click to upload</p>
            <p className="text-xs text-[#b0b0b0] mt-1">PNG, JPG, GIF, WEBP — any format, same result</p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="uploaded" className="max-h-64 mx-auto object-contain" />
        )}
      </div>

      {image && (
        <div className="mt-6">
          {!processing && !done && (
            <button
              onClick={optimize}
              className="w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Optimize Image
            </button>
          )}

          {processing && (
            <div className="border border-[#e2e2e0] p-6 space-y-3">
              {[
                "Analyzing pixel entropy...",
                "Running neural compression...",
                "Applying quantum dithering...",
                "Syncing with the cloud...",
                "Doing absolutely nothing...",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-[#707070]">
                  <span className="blink text-[#b0b0b0]">▸</span>
                  {step}
                </div>
              ))}
            </div>
          )}

          {done && (
            <div className="fade-in space-y-4">
              <div className="border border-[#ececec] bg-[#f7f7f5] p-4 text-xs text-[#8a8a8a] space-y-1">
                <p>✓ Optimization complete</p>
                <p>✓ File size: unchanged</p>
                <p>✓ Quality: identical</p>
                <p>✓ Improvements made: 0</p>
              </div>
              <a
                href={image}
                download="optimized_nothing.png"
                className="block w-full py-3 bg-[#141414] text-white text-sm font-semibold tracking-widest uppercase text-center hover:bg-black transition-colors"
              >
                Download Optimized Image
              </a>
              <p className="text-center text-[#b0b0b0] text-xs">
                Your image has been carefully returned to you.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
