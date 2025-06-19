import { useContext } from "react";
import FileContext from "../../context/FileContext";
import Editor from "./Editor";

function EditorComponent() {
  const { currentFile } = useContext(FileContext);
  return (
    <div className="tab-height absolute left-0 top-0 w-full max-w-full flex-grow overflow-x-hidden md:static bg-[#0e1117] text-gray-100 font-sans">
      {currentFile !== null ? (
        <Editor />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#00BCD4] mb-2">
              No File Open
            </h1>
            <p className="text-gray-400">
              Please open or upload a file to start editing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default EditorComponent;
