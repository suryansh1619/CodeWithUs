import PropTypes from "prop-types"
import { useContext } from "react"
import Avatar from "react-avatar"
import AppContext from "../context/AppContext"
import ACTIONS from "../utils/action"

function Clients() {
    const { clients } = useContext(AppContext)
    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto">
            <div className="flex w-full flex-wrap justify-start gap-4">
                {clients.map((client) => (
                    <Client key={client.socketId} client={client} />
                ))}
            </div>
        </div>
    )
}
const Client = ({ client }) => {
    const { username, status } = client
    const isOnline = status === ACTIONS.ONLINE
    const title = `${username} - ${isOnline ? "Online" : "Offline"}`
    return (
        <div
            className="relative flex w-[90px] flex-col items-center text-center"
            title={title}>
            <div className="relative">
                <Avatar
                    name={username}
                    size="50"
                    round="12px"
                    alt={username}/>
                <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        isOnline ? "bg-green-500" : "bg-red-500"
                    }`}></span>
            </div>
            <p className="mt-2 line-clamp-2 break-words text-xs text-white">
                {username}
            </p>
        </div>
    )
}
Client.propTypes = {
    client: PropTypes.shape({
        username: PropTypes.string.isRequired,
        socketId: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
}
export default Clients
