import { useContext, useRef, useState } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Icon } from "@iconify/react";
import FileContext from "../../context/FileContext";
import TabContext from "../../context/TabContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { getIconClassName } from "../../utils/getIconClassName";
import FileEditor from "./FileEditor";

function FileSystem() {
  const filesContentRef = useRef(null);
  const { files, currentFile, openFile, deleteFile, createFile } = useContext(FileContext);
  const [editingFileId, setEditingFileId] = useState(null);
  const { setIsSidebarOpen } = useContext(TabContext);
  const { isMobile } = useWindowDimensions();
  const handleRenameFile = (e, id) => {
    e.stopPropagation();
    setEditingFileId(id);
  };
  const handleCreateNewFile = () => {
    const id = createFile("Untitled");
    setEditingFileId(id);
  };
  const handleDeleteFile = (e, id, name) => {
    e.stopPropagation();
    const isConfirmed = confirm(`Are you sure you want to delete "${name}"?`);
    if (isConfirmed) deleteFile(id);
  };
  const handleFileClick = (id) => {
    setEditingFileId(null);
    openFile(id);
    if (isMobile) setIsSidebarOpen(false);
  };
  const fileSelectedClass = (id) =>
    currentFile && currentFile.id === id ? "bg-[#273349]" : "hover:bg-[#1f2937]";
  return (
    <div className="flex h-full flex-col">
      <div className="pb-2">
        <h1 className="text-lg font-semibold text-white">Files ({files.length})</h1>
      </div>
      <div
        className="flex-grow overflow-auto px-2 max-h-full"
        onClick={(e) => e.stopPropagation()}
        ref={filesContentRef}>
        {files.map((file) =>
          editingFileId !== file.id ? (
            <div
              key={file.id}
              className={`mb-2 flex items-center rounded-md p-2 transition-all cursor-pointer ${fileSelectedClass(file.id)}`}
              onClick={() => handleFileClick(file.id)}>
              <Icon
                icon={getIconClassName(file.name)}
                fontSize={24}
                className="text-[#00BCD4] mr-2"/>
              <p
                className="line-clamp-1 flex-grow truncate text-gray-100"
                title={file.name}>
                {file.name}
              </p>
              <div className="flex items-center gap-3 ml-2">
                <button
                  onClick={(e) => handleRenameFile(e, file.id)}
                  title="Rename">
                  <PencilSimple size={18} weight="fill" className="text-gray-300 hover:text-white" />
                </button>
                <button
                  onClick={(e) => handleDeleteFile(e, file.id, file.name)}
                  title="Delete">
                  <Trash size={18} weight="fill" className="text-red-500 hover:text-red-400" />
                </button>
              </div>
            </div>
          ) : (
            <FileEditor
              key={file.id}
              editingFileId={editingFileId}
              setEditingFileId={setEditingFileId}
              name={file.name}/>
          )
        )}
      </div>
      <div className="mt-auto pt-2">
        <button
          onClick={handleCreateNewFile}
          className="w-full rounded-md bg-[#00BCD4] px-4 py-2 text-center font-semibold text-black hover:brightness-110 transition-all">
          + New File
        </button>
      </div>
    </div>
  );
}
export default FileSystem;
