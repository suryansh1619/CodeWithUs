const fonts = [
    "Cascadia Code",
    "Consolas",
    "Courier New",
    "Fira Code",
    "Inconsolata",
    "JetBrains Mono",
    "Menlo",
    "Monaco",
    "Source Code Pro",
    "Ubuntu Mono",
];  

const editorFonts = {}
for (const font of fonts) {
    editorFonts[font] = font
}
console.log(editorFonts)
export { editorFonts }