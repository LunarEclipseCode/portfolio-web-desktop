import React, { Component } from 'react';
import SmallArrow from './small_arrow';
import onClickOutside from 'react-onclickoutside';

class Slider extends Component {
  render() {
    return (
      <input
        type="range"
        onChange={this.props.onChange}
        className={this.props.className}
        name={this.props.name}
        min="0"
        max="100"
        value={this.props.value}
        step="1"
      />
    );
  }
}

export class StatusCard extends Component {
  constructor() {
    super();
    this.wrapperRef = React.createRef();
    this.state = {
      sound_level: 75,
      brightness_level: 100,
      battery_level: null, // Default battery level (null for unavailable)
      battery_charging: false,
      charging_time: null, // Time to full charge
      discharging_time: null, // Time remaining on battery
    };
  }

  handleClickOutside = () => {
    this.props.toggleVisible();
  };

  async componentDidMount() {
    this.setState(
      {
        sound_level: localStorage.getItem('sound-level') || 75,
        brightness_level: localStorage.getItem('brightness-level') || 100,
      },
      () => {
        document.getElementById('monitor-screen').style.filter = `brightness(${
          (3 / 400) * this.state.brightness_level + 0.25
        })`;
      }
    );

    // Get battery info
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      this.updateBatteryState(battery);

      // Listen for changes in battery status
      battery.addEventListener('levelchange', () => this.updateBatteryState(battery));
      battery.addEventListener('chargingchange', () => this.updateBatteryState(battery));
      battery.addEventListener('chargingtimechange', () => this.updateBatteryState(battery));
      battery.addEventListener('dischargingtimechange', () => this.updateBatteryState(battery));
    }
  }

  updateBatteryState(battery) {
    this.setState({
      battery_level: Math.round(battery.level * 100),
      battery_charging: battery.charging,
      charging_time: battery.chargingTime, // Time to full charge in seconds
      discharging_time: battery.dischargingTime, // Time remaining on battery in seconds
    });
  }

  formatTime(timeInSeconds) {
    if (!timeInSeconds || timeInSeconds === Infinity) return null;

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  }

  handleBrightness = (e) => {
    this.setState({ brightness_level: e.target.value });
    localStorage.setItem('brightness-level', e.target.value);
    document.getElementById('monitor-screen').style.filter = `brightness(${
      (3 / 400) * e.target.value + 0.25
    })`;
  };

  handleSound = (e) => {
    this.setState({ sound_level: e.target.value });
    localStorage.setItem('sound-level', e.target.value);
  };

  renderBatteryStatus() {
    const { battery_level, battery_charging, charging_time, discharging_time } = this.state;

    if (battery_level === null) {
      return '100% (Plugged in)'; // Fallback if battery info is unavailable
    }

    if (battery_charging) {
      if (battery_level === 100) {
        return '100% (Plugged in)';
      } else {
        const formattedTime = this.formatTime(charging_time);
        return `${battery_level}% (${formattedTime ? `${formattedTime} to charge ⏳` : 'Charging'})`;
      }
    } else {
      const formattedTime = this.formatTime(discharging_time);
      if (battery_level === 100) {
        return '100% (Plugged in)';
      }
      return `${battery_level}% (${formattedTime ? `${formattedTime} left` : 'On battery'})`;
    }
  }

  render() {
    return (
      <div
        ref={this.wrapperRef}
        className={
          'absolute bg-black bg-opacity-30 backdrop-blur-lg rounded-md py-4 top-9 right-3 shadow border-black border border-opacity-20 status-card' +
          (this.props.visible ? ' visible animateShow' : ' invisible')
        }
      >
        {/* Status Card */}
        <div className="absolute w-0 h-0 -top-1 right-6 top-arrow-up" />
        <div className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/audio-headphones-symbolic.svg"
              alt="ubuntu headphone"
            />
          </div>
          <Slider
            onChange={this.handleSound}
            className="ubuntu-slider w-2/3"
            value={this.state.sound_level}
            name="headphone_range"
          />
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/display-brightness-symbolic.svg"
              alt="ubuntu brightness"
            />
          </div>
          <Slider
            onChange={this.handleBrightness}
            className="ubuntu-slider w-2/3"
            name="brightness_range"
            value={this.state.brightness_level}
          />
        </div>
        <div className="w-64 flex content-center justify-center">
          <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/network-wireless-signal-good-symbolic.svg"
              alt="ubuntu wifi"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>Pixel 8 Pro</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/bluetooth-symbolic.svg"
              alt="ubuntu bluetooth"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>Off</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/battery-good-symbolic.svg"
              alt="ubuntu battery"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>{this.renderBatteryStatus()}</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 flex content-center justify-center">
          <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
        </div>
        <div
          id="open-settings"
          className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20"
        >
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/emblem-system-symbolic.svg"
              alt="ubuntu settings"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Settings</span>
          </div>
        </div>
        <div
          onClick={this.props.lockScreen}
          className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20"
        >
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/changes-prevent-symbolic.svg"
              alt="ubuntu lock"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Lock</span>
          </div>
        </div>
        <div
          onClick={this.props.shutDown}
          className="w-64 py-1.5 flex items-center justify-center bg-transparent hover:bg-ub-warm-grey hover:bg-opacity-20"
        >
          <div className="w-8">
            <img
              width="16px"
              height="16px"
              src="./themes/Yaru/status/system-shutdown-symbolic.svg"
              alt="ubuntu power"
            />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Power Off / Log Out</span>
            <SmallArrow angle="right" />
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(StatusCard);
