import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs";

const editorLanguages = {}
const fileExtensions = {
    c: ".c",
    cpp: ".cpp",
    java: ".java",
    python: ".py",
    javascript: ".js",
    typescript: ".ts",
    tsx: ".tsx",
    jsx: ".jsx",
    html: ".html",
    css: ".css",
    json: ".json",
    sql: ".sql",
    mysql: ".sql",
    pgsql: ".pgsql",
    php: ".php",
    ruby: ".rb",
    go: ".go",
    rust: ".rs",
    kotlin: ".kt",
    swift: ".swift",
    shell: ".sh",
    powershell: ".ps1",
    bash: ".sh",
    markdown: ".md",
    yaml: ".yaml",
    xml: ".xml",
    dockerfile: ".dockerfile",
    vue: ".vue",
    angular: ".ng",
    dart: ".dart",
    r: ".r",
    scala: ".scala",
    csharp: ".cs",
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
const allowedLangs = Object.keys(fileExtensions)
for (const lang of langNames) {
    if (allowedLangs.includes(lang)) {
        editorLanguages[capitalizeFirstLetter(lang)] = loadLanguage(lang)
    }
}
export { editorLanguages }
const fileExtensionsArray = Object.values(fileExtensions)
export { fileExtensionsArray }
const getFileExtension = (langName) => {
    try {
        return fileExtensions[langName.toLowerCase()]
    } catch (e) {
        console.log(e)
        return null
    }
}
const getLanguageName = (filename) => {
    let extension = filename.split(".").pop()
    extension = "." + extension
    try {
        for (const [language, ext] of Object.entries(fileExtensions)) {
            if (ext === extension.toLowerCase()) {
                return capitalizeFirstLetter(language)
            }
        }
    } 
    catch (e) {
        return null
    }
}
export { getFileExtension, getLanguageName }