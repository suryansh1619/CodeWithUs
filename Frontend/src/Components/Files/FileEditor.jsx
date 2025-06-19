import PropTypes from "prop-types"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Check, X } from "@phosphor-icons/react"
import FileContext from "../../context/FileContext"

function FileEditor({ editingFileId, setEditingFileId, name }) {
    const [fileName, setFileName] = useState(name)
    const { renameFile, openFile } = useContext(FileContext)
    const handleInputChange = (e) => {
        setFileName(e.target.value)
    }
    const handleConfirm = (e) => {
        e.preventDefault()
        if (!fileName.trim()) {
            toast.error("File name cannot be empty")
            return
        }
        if (fileName.length > 25) {
            toast.error("File name cannot be longer than 25 characters")
            return
        }
        if (fileName === name) {
            toast.error("File name is unchanged")
            return
        }
        const isRenamed = renameFile(editingFileId, fileName.trim())
        openFile(editingFileId)
        if (!isRenamed) {
            toast.error("A file with the same name already exists")
        } else {
            setEditingFileId(null)
        }
    }
    const handleCancel = () => {
        setEditingFileId(null)
    }
    return (
        <form
            onSubmit={handleConfirm}
            className="mb-2 flex items-center gap-3 rounded-md bg-darkHover p-2">
            <input
                type="text"
                value={fileName}
                onChange={handleInputChange}
                autoFocus
                maxLength={30}
                placeholder="Enter file name"
                className="flex-grow rounded-md bg-white px-2 py-1 text-sm text-black outline-none"/>
            <div className="flex gap-2">
                <button type="submit" title="Confirm">
                    <Check size={20} weight="bold" className="text-green-500 hover:text-green-400" />
                </button>
                <button type="button" onClick={handleCancel} title="Cancel">
                    <X size={20} weight="bold" className="text-red-500 hover:text-red-400" />
                </button>
            </div>
        </form>
    )
}
FileEditor.propTypes = {
    editingFileId: PropTypes.string.isRequired,
    setEditingFileId: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}
export default FileEditor
