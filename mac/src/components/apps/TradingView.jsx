import React, { useEffect, useRef, useState, memo } from "react";

export const Trading = () => {
  const [tabs, setTabs] = useState([
    {
      component: <AdvancedViewWidget />,
      title: "Advanced View",
      isLoaded: true
    },
    {
      component: <SimpleViewWidget />,
      title: "Stock Market",
      isLoaded: false
    },
    {
      component: <MarketOverview />,
      title: "Market Overview",
      isLoaded: false
    },
    {
      component: <MarketData />,
      title: "Market Data",
      isLoaded: false
    },
    {
      component: <StockHeatMap />,
      title: "Stock Heatmap",
      isLoaded: true
    },
    {
      component: <ETFHeatMap />,
      title: "ETF Heatmap",
      isLoaded: true
    },
    {
      component: <CryptoHeatMap />,
      title: "Crypto Heatmap",
      isLoaded: true
    },
    {
      component: <MarketNews />,
      title: "Market News",
      isLoaded: true
    }
  ]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default
  const dark = useStore((state) => state.dark); // Get dark mode state

  useEffect(() => {
    lazyLoadTabs();
  }, []);

  const lazyLoadTabs = () => {
    setTimeout(() => {
      setTabs((prevTabs) =>
        prevTabs.map((tab, index) =>
          index === 0
            ? tab
            : {
                ...tab,
                isLoaded: true
              }
        )
      );
    }, 100); // Delaying by 100ms for instant initial load
  };

  const switchTab = (index) => {
    setCurrentTabIndex(index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getFaviconUrl = (title) => {
    const iconMapping = dark
      ? {
          "Advanced View": "/images/tradingview/market-research.svg",
          "Stock Market": "/images/tradingview/trend-up.svg",
          "Market Overview": "/images/tradingview/zoom-out.svg",
          "Market Data": "/images/tradingview/table.svg",
          "Crypto Market": "/images/tradingview/bitcoin.svg",
          "Stock Heatmap": "/images/tradingview/heatmap.svg",
          "ETF Heatmap": "/images/tradingview/etf-heatmap.svg",
          "Crypto Heatmap": "/images/tradingview/fire.svg",
          "Forex Data": "/images/tradingview/exchange-dollar.svg",
          "Market News": "/images/tradingview/news.svg"
        }
      : {
          "Advanced View": "/images/tradingview/market-research-dark.svg",
          "Stock Market": "/images/tradingview/trend-up-dark.svg",
          "Market Overview": "/images/tradingview/zoom-out-dark.svg",
          "Market Data": "/images/tradingview/table-dark.svg",
          "Crypto Market": "/images/tradingview/bitcoin-dark.svg",
          "Stock Heatmap": "/images/tradingview/heatmap-dark.svg",
          "ETF Heatmap": "/images/tradingview/etf-heatmap-dark.svg",
          "Crypto Heatmap": "/images/tradingview/fire-dark.svg",
          "Forex Data": "/images/tradingview/exchange-dollar-dark.svg",
          "Market News": "/images/tradingview/news-dark.svg"
        };

    return iconMapping[title] || "/icons/default-icon.svg";
  };

  const renderBookmarks = () => {
    return (
      isSidebarOpen && (
        <div
          className="w-11 text-white dark:text-gray-300 flex flex-col items-center py-2"
          bg="#fdfeff dark:#171c27"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => switchTab(index)}
              className="mb-2.5"
              title={tab.title}
            >
              <img
                src={getFaviconUrl(tab.title)}
                className="w-9 h-9 rounded-md hover:bg-gray-300 p-1 dark:hover:bg-gray-600"
                alt={tab.title}
              />
            </button>
          ))}
        </div>
      )
    );
  };

  return (
    <div className="h-full w-full flex flex-col" bg="#fdfeff dark:#171c27">
      <div className="flex-grow flex">
        {renderBookmarks()}
        <div className="flex-grow relative">
          {tabs.map((tab, index) => (
            <div
              key={index}
              style={{
                display: index === currentTabIndex ? "block" : "none",
                height: "100%",
                width: "100%"
              }}
            >
              {tab.component || (
                <iframe
                  src={tab.url}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  title={tab.title}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvancedViewWidget = memo(() => {
  const dark = useStore((state) => state.dark);
  const containerLight = useRef(null);
  const containerDark = useRef(null);

  useEffect(() => {
    const loadTradingViewWidget = (container, theme) => {
      // Clear the previous content in case
      if (container.current) {
        container.current.innerHTML = "";
      }

      // Create the script element for embedding the widget
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;

      // Widget configuration based on theme
      const widgetConfig = {
        autosize: true,
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: theme,
        style: "1",
        locale: "en",
        withdateranges: true,
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com"
      };

      script.innerHTML = JSON.stringify(widgetConfig);

      if (container.current) {
        container.current.appendChild(script);
      }
    };

    // Load both light and dark widgets once
    loadTradingViewWidget(containerLight, "light");
    loadTradingViewWidget(containerDark, "dark");
  }, []); // Only run once on mount

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Light Mode Widget */}
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block" // Hide when dark mode is enabled
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {/* Dark Mode Widget */}
      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none" // Show only when dark mode is enabled
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const SimpleViewWidget = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig = {
        symbols: [
          ["Apple", "AAPL|1D"],
          ["Google", "GOOGL|1D"],
          ["Microsoft", "MSFT|1D"],
          ["NASDAQ:NVDA|1D"],
          ["NASDAQ:AMZN|1D"],
          ["NASDAQ:QCOM|1D"],
          ["NYSE:IBM|1D"]
        ],
        chartOnly: false,
        width: "100%",
        height: "100%",
        locale: "en",
        colorTheme: theme,
        autosize: true,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        changeMode: "price-and-percent",
        chartType: "area",
        headerFontSize: "medium",
        lineWidth: 2,
        lineType: 0,
        dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"]
      };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const ETFHeatMap = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig = {
        dataSource: "AllUSEtf",
        blockSize: "aum",
        blockColor: "change",
        grouping: "asset_class",
        locale: "en",
        symbolUrl: "",
        colorTheme: theme,
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: "100%",
        height: "100%"
      };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Light Mode Widget */}
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {/* Dark Mode Widget */}
      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const StockHeatMap = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig = {
        exchanges: [],
        dataSource: "SPX500",
        grouping: "sector",
        blockSize: "market_cap_basic",
        blockColor: "change",
        locale: "en",
        symbolUrl: "",
        colorTheme: theme,
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: "100%",
        height: "100%"
      };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Light Mode Widget */}
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {/* Dark Mode Widget */}
      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const CryptoHeatMap = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig = {
        dataSource: "Crypto",
        blockSize: "market_cap_calc",
        blockColor: "change",
        locale: "en",
        symbolUrl: "",
        colorTheme: theme,
        hasTopBar: true,
        isDataSetEnabled: true,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: "100%",
        height: "100%"
      };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const MarketData = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig =
        theme === "dark"
          ? {
              colorTheme: "dark",
              dateRange: "12M",
              showChart: true,
              locale: "en",
              width: "100%",
              height: "100%",
              largeChartUrl: "",
              isTransparent: false,
              showSymbolLogo: true,
              showFloatingTooltip: false,
              plotLineColorGrowing: "rgba(41, 98, 255, 1)",
              plotLineColorFalling: "rgba(41, 98, 255, 1)",
              gridLineColor: "rgba(42, 46, 57, 0)",
              scaleFontColor: "rgba(209, 212, 220, 1)",
              belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
              belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
              belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
              belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
              symbolActiveColor: "rgba(41, 98, 255, 0.12)",
              tabs: [
                {
                  title: "Indices",
                  symbols: [
                    {
                      s: "FOREXCOM:SPXUSD",
                      d: "S&P 500 Index"
                    },
                    {
                      s: "FOREXCOM:NSXUSD",
                      d: "US 100 Cash CFD"
                    },
                    {
                      s: "FOREXCOM:DJI",
                      d: "Dow Jones Industrial Average Index"
                    },
                    {
                      s: "INDEX:NKY",
                      d: "Nikkei 225"
                    },
                    {
                      s: "INDEX:DEU40",
                      d: "DAX Index"
                    },
                    {
                      s: "FOREXCOM:UKXGBP",
                      d: "FTSE 100 Index"
                    }
                  ],
                  originalTitle: "Indices"
                },
                {
                  title: "Futures",
                  symbols: [
                    {
                      s: "CME_MINI:ES1!",
                      d: "S&P 500"
                    },
                    {
                      s: "CME:6E1!",
                      d: "Euro"
                    },
                    {
                      s: "COMEX:GC1!",
                      d: "Gold"
                    },
                    {
                      s: "NYMEX:CL1!",
                      d: "WTI Crude Oil"
                    },
                    {
                      s: "NYMEX:NG1!",
                      d: "Gas"
                    },
                    {
                      s: "CBOT:ZC1!",
                      d: "Corn"
                    }
                  ],
                  originalTitle: "Futures"
                },
                {
                  title: "Bonds",
                  symbols: [
                    {
                      s: "CBOT:ZB1!",
                      d: "T-Bond"
                    },
                    {
                      s: "CBOT:UB1!",
                      d: "Ultra T-Bond"
                    },
                    {
                      s: "EUREX:FGBL1!",
                      d: "Euro Bund"
                    },
                    {
                      s: "EUREX:FBTP1!",
                      d: "Euro BTP"
                    },
                    {
                      s: "EUREX:FGBM1!",
                      d: "Euro BOBL"
                    }
                  ],
                  originalTitle: "Bonds"
                },
                {
                  title: "Forex",
                  symbols: [
                    {
                      s: "FX:EURUSD",
                      d: "EUR to USD"
                    },
                    {
                      s: "FX:GBPUSD",
                      d: "GBP to USD"
                    },
                    {
                      s: "FX:USDJPY",
                      d: "USD to JPY"
                    },
                    {
                      s: "FX:USDCHF",
                      d: "USD to CHF"
                    },
                    {
                      s: "FX:AUDUSD",
                      d: "AUD to USD"
                    },
                    {
                      s: "FX:USDCAD",
                      d: "USD to CAD"
                    }
                  ],
                  originalTitle: "Forex"
                }
              ]
            }
          : {
              colorTheme: "light",
              dateRange: "12M",
              showChart: true,
              locale: "en",
              width: "100%",
              height: "100%",
              largeChartUrl: "",
              isTransparent: false,
              showSymbolLogo: true,
              showFloatingTooltip: false,
              plotLineColorGrowing: "rgba(41, 98, 255, 1)",
              plotLineColorFalling: "rgba(41, 98, 255, 1)",
              gridLineColor: "rgba(42, 46, 57, 0)",
              scaleFontColor: "rgba(19, 23, 34, 1)",
              belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
              belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
              belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
              belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
              symbolActiveColor: "rgba(41, 98, 255, 0.12)",
              tabs: [
                {
                  title: "Indices",
                  symbols: [
                    {
                      s: "FOREXCOM:SPXUSD",
                      d: "S&P 500 Index"
                    },
                    {
                      s: "FOREXCOM:NSXUSD",
                      d: "US 100 Cash CFD"
                    },
                    {
                      s: "FOREXCOM:DJI",
                      d: "Dow Jones Industrial Average Index"
                    },
                    {
                      s: "INDEX:NKY",
                      d: "Nikkei 225"
                    },
                    {
                      s: "INDEX:DEU40",
                      d: "DAX Index"
                    },
                    {
                      s: "FOREXCOM:UKXGBP",
                      d: "FTSE 100 Index"
                    }
                  ],
                  originalTitle: "Indices"
                },
                {
                  title: "Futures",
                  symbols: [
                    {
                      s: "CME_MINI:ES1!",
                      d: "S&P 500"
                    },
                    {
                      s: "CME:6E1!",
                      d: "Euro"
                    },
                    {
                      s: "COMEX:GC1!",
                      d: "Gold"
                    },
                    {
                      s: "NYMEX:CL1!",
                      d: "WTI Crude Oil"
                    },
                    {
                      s: "NYMEX:NG1!",
                      d: "Gas"
                    },
                    {
                      s: "CBOT:ZC1!",
                      d: "Corn"
                    }
                  ],
                  originalTitle: "Futures"
                },
                {
                  title: "Bonds",
                  symbols: [
                    {
                      s: "CBOT:ZB1!",
                      d: "T-Bond"
                    },
                    {
                      s: "CBOT:UB1!",
                      d: "Ultra T-Bond"
                    },
                    {
                      s: "EUREX:FGBL1!",
                      d: "Euro Bund"
                    },
                    {
                      s: "EUREX:FBTP1!",
                      d: "Euro BTP"
                    },
                    {
                      s: "EUREX:FGBM1!",
                      d: "Euro BOBL"
                    }
                  ],
                  originalTitle: "Bonds"
                },
                {
                  title: "Forex",
                  symbols: [
                    {
                      s: "FX:EURUSD",
                      d: "EUR to USD"
                    },
                    {
                      s: "FX:GBPUSD",
                      d: "GBP to USD"
                    },
                    {
                      s: "FX:USDJPY",
                      d: "USD to JPY"
                    },
                    {
                      s: "FX:USDCHF",
                      d: "USD to CHF"
                    },
                    {
                      s: "FX:AUDUSD",
                      d: "AUD to USD"
                    },
                    {
                      s: "FX:USDCAD",
                      d: "USD to CAD"
                    }
                  ],
                  originalTitle: "Forex"
                }
              ]
            };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const MarketOverview = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig =
        theme === "dark"
          ? {
              width: "100%",
              height: "100%",
              symbolsGroups: [
                {
                  name: "Indices",
                  originalName: "Indices",
                  symbols: [
                    { name: "FOREXCOM:SPXUSD", displayName: "S&P 500 Index" },
                    { name: "FOREXCOM:NSXUSD", displayName: "US 100 Cash CFD" },
                    {
                      name: "FOREXCOM:DJI",
                      displayName: "Dow Jones Industrial Average Index"
                    },
                    { name: "INDEX:NKY", displayName: "Nikkei 225" },
                    { name: "INDEX:DEU40", displayName: "DAX Index" },
                    { name: "FOREXCOM:UKXGBP", displayName: "FTSE 100 Index" }
                  ]
                },
                {
                  name: "Futures",
                  originalName: "Futures",
                  symbols: [
                    { name: "CME_MINI:ES1!", displayName: "S&P 500" },
                    { name: "CME:6E1!", displayName: "Euro" },
                    { name: "COMEX:GC1!", displayName: "Gold" },
                    { name: "NYMEX:CL1!", displayName: "WTI Crude Oil" },
                    { name: "NYMEX:NG1!", displayName: "Gas" },
                    { name: "CBOT:ZC1!", displayName: "Corn" }
                  ]
                },
                {
                  name: "Bonds",
                  originalName: "Bonds",
                  symbols: [
                    { name: "CBOT:ZB1!", displayName: "T-Bond" },
                    { name: "CBOT:UB1!", displayName: "Ultra T-Bond" },
                    { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
                    { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
                    { name: "EUREX:FGBM1!", displayName: "Euro BOBL" }
                  ]
                },
                {
                  name: "Forex",
                  originalName: "Forex",
                  symbols: [
                    { name: "FX:EURUSD", displayName: "EUR to USD" },
                    { name: "FX:GBPUSD", displayName: "GBP to USD" },
                    { name: "FX:USDJPY", displayName: "USD to JPY" },
                    { name: "FX:USDCHF", displayName: "USD to CHF" },
                    { name: "FX:AUDUSD", displayName: "AUD to USD" },
                    { name: "FX:USDCAD", displayName: "USD to CAD" }
                  ]
                }
              ],
              showSymbolLogo: true,
              isTransparent: false,
              colorTheme: "dark",
              locale: "en",
              backgroundColor: "#131722"
            }
          : {
              width: "100%",
              height: "100%",
              symbolsGroups: [
                {
                  name: "Indices",
                  originalName: "Indices",
                  symbols: [
                    { name: "FOREXCOM:SPXUSD", displayName: "S&P 500 Index" },
                    { name: "FOREXCOM:NSXUSD", displayName: "US 100 Cash CFD" },
                    {
                      name: "FOREXCOM:DJI",
                      displayName: "Dow Jones Industrial Average Index"
                    },
                    { name: "INDEX:NKY", displayName: "Nikkei 225" },
                    { name: "INDEX:DEU40", displayName: "DAX Index" },
                    { name: "FOREXCOM:UKXGBP", displayName: "FTSE 100 Index" }
                  ]
                },
                {
                  name: "Futures",
                  originalName: "Futures",
                  symbols: [
                    { name: "CME_MINI:ES1!", displayName: "S&P 500" },
                    { name: "CME:6E1!", displayName: "Euro" },
                    { name: "COMEX:GC1!", displayName: "Gold" },
                    { name: "NYMEX:CL1!", displayName: "WTI Crude Oil" },
                    { name: "NYMEX:NG1!", displayName: "Gas" },
                    { name: "CBOT:ZC1!", displayName: "Corn" }
                  ]
                },
                {
                  name: "Bonds",
                  originalName: "Bonds",
                  symbols: [
                    { name: "CBOT:ZB1!", displayName: "T-Bond" },
                    { name: "CBOT:UB1!", displayName: "Ultra T-Bond" },
                    { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
                    { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
                    { name: "EUREX:FGBM1!", displayName: "Euro BOBL" }
                  ]
                },
                {
                  name: "Forex",
                  originalName: "Forex",
                  symbols: [
                    { name: "FX:EURUSD", displayName: "EUR to USD" },
                    { name: "FX:GBPUSD", displayName: "GBP to USD" },
                    { name: "FX:USDJPY", displayName: "USD to JPY" },
                    { name: "FX:USDCHF", displayName: "USD to CHF" },
                    { name: "FX:AUDUSD", displayName: "AUD to USD" },
                    { name: "FX:USDCAD", displayName: "USD to CAD" }
                  ]
                }
              ],
              showSymbolLogo: true,
              isTransparent: false,
              colorTheme: "light",
              locale: "en",
              backgroundColor: "#ffffff"
            };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

const MarketNews = memo(() => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);
  const dark = useStore((state) => state.dark);

  useEffect(() => {
    const loadWidget = (container, theme) => {
      if (container.current) {
        container.current.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;

      const widgetConfig = {
        feedMode: "all_symbols",
        displayMode: "adaptive",
        isTransparent: true,
        width: "100%",
        height: "100%",
        colorTheme: theme,
        locale: "en"
      };

      script.innerHTML = JSON.stringify(widgetConfig);
      container.current.appendChild(script);
    };

    loadWidget(containerLight, "light");
    loadWidget(containerDark, "dark");
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Light Mode Widget */}
      <div
        ref={containerLight}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "none" : "block"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {/* Dark Mode Widget */}
      <div
        ref={containerDark}
        className="tradingview-widget-container"
        style={{
          height: "100%",
          width: "100%",
          display: dark ? "block" : "none"
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

export default Trading;
