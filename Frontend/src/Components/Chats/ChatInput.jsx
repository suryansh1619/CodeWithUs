import { useContext, useRef } from "react"
import { PaperPlaneRight } from "@phosphor-icons/react"
import AppContext from "../../context/AppContext"
import ChatContext from "../../context/ChatContext"
import ACTIONS from "../../utils/action"
import { formatDate } from "../../utils/formateData"

function ChatInput() {
    const { socket, clients, roomId } = useContext(AppContext)
    const { setMessages } = useContext(ChatContext)
    const inputRef = useRef(null)
    const handleSendMessage = (e) => {
        e.preventDefault()
        const inputVal = inputRef.current.value.trim()
        const client = clients.find((client) => client.socketId === socket.id)
        if (inputVal) {
            const message = {
                message: inputVal,
                username: client?.username || "Unknown",
                socketId: socket.id,
                timestamp: formatDate(new Date()),
            }
            socket.emit(ACTIONS.SEND_MESSAGE, { roomId, message })
            setMessages((prev) => [...prev, message])
            inputRef.current.value = ""
        }
    }
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex items-center rounded-md border border-[#00BCD4] bg-[#273349]">
            <input
                type="text"
                ref={inputRef}
                placeholder="Type a message..."
                className="flex-grow bg-transparent px-3 py-2 text-white placeholder-gray-400 outline-none"
                autoComplete="off"
                aria-label="Message input"/>
            <button
                type="submit"
                className="flex items-center justify-center rounded-r-md bg-[#00BCD4] p-2 text-black transition hover:brightness-110 active:scale-95"
                aria-label="Send message">
                <PaperPlaneRight size={22} weight="fill" />
            </button>
        </form>
    )
}
export default ChatInput
