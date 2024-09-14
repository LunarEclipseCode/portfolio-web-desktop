import React, { Component, useEffect, useState } from "react";

const Chrome = () => {
  const home_url = "https://www.google.com/webhp?igu=1";
  const dark = useStore((state) => state.dark); // Assuming you use a state manager like Zustand or Context for dark mode

  const [tabs, setTabs] = useState([
    {
      url: home_url,
      display_url: "https://www.google.com",
      title: "Google",
      history: [home_url],
      currentIndex: 0,
    },
  ]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    injectCSS(dark); // Inject CSS with the dark mode state
    let lastVisitedUrl = localStorage.getItem("chrome-url");
    let lastDisplayedUrl = localStorage.getItem("chrome-display-url");

    if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
      setTabs([
        {
          url: lastVisitedUrl,
          display_url: lastDisplayedUrl,
          title: getTitleFromUrl(lastDisplayedUrl),
          history: [lastVisitedUrl],
          currentIndex: 0,
        },
      ]);
      setCurrentTabIndex(0);
    }
  }, [dark]); // Re-run when dark mode changes

  const injectCSS = (dark) => {
    const css = `
      .tab {
        min-width: 100px;
      }

      .dropdown-menu {
        position: absolute;
        top: 2.4em;
        right: 0.25em;
        background: ${dark ? "#222222" : "#ffffff"};
        border: 1px solid ${dark ? "#444444" : "#cccccc"};
        border-radius: 5px;
        padding: 0.4em;
        z-index: 9999;
        min-width: 4.6em;
      }

      .dropdown-menu button {
        display: flex;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: ${dark ? "#ffffff" : "#000000"};
        cursor: pointer;
        padding-left: 0.5em;
        padding-right: 0.5em;
        padding-top: 0.25em;
        padding-bottom: 0.25em;
        border-radius: 0.25em;
      }

      .dropdown-menu button:hover {
        background: ${dark ? "#444444" : "#d4d4d8"};
      }

      .dropdown-icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        background-color: ${dark ? "#222222" : "#d4d4d8"};
        border-radius: 5px;
        transition: background-color 0.2s;
        margin-top: 0.25rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25em;
        margin-right: 0.29rem;
      }

      .dropdown-icon:hover {
        background-color: ${dark ? "#444444" : "#a1a1aa"};
      }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  const storeVisitedUrl = (url, display_url) => {
    localStorage.setItem("chrome-url", url);
    localStorage.setItem("chrome-display-url", display_url);
  };

  const goToHome = () => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, index) =>
        index === currentTabIndex
          ? {
              ...tab,
              url: home_url,
              display_url: "https://www.google.com",
              title: "Google",
              history: [...tab.history, home_url],
              currentIndex: tab.history.length,
            }
          : tab
      )
    );
  };

  const navigateToUrl = (url) => {
    let display_url = url;
    const title = getTitleFromUrl(display_url);

    if (url.includes("google.com")) {
      url = "https://www.google.com/webhp?igu=1";
      display_url = "https://www.google.com";
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab, index) =>
        index === currentTabIndex
          ? {
              ...tab,
              url,
              display_url,
              title,
              history: [...tab.history.slice(0, tab.currentIndex + 1), url],
              currentIndex: tab.currentIndex + 1,
            }
          : tab
      )
    );
    storeVisitedUrl(url, display_url);
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      let url = e.target.value.trim();
      if (url.length === 0) return;

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      url = encodeURI(url);
      navigateToUrl(url);
    }
  };

  const handleDisplayUrl = (e) => {
    const newTabs = [...tabs];
    newTabs[currentTabIndex].display_url = e.target.value;
    setTabs(newTabs);
  };

  const addTab = (url = home_url) => {
    const newTab = {
      url,
      display_url: url,
      title: getTitleFromUrl(url),
      history: [url],
      currentIndex: 0,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setCurrentTabIndex(tabs.length);
  };

  const closeTab = (index) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs];
      newTabs.splice(index, 1);
      setCurrentTabIndex((prevIndex) => (prevIndex >= index ? Math.max(prevIndex - 1, 0) : prevIndex));
      setTabs(newTabs);
    }
  };

  const switchTab = (index) => {
    setCurrentTabIndex(index);
    setIsDropdownOpen(false);
  };

  const getTitleFromUrl = (url) => {
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.split(".");
      if (hostname.startsWith("www.")) {
        return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      } else {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    } catch (error) {
      return "New Tab";
    }
  };

  const goBack = () => {
    const currentTab = tabs[currentTabIndex];
    if (currentTab.currentIndex > 0) {
      const newIndex = currentTab.currentIndex - 1;
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === currentTabIndex
            ? {
                ...tab,
                url: tab.history[newIndex],
                display_url: tab.history[newIndex],
                currentIndex: newIndex,
              }
            : tab
        )
      );
    }
  };

  const goForward = () => {
    const currentTab = tabs[currentTabIndex];
    if (currentTab.currentIndex < currentTab.history.length - 1) {
      const newIndex = currentTab.currentIndex + 1;
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === currentTabIndex
            ? {
                ...tab,
                url: tab.history[newIndex],
                display_url: tab.history[newIndex],
                currentIndex: newIndex,
              }
            : tab
        )
      );
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderTabs = () => {
    const totalTabsWidth = tabs.length * 150;
    const tabWidth = totalTabsWidth > window.innerWidth ? window.innerWidth / tabs.length : 150;

    return (
      <div className="flex overflow-x-auto scrollbar-hide relative mr-16">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center pl-2 pr-1 py-1 mx-0.5 my-1 rounded-md ${
              index === currentTabIndex
                ? "bg-neutral-300 dark:bg-[#111111] dark:text-white"
                : "bg-zinc-300 text-black dark:bg-[#222222] dark:text-gray-400"
            } hover:bg-gray-300 dark:hover:bg-[#444444] tab`}
            style={{
              width: tabWidth,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            <span
              onClick={() => switchTab(index)}
              className="flex-grow cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {tab.title}
            </span>
            <button
              onClick={() => closeTab(index)}
              className="ml-2 mr-0 p-0.5 rounded hover:"
              style={{
                backgroundColor: dark ? "#444444" : "#ffffff",
                
              }}
            >
              <img
                src={dark
                  ? "./themes/Yaru/window/window-close-symbolic-dark.svg"
                  : "./themes/Yaru/window/window-close-symbolic-light.svg" 
                }
                className=""
                alt="close-tab"
              />
            </button>
          </div>
        ))}
        <button
          onClick={() => addTab()}
          className={`px-2 py-1 my-1 ml-0.5 bg-zinc-300 dark:bg-[#222222] text-black dark:text-gray-400 rounded-md hover:bg-zinc-400 dark:hover:bg-[#444444] ${
            totalTabsWidth + 200 > window.innerWidth ? "fixed right-0 mr-8" : ""
          }`}
          style={{ transition: "background-color 0.2s" }}
        >
          +
        </button>
        <DropdownIcon toggleDropdown={toggleDropdown} />
      </div>
    );
  };

  const renderDropdown = () => (
    <div className="dropdown-menu">
      {tabs.map((tab, index) => (
        <button key={index} onClick={() => switchTab(index)}>
          {tab.title}
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-[#333333]">
      <div className="relative">
        {renderTabs()}
        {isDropdownOpen && renderDropdown()}
      </div>
      <ChromeToolbar
        currentTab={tabs[currentTabIndex]}
        goBack={goBack}
        goForward={goForward}
        goToHome={goToHome}
        toggleSidebar={toggleSidebar}
        handleDisplayUrl={handleDisplayUrl}
        checkKey={checkKey}
      />
      <ChromeContent isSidebarOpen={isSidebarOpen} tabs={tabs} currentTabIndex={currentTabIndex} addTab={addTab} />
    </div>
  );
};

const DropdownIcon = ({ toggleDropdown }) => {
  const dark = useStore((state) => state.dark);
  return (
    <div className="dropdown-icon fixed right-0" onClick={toggleDropdown}>
      <svg height="24" viewBox="0 0 24 24" width="24" fill={dark ? "#ffffff" : "#000000"} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.5l-4-4h8z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

const ChromeToolbar = ({ currentTab, goBack, goForward, goToHome, toggleSidebar, handleDisplayUrl, checkKey }) => {
  const dark = useStore((state) => state.dark);

  return (
    <div className={`w-full pb-1 flex justify-start items-center text-sm border-b ${dark ? "text-white border-gray-900" : "text-black border-gray-300"}`}>
      <ToolbarButton 
  icon="./chrome/chrome_back.svg" 
  darkIcon="./chrome/chrome_back_dark.svg" 
  onClick={goBack} 
  disabled={currentTab.currentIndex === 0} 
  dark={dark} 
/>

<ToolbarButton 
  icon="./chrome/chrome_forward.svg" 
  darkIcon="./chrome/chrome_forward_dark.svg" 
  onClick={goForward} 
  disabled={currentTab.currentIndex === currentTab.history.length - 1} 
  dark={dark} 
/>

<ToolbarButton 
  icon="./chrome/chrome_sidebar.svg" 
  darkIcon="./chrome/chrome_sidebar_dark.svg" 
  onClick={toggleSidebar} 
  dark={dark} 
/>

<ToolbarButton 
  icon="./chrome/chrome_home.svg" 
  darkIcon="./chrome/chrome_home_dark.svg" 
  onClick={goToHome} 
  dark={dark} 
/>

      <input
        onKeyDown={checkKey}
        onChange={handleDisplayUrl}
        value={currentTab.display_url}
        id="chrome-url-bar"
        className={`outline-none rounded-full pl-3 pr-3 py-1.5 mr-2 w-full ${
          dark ? "bg-[#111111] text-gray-300 focus:text-white" : "bg-zinc-300 text-black focus:text-black"
        }`}
        type="url"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
};

const ToolbarButton = ({ icon, darkIcon, onClick, disabled, dark }) => (
  <div
    onClick={onClick}
    className={`ml-1 p-1 flex justify-center items-center rounded-full bg-opacity-0 dark:hover:bg-opacity-10 hover:bg-zinc-300 ${
      disabled ? "cursor-not-allowed" : ""
    } ${dark ? "bg-gray-50 hover:bg-gray-50" : "bg-black hover:bg-black"}`}
  >
    <img className="w-6" src={dark ? darkIcon : icon} alt="" />
  </div>
);

  

const ChromeContent = ({ isSidebarOpen, tabs, currentTabIndex, addTab }) => {
  return (
    <div className="flex-grow flex">
      {isSidebarOpen && <Sidebar addTab={addTab} />}
      <div className="flex-grow relative">
        {tabs.map((tab, index) => (
          <iframe
            key={index}
            src={tab.url}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              display: index === currentTabIndex ? "block" : "none",
            }}
            frameBorder="0"
            title={`Tab ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

const Sidebar = ({ addTab }) => {
  return (
    <div className="w-10 bg-zinc-300 dark:bg-[#151515] text-black dark:text-white flex flex-col items-center py-1">
      <SidebarButton onClick={() => addTab("https://www.wikipedia.org")} icon="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png" />
      <SidebarButton onClick={() => addTab("https://archive.org/")} icon="https://archive.org/images/glogo.jpg" />
      <SidebarButton onClick={() => addTab("https://voyant-tools.org")} icon="https://voyant-tools.org/resources/voyant/favicon.ico" />
      <SidebarButton onClick={() => addTab("https://www.youtube.com/embed/Na0w3Mz46GA?si=0QYuqOFJm8BhyLy_")} icon="https://yt3.googleusercontent.com/YijDYAf4ojx4GGtlLjLVqV3f2I0g_imMUA9uavpojQpt0O7xk0K7FSaTHqf6IJSlxFNz_JUI8Q=s160-c-k-c0x00ffffff-no-rj" />
      <SidebarButton onClick={() => addTab("https://www.geogebra.org/calculator")} icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGNpcmNsZSBjeD0iMTc1IiBjeT0iMzM2IiByPSIxMjMiIGZpbGw9IiM5OWYiLz48cGF0aCBmaWxsPSIjNjY2IiBkPSJNMTE5LjY2NyAzNDMuMzg4TDMwMi4zMzMgMjcgNDg1IDM0My4zODgiLz48cGF0aCBmaWxsPSIjOTlmIiBkPSJNMTY5LjExNyAzMTQuODM4TDMwMi4zMzMgODQuMSA0MzUuNTUgMzE0Ljg0Ii8+PHBhdGggZmlsbD0iIzYxNjFmZiIgZD0iTTE0OC45NDQgMzI3bDczLjM5LTEyNC40OTRDMjc5Ljc2NCAyMjkuNDkgMzExLjI4IDI2OS43MiAzMDkuNDM2IDMyN0gxNDguOTQ0eiIvPjxwYXRoIGZpbGw9IiM2NjYiIGQ9Ik0xNzUgNDg2Yy04Mi44NDMgMC0xNTAtNjcuMTU3LTE1MC0xNTBzNjcuMTU3LTE1MCAxNTAtMTUwIDE1MCA2Ny4xNTcgMTUwIDE1MC02Ny4xNTcgMTUwLTE1MCAxNTB6bTEyMy0xNTBjMC02Ny45My01NS4wNy0xMjMtMTIzLTEyM1M1MiAyNjguMDcgNTIgMzM2czU1LjA3IDEyMyAxMjMgMTIzIDEyMy01NS4wNyAxMjMtMTIzeiIvPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0zMjQuODIgMzQzLjM4OEgxMTkuNjY4bDg4LjcxNS0xNTMuNjZhMTQ4Ljc0NSAxNDguNzQ1IDAgMCAxIDI3LjY0NyA5LjIwOGM0Ni4yNjMgMjAuNjMgODAuMTYgNjMuOTk3IDg3LjQ5IDExNS45YTE1MS41MDYgMTUxLjUwNiAwIDAgMSAxLjMgMjguNTUyek0yMjIuNDQgMjIyLjQ4bC01My4zMjMgOTIuMzU4aDEyNy4wN2MtNy4yNTQtNDEuODI1LTM1LjYzLTc2LjQwNi03My43NDItOTIuMzU0Ii8+PC9zdmc+" />
    </div>
  );
};

const SidebarButton = ({ onClick, icon }) => (
  <button onClick={onClick} className="mb-1.5">
    <img src={icon} className="w-9 h-9 rounded-full hover:bg-gray-300 dark:hover:bg-[#444444] p-1" />
  </button>
);

export default Chrome;

export const displayChrome = () => {
  return <Chrome />;
};
