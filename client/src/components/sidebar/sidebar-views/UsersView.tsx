import Users from "@/components/common/Users"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast"
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

function UsersView() {
    const navigate = useNavigate()
    const { viewHeight } = useResponsive()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", { replace: true })
    }

    return (
        <div className="flex flex-col p-4 gap-3" style={{ height: viewHeight }}>
            
            {/* Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h1 className="text-sm font-bold text-white tracking-wider uppercase">Users</h1>
            </div>

            {/* Users list */}
            <div className="flex-1 overflow-y-auto">
                <Users />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-700">
                <div className="flex gap-2">
                    {/* Share button */}
                    <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-darkHover border border-gray-700 p-2.5 text-gray-300 hover:border-primary/50 hover:text-white transition-all text-xs font-medium"
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <IoShareOutline size={18} />
                        Share
                    </button>
                    {/* Copy URL button */}
                    <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-darkHover border border-gray-700 p-2.5 text-gray-300 hover:border-primary/50 hover:text-white transition-all text-xs font-medium"
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <LuCopy size={16} />
                        Copy Link
                    </button>
                </div>
                {/* Leave room button */}
                <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-2.5 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all text-sm font-medium"
                    onClick={leaveRoom}
                    title="Leave room"
                >
                    <GoSignOut size={18} />
                    Leave Room
                </button>
            </div>
        </div>
    )
}

export default UsersView