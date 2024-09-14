import React, { Component, useEffect, useRef, memo } from "react";

export class Trading extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [
        {
          component: <AdvancedViewWidget />,
          title: "Advanced View",
          isLoaded: true,
        },
        {
          component: <SimpleViewWidget />,
          title: "Stock Market",
          isLoaded: false,
        },
        {
          component: <MarketOverview />,
          title: "Market Overview",
          isLoaded: false,
        },
        {
          component: <MarketData />,
          title: "Market Data",
          isLoaded: false,
        },
        // {
        //   component: <CryptoMarket />,
        //   title: "Crypto Market",
        //   isLoaded: true,
        // },
        {
          component: <StockHeatMap />,
          title: "Stock Heatmap",
          isLoaded: true,
        },
        {
          component: <ETFHeatMap />,
          title: "ETF Heatmap",
          isLoaded: true,
        },
        {
          component: <CryptoHeatMap />,
          title: "Crypto Heatmap",
          isLoaded: true,
        },
        // {
        //   component: <ForexData />,
        //   title: "Forex Data",
        //   isLoaded: true,
        // },
        {
          component: <MarketNews />,
          title: "Market News",
          isLoaded: true,
        },
      ],
      currentTabIndex: 0,
      isSidebarOpen: true, // Sidebar is open by default
    };
  }

  componentDidMount() {
    this.injectCSS();
    this.lazyLoadTabs();
  }

  injectCSS = () => {
    const css = `
            .tab {
                min-width: 100px;
            }

            .dropdown-menu {
                position: absolute;
                top: 1.75em;
                right: -0.25em;
                background: #222222;
                border: 1px solid #444444;
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
                color: #ffffff;
                cursor: pointer;
                padding-left: 0.5em;
                padding-right: 0.5em;
                padding-top: 0.25em;
                padding-bottom: 0.25em;
                border-radius: 0.25em;

                
            }

            .dropdown-menu button:hover {
                background: #444444;
            }

            .dropdown-icon {
                cursor: pointer;
                display: flex;
                align-items: center;
                background-color: #222222;
                border-radius: 5px;
                transition: background-color 0.2s;
                margin-top: 0.25rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25em;
                margin-right: 0.29rem;
            }

            .dropdown-icon:hover {
                background-color: #444444;
            }
        `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  lazyLoadTabs = () => {
    setTimeout(() => {
      this.setState((prevState) => ({
        tabs: prevState.tabs.map((tab, index) =>
          index === 0
            ? tab
            : {
                ...tab,
                isLoaded: true,
              }
        ),
      }));
    }, 100); // Delaying by 100ms for instant initial load
  };

  switchTab = (index) => {
    this.setState({ currentTabIndex: index });
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  renderBookmarks = () => {
    const { isSidebarOpen } = this.state;
    return (
      isSidebarOpen && (
        <div className="w-11 bg-[#0f131d] text-white flex flex-col items-center py-2">
          {this.state.tabs.map((tab, index) => (
            <button key={index} onClick={() => this.switchTab(index)} className="mb-2.5" title={tab.title}>
              <img src={this.getFaviconUrl(tab.title)} className="w-9 h-9 rounded-md hover:bg-[#4d556b] p-1" alt={tab.title} />
            </button>
          ))}
        </div>
      )
    );
  };

  getFaviconUrl = (title) => {
    const iconMapping = {
      "Advanced View": "/images/tradingview/market-research.svg",
      "Stock Market": "/images/tradingview/trend-up.svg",
      "Market Overview": "/images/tradingview/zoom-out.svg",
      "Market Data": "/images/tradingview/table.svg",
      "Crypto Market": "/images/tradingview/bitcoin.svg",
      "Stock Heatmap": "/images/tradingview/heatmap.svg",
      "ETF Heatmap": "/images/tradingview/etf-heatmap.svg",
      "Crypto Heatmap": "/images/tradingview/fire.svg",
      "Forex Data": "/images/tradingview/exchange-dollar.svg",
      "Market News": "/images/tradingview/news.svg",
    };

    return iconMapping[title] || "/icons/default-icon.svg";
  };

  render() {
    const { tabs, currentTabIndex } = this.state;

    return (
      <div className="h-full w-full flex flex-col bg-[#131722]">
        <div className="flex-grow flex">
          {this.renderBookmarks()}
          <div className="flex-grow relative">
            {tabs.map((tab, index) => (
              <div
                key={index}
                style={{
                  display: index === currentTabIndex ? "block" : "none",
                  height: "100%",
                  width: "100%",
                }}
              >
                {tab.component || <iframe src={tab.url} className="absolute top-0 left-0 w-full h-full" frameBorder="0" title={tab.title} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const AdvancedViewWidget = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "withdateranges": true,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100% - 32px)", width: "100%" }}></div>
    </div>
  );
});

const SimpleViewWidget = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D"
            ],
            [
              "Google",
              "GOOGL|1D"
            ],
            [
              "Microsoft",
              "MSFT|1D"
            ],
            [
              "NASDAQ:NVDA|1D"
            ],
            [
              "NASDAQ:AMZN|1D"
            ],
            [
              "NASDAQ:QCOM|1D"
            ],
            [
              "NYSE:IBM|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "headerFontSize": "medium",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const ETFHeatMap = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "dataSource": "AllUSEtf",
          "blockSize": "aum",
          "blockColor": "change",
          "grouping": "asset_class",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const StockHeatMap = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const CryptoHeatMap = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const MarketData = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0)",
        "scaleFontColor": "rgba(209, 212, 220, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              {
                "s": "FOREXCOM:SPXUSD",
                "d": "S&P 500 Index"
              },
              {
                "s": "FOREXCOM:NSXUSD",
                "d": "US 100 Cash CFD"
              },
              {
                "s": "FOREXCOM:DJI",
                "d": "Dow Jones Industrial Average Index"
              },
              {
                "s": "INDEX:NKY",
                "d": "Nikkei 225"
              },
              {
                "s": "INDEX:DEU40",
                "d": "DAX Index"
              },
              {
                "s": "FOREXCOM:UKXGBP",
                "d": "FTSE 100 Index"
              }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Futures",
            "symbols": [
              {
                "s": "CME_MINI:ES1!",
                "d": "S&P 500"
              },
              {
                "s": "CME:6E1!",
                "d": "Euro"
              },
              {
                "s": "COMEX:GC1!",
                "d": "Gold"
              },
              {
                "s": "NYMEX:CL1!",
                "d": "WTI Crude Oil"
              },
              {
                "s": "NYMEX:NG1!",
                "d": "Gas"
              },
              {
                "s": "CBOT:ZC1!",
                "d": "Corn"
              }
            ],
            "originalTitle": "Futures"
          },
          {
            "title": "Bonds",
            "symbols": [
              {
                "s": "CBOT:ZB1!",
                "d": "T-Bond"
              },
              {
                "s": "CBOT:UB1!",
                "d": "Ultra T-Bond"
              },
              {
                "s": "EUREX:FGBL1!",
                "d": "Euro Bund"
              },
              {
                "s": "EUREX:FBTP1!",
                "d": "Euro BTP"
              },
              {
                "s": "EUREX:FGBM1!",
                "d": "Euro BOBL"
              }
            ],
            "originalTitle": "Bonds"
          },
          {
            "title": "Forex",
            "symbols": [
              {
                "s": "FX:EURUSD",
                "d": "EUR to USD"
              },
              {
                "s": "FX:GBPUSD",
                "d": "GBP to USD"
              },
              {
                "s": "FX:USDJPY",
                "d": "USD to JPY"
              },
              {
                "s": "FX:USDCHF",
                "d": "USD to CHF"
              },
              {
                "s": "FX:AUDUSD",
                "d": "AUD to USD"
              },
              {
                "s": "FX:USDCAD",
                "d": "USD to CAD"
              }
            ],
            "originalTitle": "Forex"
          }
        ]
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const MarketOverview = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "symbolsGroups": [
          {
            "name": "Indices",
            "originalName": "Indices",
            "symbols": [
              {
                "name": "FOREXCOM:SPXUSD",
                "displayName": "S&P 500 Index"
              },
              {
                "name": "FOREXCOM:NSXUSD",
                "displayName": "US 100 Cash CFD"
              },
              {
                "name": "FOREXCOM:DJI",
                "displayName": "Dow Jones Industrial Average Index"
              },
              {
                "name": "INDEX:NKY",
                "displayName": "Nikkei 225"
              },
              {
                "name": "INDEX:DEU40",
                "displayName": "DAX Index"
              },
              {
                "name": "FOREXCOM:UKXGBP",
                "displayName": "FTSE 100 Index"
              }
            ]
          },
          {
            "name": "Futures",
            "originalName": "Futures",
            "symbols": [
              {
                "name": "CME_MINI:ES1!",
                "displayName": "S&P 500"
              },
              {
                "name": "CME:6E1!",
                "displayName": "Euro"
              },
              {
                "name": "COMEX:GC1!",
                "displayName": "Gold"
              },
              {
                "name": "NYMEX:CL1!",
                "displayName": "WTI Crude Oil"
              },
              {
                "name": "NYMEX:NG1!",
                "displayName": "Gas"
              },
              {
                "name": "CBOT:ZC1!",
                "displayName": "Corn"
              }
            ]
          },
          {
            "name": "Bonds",
            "originalName": "Bonds",
            "symbols": [
              {
                "name": "CBOT:ZB1!",
                "displayName": "T-Bond"
              },
              {
                "name": "CBOT:UB1!",
                "displayName": "Ultra T-Bond"
              },
              {
                "name": "EUREX:FGBL1!",
                "displayName": "Euro Bund"
              },
              {
                "name": "EUREX:FBTP1!",
                "displayName": "Euro BTP"
              },
              {
                "name": "EUREX:FGBM1!",
                "displayName": "Euro BOBL"
              }
            ]
          },
          {
            "name": "Forex",
            "originalName": "Forex",
            "symbols": [
              {
                "name": "FX:EURUSD",
                "displayName": "EUR to USD"
              },
              {
                "name": "FX:GBPUSD",
                "displayName": "GBP to USD"
              },
              {
                "name": "FX:USDJPY",
                "displayName": "USD to JPY"
              },
              {
                "name": "FX:USDCHF",
                "displayName": "USD to CHF"
              },
              {
                "name": "FX:AUDUSD",
                "displayName": "AUD to USD"
              },
              {
                "name": "FX:USDCAD",
                "displayName": "USD to CAD"
              }
            ]
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "colorTheme": "dark",
        "locale": "en",
        "backgroundColor": "#131722"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const CryptoMarket = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": "dark",
        "locale": "en"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

const MarketNews = memo(() => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "feedMode": "all_symbols",
        "isTransparent": false,
        "displayMode": "adaptive",
        "width": "100%",
        "height": "100%",
        "colorTheme": "dark",
        "locale": "en"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

// const ForexData = memo(() => {
//   const container = useRef();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
//     script.type = "text/javascript";
//     script.async = true;
//     script.innerHTML = `
//       {
//         "width": "100%",
//         "height": "100%",
//         "defaultColumn": "overview",
//         "defaultScreen": "general",
//         "market": "forex",
//         "showToolbar": true,
//         "colorTheme": "dark",
//         "locale": "en"
//       }`;
//     container.current.appendChild(script);
//   }, []);

//   return (
//     <div className="tradingview-widget-container" ref={container}>
//       <div className="tradingview-widget-container__widget"></div>
//     </div>
//   );
// });

export default Trading;

export const displayTrading = () => {
  return <Trading />;
};
