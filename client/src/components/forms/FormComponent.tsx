import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room id")
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: { username },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-darkHover border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/50">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Join a Room</h2>
                    <p className="text-gray-400 text-sm mt-1">Enter room ID and your username</p>
                </div>

                <form onSubmit={joinRoom} className="flex flex-col gap-4">
                    
                    {/* Room ID Input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Room ID</label>
                        <input
                            type="text"
                            name="roomId"
                            placeholder="Enter room ID..."
                            className="w-full rounded-xl border border-gray-600 bg-dark px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            onChange={handleInputChanges}
                            value={currentUser.roomId}
                        />
                    </div>

                    {/* Username Input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username..."
                            className="w-full rounded-xl border border-gray-600 bg-dark px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            onChange={handleInputChanges}
                            value={currentUser.username}
                            ref={usernameRef}
                        />
                    </div>

                    {/* Join Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-primary px-8 py-3 text-lg font-bold text-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95"
                    >
                        Join Room →
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span className="text-gray-500 text-xs">OR</span>
                    <div className="flex-1 h-px bg-gray-700" />
                </div>

                {/* Generate Room ID */}
                <button
                    className="w-full py-3 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-all"
                    onClick={createNewRoomId}
                >
                    + Generate Unique Room ID
                </button>
            </div>
        </div>
    )
}

export default FormComponent