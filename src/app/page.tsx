import Link from "next/link";

const tools = [
  {
    slug: "image-passthrough",
    name: "Image Optimizer",
    description: "Upload any image. Receive the exact same image. Nothing changed. Groundbreaking.",
    badge: "AI-Powered",
    color: "#1a1a1a",
  },
  {
    slug: "meditation",
    name: "Guided Meditation",
    description: "30 minutes of professionally generated audio to help you reach absolute inner nothing.",
    badge: "Wellness",
    color: "#0f1a0f",
  },
  {
    slug: "motivational-quote",
    name: "Motivational Quote Generator",
    description: "Get inspired. Or not. Our algorithm has processed millions of quotes to bring you... this.",
    badge: "Productivity",
    color: "#1a0f0f",
  },
  {
    slug: "todo",
    name: "Smart Todo List",
    description: "The most advanced todo list app ever built. Nothing to do? We've got you covered.",
    badge: "Organization",
    color: "#0f0f1a",
  },
  {
    slug: "timer",
    name: "Productivity Timer",
    description: "Track exactly how much of your life you're wasting, live, down to the millisecond. Finally, accountability.",
    badge: "Productivity",
    color: "#1a160f",
  },
  {
    slug: "decision-maker",
    name: "Decision Maker",
    description: "Can't choose? Our neural engine weighs every possible outcome and delivers the definitive answer.",
    badge: "Intelligence",
    color: "#0f1a1a",
  },
  {
    slug: "notes",
    name: "Private Notes",
    description: "Write down your most important thoughts. We respect your privacy by saving absolutely nothing.",
    badge: "Organization",
    color: "#1a0f17",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-24">
        <h1 className="text-6xl font-bold tracking-tight text-white mb-4 leading-none">
          nothing
        </h1>
        <p className="text-[#555] text-xl tracking-widest uppercase mt-4">
          there is nothing we can do
        </p>
        <p className="text-[#444] mt-8 max-w-md mx-auto leading-relaxed text-sm">
          A carefully curated suite of tools engineered to accomplish absolutely nothing.
          Save time by wasting time, intelligently.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block p-6 border border-[#222] rounded-sm hover:border-[#444] transition-colors duration-200"
            style={{ backgroundColor: tool.color }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] tracking-widest text-[#444] uppercase border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
                {tool.badge}
              </span>
              <span className="text-[#2a2a2a] group-hover:text-[#444] transition-colors text-lg">→</span>
            </div>
            <h2 className="text-white font-semibold text-base mb-2 tracking-wide">{tool.name}</h2>
            <p className="text-[#555] text-sm leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
