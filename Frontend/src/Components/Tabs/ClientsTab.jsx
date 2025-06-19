import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Copy, Export, SignOut } from "@phosphor-icons/react"
import Clients from "../Clients"

function ClientsTab() {
    const navigate = useNavigate()
    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.error(error)
        }
    }
    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } 
        catch (error) {
            toast.error("Unable to share URL")
            console.error(error)
        }
    }
    const leaveRoom = () => {
        navigate("/")
    }
    return (
        <div className="tab-height flex flex-col justify-between p-4 bg-[#1a1f2e]">
            <div>
                <h1 className="pb-4 text-base">Clients</h1>
                <Clients />
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
                <div className="flex w-full gap-4">
                    <button
                        className="flex flex-1 items-center justify-center rounded-md bg-[#273349] p-3 text-black transition hover:brightness-110 active:scale-95"
                        onClick={shareURL}
                        aria-label="Share room link">
                        <Export size={24} />
                    </button>
                    <button
                        className="flex flex-1 items-center justify-center rounded-md bg-[#273349] p-3 text-black transition hover:brightness-110 active:scale-95"
                        onClick={copyURL}
                        aria-label="Copy room link">
                        <Copy size={24} />
                    </button>
                    <button
                        className="flex flex-1 items-center justify-center rounded-md bg-[#00BCD4] p-3 text-black transition hover:brightness-110 active:scale-95"
                        onClick={leaveRoom}
                        aria-label="Leave room">
                        <SignOut size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ClientsTab
