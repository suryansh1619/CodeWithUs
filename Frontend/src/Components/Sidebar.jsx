import { useContext } from "react";
import TabContext from "../context/TabContext";
import useResponsive from "../hooks/useResponsive";
import TABS from "../utils/tabs";
import TabButton from "../Components/Tabs/TabButton";

function Sidebar() {
  const { activeTab, isSidebarOpen, tabComponents, tabIcons } =
    useContext(TabContext);
  const { isMobileSidebarOpen } = useResponsive();
  return (
    <aside className="flex w-full md:h-full md:w-auto text-gray-100 font-sans">
      <div
        className={`fixed bottom-0 left-0 z-50 flex h-[60px] w-full items-center justify-around gap-4 border-t border-[#1f2937] bg-[#0e1117] p-2 md:hidden ${
          isMobileSidebarOpen ? "flex" : "hidden"
        }`}>
        <TabButton tabName={TABS.FILES} icon={tabIcons[TABS.FILES]} />
        <TabButton tabName={TABS.CHATS} icon={tabIcons[TABS.CHATS]} />
        <TabButton tabName={TABS.CLIENTS} icon={tabIcons[TABS.CLIENTS]} />
        <TabButton tabName={TABS.SETTINGS} icon={tabIcons[TABS.SETTINGS]} />
      </div>
      <div
        className={`hidden md:flex md:h-full md:w-[60px] md:flex-col md:items-center md:gap-6 md:border-r md:border-[#1f2937] md:bg-[#0e1117] md:p-3`}>
        <TabButton tabName={TABS.FILES} icon={tabIcons[TABS.FILES]} />
        <TabButton tabName={TABS.CHATS} icon={tabIcons[TABS.CHATS]} />
        <TabButton tabName={TABS.CLIENTS} icon={tabIcons[TABS.CLIENTS]} />
        <TabButton tabName={TABS.SETTINGS} icon={tabIcons[TABS.SETTINGS]} />
      </div>
      <div
        className={`absolute left-0 top-0 z-30 w-full flex-grow bg-[#1a1f2e] transition-all md:static md:w-[300px] ${
          isSidebarOpen ? "block" : "hidden"
        }`}>
        {tabComponents[activeTab]}
      </div>
    </aside>
  );
}
export default Sidebar;
