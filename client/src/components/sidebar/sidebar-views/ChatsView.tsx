import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"
import useResponsive from "@/hooks/useResponsive"

const ChatsView = () => {
    const { viewHeight } = useResponsive()

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h1 className="text-sm font-bold text-white tracking-wider uppercase">Group Chat</h1>
            </div>

            {/* Chat list */}
            <ChatList />

            {/* Chat input */}
            <ChatInput />
        </div>
    )
}

export default ChatsView