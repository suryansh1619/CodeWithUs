import PropTypes from "prop-types";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import TabContext from "../../context/TabContext";
import TABS from "../../utils/tabs";

function TabButton({ tabName, icon }) {
  const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
    useContext(TabContext);
  const { isNewMessage } = useContext(ChatContext);
  const handleTabClick = () => {
    if (tabName === activeTab) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarOpen(true);
      setActiveTab(tabName);
    }
  };
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={handleTabClick}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
        isActive && isSidebarOpen ? "bg-[#00BCD4] text-black" : "text-gray-300 hover:bg-[#1f2937]"
      }`}
      aria-label={tabName}>
      {icon}
      {tabName === TABS.CHATS && isNewMessage && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
      )}
    </button>
  );
}
TabButton.propTypes = {
  tabName: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default TabButton;
