import ChatInput from "../Chats/ChatInput"
import ChatList from "../Chats/ChatList"

function ChatsTab() {
    return (
        <div className="tab-height flex h-full w-full flex-col p-4 bg-[#1a1f2e]">
            <h1 className="mb-2 text-base font-semibold text-white">Group Chat</h1>
            <div className="flex-grow overflow-y-auto">
                <ChatList />
            </div>
            <div className="mt-4">
                <ChatInput />
            </div>
        </div>
    )
}
export default ChatsTab
