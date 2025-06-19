import { useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FileArrowUp,
  DownloadSimple,
  ArchiveBox,
} from "@phosphor-icons/react";
import FileContext from "../../context/FileContext";
import { fileExtensionsArray as AllowedFileTypes } from "../../resources/Languages";
import FileSystem from "../Files/FileSystem";

function FilesTab() {
  const {
    currentFile,
    setCurrentFile,
    updateFile,
    setFiles,
    downloadCurrentFile,
    downloadAllFiles,
  } = useContext(FileContext);

  const fileInputRef = useRef(null);

  const handleOpenFile = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const file = {
        id: uuidv4(),
        name: selectedFile.name,
        content: text,
      };

      // Save current file before opening new file
      updateFile(currentFile?.id, currentFile?.content);
      setFiles((prev) => [...prev, file]);
      setCurrentFile(file);
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="tab-height flex flex-col gap-4 bg-[#1a1f2e] text-gray-100 p-4 font-sans">
      {/* File Explorer */}
      <FileSystem />

      {/* File Actions */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          className="flex items-center gap-3 rounded-lg bg-[#1f2937] px-4 py-2 hover:bg-[#273349] transition-all"
          onClick={handleOpenFile}
        >
          <FileArrowUp size={22} className="text-[#00BCD4]" />
          <span>Open File</span>
        </button>

        <button
          className="flex items-center gap-3 rounded-lg bg-[#1f2937] px-4 py-2 hover:bg-[#273349] transition-all"
          onClick={downloadCurrentFile}
        >
          <DownloadSimple size={22} className="text-[#00BCD4]" />
          <span>Download File</span>
        </button>

        <button
          className="flex items-center gap-3 rounded-lg bg-[#1f2937] px-4 py-2 hover:bg-[#273349] transition-all"
          onClick={downloadAllFiles}
        >
          <ArchiveBox size={22} className="text-[#00BCD4]" />
          <span>Download All Files</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        hidden
        onChange={onFileChange}
        ref={fileInputRef}
        accept={AllowedFileTypes.join(",")}
      />
    </div>
  );
}

export default FilesTab;
