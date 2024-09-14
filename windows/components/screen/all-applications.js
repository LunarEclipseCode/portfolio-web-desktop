import React from 'react';
import UbuntuApp from '../base/ubuntu_app';

export class AllApplications extends React.Component {
    constructor() {
      super();
      this.state = {
        query: "",
        apps: [],
        category: 0, // 0 for all, 1 for frequent
      };
      this.menuRef = React.createRef();
    }
  
    componentDidMount() {
      this.setState({
        apps: this.props.apps,
      });
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  
    handleClickOutside = (event) => {
      // Check if the click is outside the menuRef, if so, trigger onClose
      if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    };
  
    handleChange = (e) => {
      const query = e.target.value;
      this.setState({
        query: query,
        apps:
          query === "" || query === null
            ? this.props.apps
            : this.props.apps.filter((app) =>
                app.title.toLowerCase().includes(query.toLowerCase())
              ),
      });
    };
  
    renderApps = () => {
      let appsJsx = [];
      let frequentAppsInfo = JSON.parse(localStorage.getItem('frequentApps'));
  
      let getFrequentApps = () => {
        let frequentApps = [];
        if (frequentAppsInfo) {
          frequentAppsInfo.forEach((app_info) => {
            let app = this.props.apps.find((app) => app.id === app_info.id);
            if (app) {
              frequentApps.push(app);
            }
          });
        }
        return frequentApps;
      };
  
      let apps =
        this.state.category === 0 ? [...this.state.apps] : getFrequentApps();
      apps.forEach((app, index) => {
        appsJsx.push(
          <div
            key={index}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg"
            onClick={() => this.props.openApp(app.id)}
          >
            <img src={app.icon} alt={app.title} className="w-8 h-8 mr-4" />
            <span className="text-white text-lg">{app.title}</span>
          </div>
        );
      });
      return appsJsx;
    };
  
    handleSwitch = (category) => {
      if (category !== this.state.category) {
        this.setState({
          category: category,
        });
      }
    };
  
    render() {
      return (
        <div>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              background-color: rgba(0, 0, 0, 0.5); /* Scrollbar background */
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #d1d5db; /* Thumb color (orange) */
              border-radius: 10px; /* Rounded edges for the thumb */
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background-color: rgba(0, 0, 0, 0.2); /* Track background */
            }
            .custom-scrollbar {
              scrollbar-width: thin; /* Thin scrollbar */
              scrollbar-color: #d1d5db rgba(0, 0, 0, 0.5); /* Thumb color and track color */
            }
          `}</style>
  
          <div
            ref={this.menuRef}
            className="fixed left-0 mb-0 ml-0 w-72 h-96 bg-black bg-opacity-80 backdrop-blur-lg rounded-lg p-3 z-20"
            style={{ bottom: '3.3em', marginLeft: '0px' }}
          >
            <div className="flex items-center mb-4">
              <img
                className="w-5 h-5"
                alt="search icon"
                src={'./images/logos/search.png'}
              />
              <input
                className="w-full p-1 ml-2 bg-transparent focus:outline-none text-white"
                placeholder="Type to Search"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </div>
            <div className="overflow-y-auto h-64 custom-scrollbar">
              {this.renderApps()}
            </div>
  
            <div className="flex justify-around mt-4">
              <div
                className="w-1/2 text-center group text-white bg-transparent cursor-pointer items-center"
                onClick={this.handleSwitch.bind(this, 1)}
              >
                <h4>Frequent</h4>
                {this.state.category === 1 ? (
                  <div className="h-1 mt-1 bg-gray-300 self-center" />
                ) : (
                  <div className="h-1 mt-1 bg-transparent group-hover:bg-gray-700" />
                )}
              </div>
              <div
                className="w-1/2 text-center group text-white bg-transparent cursor-pointer items-center"
                onClick={this.handleSwitch.bind(this, 0)}
              >
                <h4>All</h4>
                {this.state.category === 0 ? (
                  <div className="h-1 mt-1 bg-gray-300 self-center" />
                ) : (
                  <div className="h-1 mt-1 bg-transparent group-hover:bg-gray-700" />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default AllApplications;