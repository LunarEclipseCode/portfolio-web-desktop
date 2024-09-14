import React, { Component } from "react";

export class VMBox extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [
        {
          url: "https://xp.quenq.com/",
          display_url: "https://xp.quenq.com",
          title: "Windows XP",
          icon: "https://xp.quenq.com/favicon.png",
        },
        {
          url: "https://dustinbrett.com",
          display_url: "https://dustinbrett.com",
          title: "Daedal OS",
          icon: "https://dustinbrett.com/Users/Public/Icons/144x144/brain.webp",
        },
        {
          url: "https://vivek9patel.github.io",
          display_url: "https://vivek9patel.github.io",
          title: "Ubuntu",
          icon: "https://vivek9patel.github.io/images/logos/fevicon.svg",
        },
        {
          url: "https://portfolio.zxh.me",
          display_url: "https://portfolio.zxh.me",
          title: "Playground MacOS",
          icon: "https://portfolio.zxh.me/img/ui/avatar.jpg",
        },
        {
          url: "https://os.prozilla.dev",
          display_url: "https://os.prozilla.dev",
          title: "Prozilla OS",
          icon: "https://os.prozilla.dev//favicon.ico",
        },
        {
          url: "https://pluto-app.zeon.dev",
          display_url: "https://pluto-app.zeon.dev",
          title: "Pluto OS",
          icon: "https://pluto-app.zeon.dev/assets/user-avatar.svg",
        },
        {
          url: "https://nenrikido.neocities.org",
          display_url: "https://nenrikido.neocities.org",
          title: "Nenrikido",
          icon: "https://nenrikido.neocities.org/images/icons/pink-favicon.svg",
        },
        {
          url: "https://tjy-gitnub.github.io/win12/desktop.html",
          display_url: "https://tjy-gitnub.github.io/win12/desktop.html",
          title: "Windows 12",
          icon: "https://raw.githubusercontent.com/tjy-gitnub/win12/main/icon/windows12.svg",
        },
        {
          url: "https://mmuii.github.io/jsdesk",
          display_url: "https://mmuii.github.io/jsdesk",
          title: "Gruvbox",
          icon: "https://mmuii.github.io/jsdesk/favicon.ico",
        },
      ],
      currentTabIndex: 0,
      isSidebarOpen: true, // Sidebar is open by default
      currentUrl: "https://xp.quenq.com/", // Initialize with the first tab's URL
    };
  }

  componentDidMount() {
    this.injectCSS();
  }

  injectCSS = () => {
    const css = `
        .tab {
            min-width: 100px;
        }
        `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  switchTab = (index) => {
    this.setState({
      currentTabIndex: index,
      currentUrl: this.state.tabs[index].url, // Update current URL when switching tabs
    });
  };

  renderBookmarks = () => {
    const { isSidebarOpen } = this.state;
    return (
      isSidebarOpen && (
        <div className="w-10 bg-[#151515] text-white flex flex-col items-center py-2">
          {this.state.tabs.map((tab, index) => (
            <button key={index} onClick={() => this.switchTab(index)} className="mb-2">
              <img src={tab.icon} className="w-9 h-9 rounded-lg hover:bg-[#444444] p-1" alt={tab.title} />
            </button>
          ))}
        </div>
      )
    );
  };

  render() {
    const { tabs, currentTabIndex, currentUrl } = this.state;

    return (
      <div className="h-full w-full flex flex-col bg-[#111111]">
        {/* URL bar with title */}
        <div className="flex items-center p-1 bg-[#333333]  h-10">
          <div className="text-white whitespace-nowrap pl-1">{tabs[currentTabIndex].title}</div>
          <input type="text" value={currentUrl} readOnly className="ml-2 bg-[#151515] text-white border-none p-1 pl-3 rounded flex-grow min-w-0 focus:outline-none transition-all" />
        </div>
        <div className="flex-grow flex">
          {this.renderBookmarks()}
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
                title={tab.title}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default VMBox;

export const displayVMBox = () => {
  return <VMBox />;
};
