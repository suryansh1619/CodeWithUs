import { useContext, useEffect, useRef } from "react"
import AppContext from "../../context/AppContext"
import ChatContext from "../../context/ChatContext"

function ChatList() {
    const {
        messages,
        isNewMessage,
        setIsNewMessage,
        lastScrollHeight,
        setLastScrollHeight,
    } = useContext(ChatContext)
    const { socket } = useContext(AppContext)
    const messagesContainerRef = useRef(null)
    const handleScroll = (e) => {
        setLastScrollHeight(e.target.scrollTop)
    }
    useEffect(() => {
        const container = messagesContainerRef.current
        if (container) {
            container.scrollTop = container.scrollHeight
        }
    }, [messages])
    useEffect(() => {
        if (isNewMessage) {
            setIsNewMessage(false)
        }
        const container = messagesContainerRef.current
        if (container) {
            container.scrollTop = lastScrollHeight
        }
    }, [isNewMessage, setIsNewMessage, lastScrollHeight])
    return (
        <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex flex-col gap-2 flex-grow overflow-y-auto rounded-md border-t-4 border-[#00BCD4] bg-[#273349] p-2">
            {messages.map((message, index) => {
                const isOwnMessage = message.socketId === socket.id
                return (
                    <div
                        key={index}
                        className={`max-w-[80%] break-words rounded-md bg-dark px-3 py-2 shadow-md ${
                            isOwnMessage ? "self-end ml-auto" : "self-start"
                        }`}>
                        <div className="flex justify-between items-center text-xs text-gray-300">
                            <span className="text-[#00BCD4]">{message.username}</span>
                            <span className="ml-2">{message.timestamp}</span>
                        </div>
                        <p className="pt-1 text-sm text-white">
                            {message.message}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
export default ChatList
