import { useAppContext } from "@/context/AppContext"
import { useChatRoom } from "@/context/ChatContext"
import { SyntheticEvent, useEffect, useRef } from "react"

function ChatList() {
    const {
        messages,
        isNewMessage,
        setIsNewMessage,
        lastScrollHeight,
        setLastScrollHeight,
    } = useChatRoom()
    const { currentUser } = useAppContext()
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)

    const handleScroll = (e: SyntheticEvent) => {
        const container = e.target as HTMLDivElement
        setLastScrollHeight(container.scrollTop)
    }

    useEffect(() => {
        if (!messagesContainerRef.current) return
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (isNewMessage) setIsNewMessage(false)
        if (messagesContainerRef.current)
            messagesContainerRef.current.scrollTop = lastScrollHeight
    }, [isNewMessage, setIsNewMessage, lastScrollHeight])

    return (
        <div
            className="flex-grow overflow-y-auto p-3 flex flex-col gap-2"
            ref={messagesContainerRef}
            onScroll={handleScroll}
        >
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-600">
                    <span className="text-3xl">💬</span>
                    <p className="text-xs">No messages yet</p>
                </div>
            )}
            {messages.map((message, index) => {
                const isMe = message.username === currentUser.username
                return (
                    <div
                        key={index}
                        className={`flex flex-col max-w-[80%] gap-1 ${isMe ? "ml-auto items-end" : "items-start"}`}
                    >
                        {/* Username + time */}
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-[10px] text-primary font-medium">
                                {isMe ? "You" : message.username}
                            </span>
                            <span className="text-[10px] text-gray-600">
                                {message.timestamp}
                            </span>
                        </div>
                        {/* Message bubble */}
                        <div className={`px-3 py-2 rounded-2xl text-sm break-words ${
                            isMe
                                ? "bg-primary text-black rounded-tr-sm"
                                : "bg-darkHover text-white border border-gray-700 rounded-tl-sm"
                        }`}>
                            {message.message}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatList