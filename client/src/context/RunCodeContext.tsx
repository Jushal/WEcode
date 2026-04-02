import axiosInstance from "@/api/"
import { Language, RunContext as RunContextType } from "@/types/run"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"

const RunCodeContext = createContext<RunContextType | null>(null)

export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error(
            "useRunCode must be used within a RunCodeContextProvider",
        )
    }
    return context
}

const supportedLanguagesList: Language[] = [
    { language: "javascript", version: "latest", aliases: ["js"] },
    { language: "typescript", version: "latest", aliases: ["ts"] },
    { language: "python", version: "latest", aliases: ["py"] },
    { language: "java", version: "latest", aliases: ["java"] },
    { language: "cpp", version: "latest", aliases: ["cpp"] },
    { language: "c", version: "latest", aliases: ["c"] },
    { language: "csharp", version: "latest", aliases: ["cs"] },
    { language: "go", version: "latest", aliases: ["go"] },
    { language: "ruby", version: "latest", aliases: ["rb"] },
    { language: "php", version: "latest", aliases: ["php"] },
    { language: "swift", version: "latest", aliases: ["swift"] },
    { language: "kotlin", version: "latest", aliases: ["kt"] },
    { language: "rust", version: "latest", aliases: ["rs"] },
]

const glotLanguageMap: Record<string, string> = {
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    typescript: "typescript",
    py: "python",
    python: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    csharp: "csharp",
    go: "go",
    rb: "ruby",
    ruby: "ruby",
    php: "php",
    swift: "swift",
    kt: "kotlin",
    kotlin: "kotlin",
    rs: "rust",
    rust: "rust",
}

const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile } = useFileSystem()
    const [_input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({
        language: "",
        version: "",
        aliases: [],
    })

    useEffect(() => {
        setSupportedLanguages(supportedLanguagesList)
    }, [])

    useEffect(() => {
        if (!activeFile?.name) return
        const extension = activeFile.name.split(".").pop()
        if (extension) {
            const glotLang = glotLanguageMap[extension.toLowerCase()]
            const language = supportedLanguagesList.find(
                (lang) => lang.language === glotLang,
            )
            if (language) setSelectedLanguage(language)
        } else {
            setSelectedLanguage({ language: "", version: "", aliases: [] })
        }
    }, [activeFile?.name])

    const runCode = async () => {
        try {
            if (!selectedLanguage.language) {
                return toast.error("Please select a language to run the code")
            } else if (!activeFile) {
                return toast.error("Please open a file to run the code")
            } else {
                toast.loading("Running code...")
            }

            setIsRunning(true)

            const response = await axiosInstance.post("/run", {
                language: selectedLanguage.language,
                code: activeFile.content,
            })

            if (response.data.stderr) {
                setOutput(response.data.stderr)
            } else {
                setOutput(response.data.stdout)
            }

            setIsRunning(false)
            toast.dismiss()
        } catch (error: any) {
            console.error(error)
            setIsRunning(false)
            toast.dismiss()
            toast.error("Failed to run the code")
        }
    }

    return (
        <RunCodeContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                supportedLanguages,
                selectedLanguage,
                setSelectedLanguage,
                runCode,
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}

export { RunCodeContextProvider }
export default RunCodeContext