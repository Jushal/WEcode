import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy, LuPlay, LuChevronDown } from "react-icons/lu"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    return (
        <div
            className="flex flex-col gap-3 p-4 bg-dark"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h1 className="text-sm font-bold text-white tracking-wider uppercase">Run Code</h1>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                
                {/* Language Selector */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Language</label>
                    <div className="relative">
                        <select
                            className="w-full rounded-xl border border-gray-700 bg-darkHover px-4 py-2.5 text-white outline-none appearance-none cursor-pointer hover:border-primary/50 transition-colors text-sm"
                            value={JSON.stringify(selectedLanguage)}
                            onChange={handleLanguageChange}
                        >
                            {supportedLanguages
                                .sort((a, b) => (a.language > b.language ? 1 : -1))
                                .map((lang, i) => (
                                    <option key={i} value={JSON.stringify(lang)}>
                                        {lang.language + (lang.version ? ` (${lang.version})` : "")}
                                    </option>
                                ))}
                        </select>
                        <LuChevronDown
                            size={14}
                            className="absolute bottom-3 right-3 text-gray-400 pointer-events-none"
                        />
                    </div>
                </div>

                {/* Input */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Input (stdin)</label>
                    <textarea
                        className="w-full resize-none rounded-xl border border-gray-700 bg-darkHover p-3 text-white outline-none placeholder-gray-500 focus:border-primary/50 transition-colors text-sm min-h-[80px]"
                        placeholder="Write your input here..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {/* Run Button */}
                <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-2.5 font-bold text-black outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    onClick={runCode}
                    disabled={isRunning}
                >
                    {isRunning ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Running...
                        </>
                    ) : (
                        <>
                            <LuPlay size={16} />
                            Run Code
                        </>
                    )}
                </button>

                {/* Output */}
                <div className="flex flex-col gap-1 flex-1 min-h-0">
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Output</label>
                        <button
                            onClick={copyOutput}
                            title="Copy Output"
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
                        >
                            <LuCopy size={13} />
                            Copy
                        </button>
                    </div>
                    <div className="flex-1 min-h-[120px] w-full overflow-y-auto rounded-xl border border-gray-700 bg-darkHover p-3 text-white">
                        {output ? (
                            <code>
                                <pre className="text-wrap text-sm text-green-400 font-mono">{output}</pre>
                            </code>
                        ) : (
                            <p className="text-gray-500 text-xs font-mono">// Output will appear here...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RunView