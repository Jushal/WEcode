import { useAppContext } from "@/context/AppContext"
import { useChatRoom } from "@/context/ChatContext"
import { useSocket } from "@/context/SocketContext"
import { ChatMessage } from "@/types/chat"
import { SocketEvent } from "@/types/socket"
import { formatDate } from "@/utils/formateDate"
import { FormEvent, useRef } from "react"
import { LuSendHorizonal } from "react-icons/lu"
import { v4 as uuidV4 } from "uuid"

function ChatInput() {
    const { currentUser } = useAppContext()
    const { socket } = useSocket()
    const { setMessages } = useChatRoom()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inputVal = inputRef.current?.value.trim()
        if (inputVal && inputVal.length > 0) {
            const message: ChatMessage = {
                id: uuidV4(),
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            }
            socket.emit(SocketEvent.SEND_MESSAGE, { message })
            setMessages((messages) => [...messages, message])
            if (inputRef.current) inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 p-2 border-t border-gray-700"
        >
            <input
                type="text"
                className="flex-grow rounded-xl border border-gray-700 bg-darkHover px-4 py-2.5 text-white text-sm outline-none placeholder-gray-500 focus:border-primary/50 transition-colors"
                placeholder="Type a message..."
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-black hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex-shrink-0"
                type="submit"
            >
                <LuSendHorizonal size={18} />
            </button>
        </form>
    )
}

export default ChatInput