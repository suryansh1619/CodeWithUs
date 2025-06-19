import { useContext, useEffect } from "react"
import AppContext from "../../context/AppContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import { editorFonts } from "../../resources/Font"
import { editorLanguages } from "../../resources/Languages"
import { editorThemes } from "../../resources/Themes"
import Select from "../Select"

function SettingsTab() {
    const { settings, updateSettings } = useContext(AppContext)
    const { theme, language, fontFamily, fontSize } = settings
    const { setItem } = useLocalStorage()
    const handleFontFamilyChange = (e) => {
        const fontFamily = e.target.value
        updateSettings((prev) => ({ ...prev, fontFamily }))
        setItem("settings", JSON.stringify({ ...settings, fontFamily }))
    }
    const handleThemeChange = (e) => {
        const theme = e.target.value
        updateSettings((prev) => ({ ...prev, theme }))
        setItem("settings", JSON.stringify({ ...settings, theme }))
    }
    const handleLanguageChange = (e) => {
        const language = e.target.value
        updateSettings((prev) => ({ ...prev, language }))
        setItem("settings", JSON.stringify({ ...settings, language }))
    }
    const handleFontSizeChange = (e) => {
        const fontSize = e.target.value
        updateSettings((prev) => ({ ...prev, fontSize }))
        setItem("settings", JSON.stringify({ ...settings, fontSize }))
    }
    useEffect(() => {
        const editor = document.querySelector(".cm-editor > .cm-scroller")
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])
    return (
        <div className="tab-height flex flex-col gap-4 bg-[#1a1f2e] p-4">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:w-[70%]">
                    <Select
                        onChange={handleFontFamilyChange}
                        value={fontFamily}
                        options={editorFonts}
                        title="Font Family"/>
                </div>
                <div className="w-full sm:w-[30%]">
                    <label className="mb-1 block text-sm text-white">Font Size</label>
                    <select
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="w-full rounded-md border border-darkBorder bg-[#273349] px-4 py-2 text-white outline-none"
                        title="Font Size">
                        {[...Array(13).keys()].map((size) => (
                            <option key={size} value={16+size*2}>
                                {16+size*2}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={editorThemes}
                title="Theme"/>
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={editorLanguages}
                title="Language"/>
        </div>
    )
}
export default SettingsTab
