import React, { Component } from "react";
import Clock from "../util components/clock";
import Status from "../util components/status";
import StatusCard from "../util components/status_card";
import Calendar from "react-calendar"; // Import the calendar component

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      status_card: false,
      showCalendar: false,
    };
    this.calendarRef = React.createRef(); // Ref to detect outside clicks
  }

  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  handleClickOutside = (event) => {
    if (this.calendarRef.current && !this.calendarRef.current.contains(event.target)) {
      this.setState({ showCalendar: false }); // Hide calendar
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const modernCalendarCss = `
  /* Calendar container */
  .react-calendar {
    background-color: #1f1f1f;
    color: #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    padding: 15px;
    width: 320px;
    border: none;
  }

  /* Navigation bar */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .react-calendar__navigation button {
    background-color: transparent;
    color: #e0e0e0;
    border: none;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px; 
    width: 40px;   
    padding: 0;   
    border-radius: 0.2em;
  }

  
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: scale(1.1);  
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 14px;
    color: #bbbbbb;
    font-weight: 500;
  }

  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em 0;
  }

  /* Days */
  .react-calendar__month-view__days__day {
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  /* Month, Year, and Decade selection tiles */
  .react-calendar__year-view__months__month,
  .react-calendar__decade-view__years__year,
  .react-calendar__century-view__decades__decade {
    font-size: 16px;
    padding: 10px;
    border-radius: 0.4em;
    color: #e0e0e0;
    background-color: transparent;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  /* Hover effects for the selection views */
  .react-calendar__year-view__months__month:hover,
  .react-calendar__decade-view__years__year:hover,
  .react-calendar__century-view__decades__decade:hover {
    background-color: #444;
    color: #ffffff;
  }

  /* Active selection (selected month, year, or decade) */
  .react-calendar__tile--active {
    background-color: #007bff;
    color: #ffffff;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.4);
  }

  /* Current month, year, or decade */
  .react-calendar__tile--now {
    background-color: #444;
    color: #ffffff;
    border-radius: 8px;
  }

  /* Tiles hover and focus effects */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #555;
    transform: scale(1.05);
    color: #ffffff;
  }

  /* Calendar popup position */
  .calendar-popup {
    position: absolute;
    left: 50%; 
    top: 100%;  
    transform: translateX(-50%);  
    margin-top: 10px;
    z-index: 1000;
  }

  
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: #555;
    transform: scale(1.05);
    color: #ffffff;
  }

  .react-calendar__tile--now {
    font-weight: 500;
    border-radius: 8px;
  }

`;

    return (
      <div className="main-navbar-vp absolute top-0 right-0 w-screen shadow-md flex flex-nowrap justify-between items-center bg-ub-grey text-ubt-grey text-sm select-none z-50">
        <style>{modernCalendarCss}</style>
        <div tabIndex="0" className={"pl-3 pr-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1 "}>
          Activities
        </div>
        <div
          tabIndex="0"
          className={
            "pl-2 pr-2 text-xs md:text-sm outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1 relative" // Add relative positioning
          }
        >
          <div onClick={this.toggleCalendar}>
            <Clock />
          </div>

          {this.state.showCalendar && (
            <div className="calendar-popup" ref={this.calendarRef}>
              <Calendar />
            </div>
          )}
        </div>
        <div
          id="status-bar"
          tabIndex="0"
          onFocus={() => {
            this.setState({ status_card: true });
          }}
          className={"relative pr-3 pl-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1 "}
        >
          <Status />
          <StatusCard
            shutDown={this.props.shutDown}
            lockScreen={this.props.lockScreen}
            visible={this.state.status_card}
            toggleVisible={() => {
              this.setState({ status_card: false });
            }}
          />
        </div>
      </div>
    );
  }
}
