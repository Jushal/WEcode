import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"

function SettingsView() {
    const {
        theme, setTheme,
        language, setLanguage,
        fontSize, setFontSize,
        fontFamily, setFontFamily,
        showGitHubCorner, setShowGitHubCorner,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => setFontSize(parseInt(e.target.value))
    const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) => setShowGitHubCorner(e.target.checked)

    useEffect(() => {
        const editor = document.querySelector(".cm-editor > .cm-scroller") as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col gap-4 p-4"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h1 className="text-sm font-bold text-white tracking-wider uppercase">Settings</h1>
            </div>

            {/* Font Family + Size */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Font</label>
                <div className="flex gap-2">
                    <Select
                        onChange={handleFontFamilyChange}
                        value={fontFamily}
                        options={editorFonts}
                        title="Font Family"
                    />
                    <select
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="rounded-xl border border-gray-700 bg-darkHover px-3 py-2 text-white outline-none text-sm hover:border-primary/50 transition-colors"
                        title="Font Size"
                    >
                        {[...Array(13).keys()].map((size) => (
                            <option key={size} value={size + 12}>{size + 12}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Theme */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Theme</label>
                <Select
                    onChange={handleThemeChange}
                    value={theme}
                    options={Object.keys(editorThemes)}
                    title="Theme"
                />
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Language</label>
                <Select
                    onChange={handleLanguageChange}
                    value={language}
                    options={langNames}
                    title="Language"
                />
            </div>

            {/* GitHub Corner Toggle */}
            <div className="flex w-full items-center justify-between py-2 px-1">
                <label className="text-sm text-gray-300">Show GitHub corner</label>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        onChange={handleShowGitHubCornerChange}
                        checked={showGitHubCorner}
                    />
                    <div className="peer h-6 w-12 rounded-full bg-darkHover border border-gray-700 outline-none duration-100 after:absolute after:left-1 after:top-1 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-white after:font-bold after:outline-none after:duration-500 peer-checked:bg-primary/20 peer-checked:border-primary/50 peer-checked:after:translate-x-6 peer-checked:after:bg-primary peer-focus:outline-none" />
                </label>
            </div>

            {/* Reset Button */}
            <button
                className="mt-auto w-full rounded-xl border border-gray-700 bg-darkHover px-4 py-2.5 text-sm text-gray-300 hover:border-primary/50 hover:text-white transition-all"
                onClick={resetSettings}
            >
                Reset to default
            </button>
        </div>
    )
}

export default SettingsView