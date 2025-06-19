import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../context/AppContext";

function FormComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const {
    setRoomId: setRoomIdToContext,
    setUsername: setUsernameToContext,
    username: usernameInContext,
  } = useContext(AppContext);
  const usernameRef = useRef(null);
  const createNewRoomId = () => {
    setRoomId(uuidv4());
    toast.success("Created a new ROOM Id");
    usernameRef.current.focus();
  };
  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error("ROOM Id & username is required");
      return;
    } 
    else if (roomId.length < 5) {
      toast.error("ROOM Id must be at least 5 characters long");
      return;
    } 
    else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }
    setRoomIdToContext(roomId);
    setUsernameToContext(username);
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };
  useEffect(() => {
    if (location.state?.roomId) {
      setRoomId(location.state.roomId);
      if (usernameInContext.length === 0) {
        toast.success("Enter your username");
      }
    }
  }, [location.state?.roomId, usernameInContext]);
  return (
    <div className="w-full max-w-[500px] flex flex-col items-center justify-center gap-6 px-6 py-10 bg-[#1a1f2e] rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-[#00BCD4]">Live-Code-Share</h1>
      <form onSubmit={joinRoom} className="w-full flex flex-col gap-4">
        <input
          type="text"
          name="roomId"
          placeholder="Enter Room ID"
          className="w-full rounded-md bg-[#0e1117] text-white border border-[#334155] px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          autoFocus/>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          className="w-full rounded-md bg-[#0e1117] text-white border border-[#334155] px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}/>
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-[#00BCD4] px-8 py-3 text-lg font-semibold text-black hover:bg-cyan-400 transition">
          Join Room
        </button>
      </form>
      <button
        className="text-sm text-gray-400 underline hover:text-white transition"
        onClick={createNewRoomId}>
        Generate Unique Room ID
      </button>
    </div>
  );
}
export default FormComponent;
