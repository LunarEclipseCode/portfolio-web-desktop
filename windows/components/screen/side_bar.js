import React, { useState } from 'react';
import SideBarApp from '../base/side_bar_app';

export default function BottomBar(props) {
  const [draggedAppIndex, setDraggedAppIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize the app order based on the given apps
  const [appOrder, setAppOrder] = useState(props.apps.map((app) => app.id));

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedAppIndex(index);
    setIsDragging(true);
  };

  // Handle dragging over
  const handleDragOver = (index) => {
    if (draggedAppIndex === index) return;
    const newAppOrder = [...appOrder];
    const draggedApp = newAppOrder[draggedAppIndex];
    newAppOrder.splice(draggedAppIndex, 1); // Remove dragged app from its old position
    newAppOrder.splice(index, 0, draggedApp); // Insert dragged app in new position
    setDraggedAppIndex(index); // Update dragged app's index
    setAppOrder(newAppOrder); // Update app order
  };

  const handleDragEnd = () => {
    setDraggedAppIndex(null); 
    setIsDragging(false);
  };

  const renderApps = () => {
    return appOrder.map((appId, index) => {
      const app = props.apps.find(app => app.id === appId);
      if (!app || props.favourite_apps[app.id] === false) return null;
      return (
        <div
          key={app.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
          className={`draggable-app ${isDragging && draggedAppIndex === index ? 'dragging' : ''}`}
        >
          <SideBarApp
            id={app.id}
            title={app.title}
            icon={app.icon}
            isClose={props.closed_windows}
            isFocus={props.focused_windows}
            openApp={props.openAppByAppId}
            isMinimized={props.isMinimized}
            openFromMinimised={props.openFromMinimised}
          />
        </div>
      );
    });
  };

  function showBottomBar() {
    props.hideSideBar(null, false);
  }

  function hideBottomBar() {
    setTimeout(() => {
      props.hideSideBar(null, true);
    }, 2000);
  }

  return (
    <>
      <style>
        {`
          .draggable-app {
            transition: transform 0.3s ease, opacity 0.3s ease;
            cursor: grab;
          }

          .draggable-app.dragging {
            opacity: 0.5;
            transform: scale(1.1);
            z-index: 50;
          }

          .draggable-app:hover {
            transform: scale(1.05);
          }

          .draggable-app:active {
            cursor: grabbing;
          }

          .relative .draggable-app {
            margin: 0 5px;
          }
        `}
      </style>

      {/* Bottom Bar with launchpad icon on the left and apps beside it */}
      <div className={(props.hide ? " translate-y-full " : "") + " absolute transform duration-300 select-none z-40 left-0 bottom-0 w-full h-auto flex flex-row items-center"}>
        {/* Blurred background div */}
        <div className="absolute w-full h-full backdrop-blur-lg bg-black bg-opacity-70 z-10"></div>
        
        {/* Icons on top of the blurred background */}
        <div className="relative flex flex-row items-center z-20">
          {/* Launchpad Icon (AllApps) on the Left */}
          <AllApps showApps={props.showAllApps} />

          {/* Apps beside the Launchpad Icon */}
          <div className="flex flex-row items-center">
            {Object.keys(props.closed_windows).length !== 0 ? renderApps() : null}
          </div>
        </div>
      </div>

      {/* Hover Area for Showing the Bottom Bar */}
      <div onMouseEnter={showBottomBar} onMouseLeave={hideBottomBar} className={"w-full h-1 absolute bottom-0 left-0 bg-transparent z-50"}></div>
    </>
  );
}

export function AllApps(props) {
  const [title, setTitle] = useState(false);

  return (
    <div
      className={`w-10 h-10 rounded m-1 hover:bg-white hover:bg-opacity-10 flex items-center justify-center`}
      onMouseEnter={() => setTitle(true)}
      onMouseLeave={() => setTitle(false)}
      onClick={props.showApps}
    >
      <div className="relative">
        <img width="28px" height="28px" className="w-7" src="./themes/Yaru/status/windows-full.svg" alt="Ubuntu view app" />
        <div
          className={
            (title ? " visible " : " invisible ") +
            " w-max py-0.5 px-1.5 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md"
          }
        >
          Show Applications
        </div>
      </div>
    </div>
  );
}
