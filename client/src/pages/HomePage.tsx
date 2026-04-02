import FormComponent from "@/components/forms/FormComponent"

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-dark relative overflow-hidden">
            
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none" />

            {/* Floating code symbols */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {["{}", "</>", "=>", "fn()", "const", "async", "[]", "&&"].map((char, i) => (
                    <span
                        key={i}
                        className="absolute font-mono text-primary opacity-10 text-sm animate-pulse"
                        style={{
                            left: `${(i * 13 + 5) % 90}%`,
                            top: `${(i * 17 + 10) % 80}%`,
                            animationDelay: `${i * 0.5}s`,
                            fontSize: `${12 + (i % 3) * 4}px`
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex h-full min-w-full flex-col items-center justify-center sm:flex-row gap-8 px-4">
                
                {/* Left side */}
                <div className="flex w-full sm:w-1/2 flex-col items-center sm:items-start sm:pl-16 gap-6">
                    
                    {/* Logo + Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-4xl font-black tracking-tight text-white">
                            WE<span className="text-primary">CODE</span>
                        </span>
                    </div>

                    {/* Tagline */}
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Code together,<br/>
                            <span className="text-primary">in real-time.</span>
                        </h1>
                        <p className="mt-3 text-gray-400 text-base max-w-sm">
                            Shared editor, live chat, whiteboard — all in one room. No setup needed.
                        </p>
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                        {["⚡ Live Sync", "💬 Group Chat", "🎨 Whiteboard", "▶ Run Code"].map((f) => (
                            <span key={f} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs bg-primary/5">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex w-full items-center justify-center sm:w-1/2">
                    <FormComponent />
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-8 text-center text-xs text-gray-600 pb-4">
                WE<span className="text-primary">CODE</span> — Real-time Collaborative Dev Platform
            </div>
        </div>
    )
}

export default HomePage