import { useContext } from "react";
import { color } from "@uiw/codemirror-extensions-color";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import CodeMirror from "@uiw/react-codemirror";
import AppContext from "../../context/AppContext";
import FileContext from "../../context/FileContext";
import usePageEvents from "../../hooks/usePageEvents";
import { editorLanguages } from "../../resources/Languages";
import { editorThemes } from "../../resources/Themes";
import ACTIONS from "../../utils/action";
import placeholder from "../../utils/editorPlaceholder";

function Editor() {
  const { socket, settings, roomId } = useContext(AppContext);
  const { currentFile, setCurrentFile } = useContext(FileContext);
  const { theme, language, fontSize } = settings;
  const onCodeChange = (code) => {
    const file = { ...currentFile, content: code };
    setCurrentFile(file);
    socket.emit(ACTIONS.FILE_UPDATED, { file, roomId });
  };
  usePageEvents();
  return (
    <div className="w-full h-full bg-[#0e1117] text-gray-100 font-sans overflow-hidden">
      <CodeMirror
        placeholder={placeholder(currentFile.name)}
        mode={language.toLowerCase()}
        theme={editorThemes[theme]}
        onChange={onCodeChange}
        value={currentFile.content}
        extensions={[editorLanguages[language], color, hyperLink]}
        minHeight="100%"
        maxWidth="100vw"
        style={{
          fontSize: `${fontSize}px`,
          backgroundColor: "#0e1117",
        }}
        className="h-full w-full tab-height"/>
    </div>
  );
}
export default Editor;
