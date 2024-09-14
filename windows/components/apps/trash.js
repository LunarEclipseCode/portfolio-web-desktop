import React, { Component } from "react";
import $ from "jquery";

export class Trash extends Component {
  constructor() {
    super();
    this.initialTrashItems = [
      {
        name: "node_modules",
        icon: "./themes/Yaru/system/folder.svg",
      },
    ];
    this.state = {
      empty: false,
      trashItems: [...this.initialTrashItems],
    };
  }

  componentDidMount() {
    let wasEmpty = localStorage.getItem("trash-empty");
    if (wasEmpty !== null && wasEmpty !== undefined) {
      if (wasEmpty === "true") {
        this.setState({ empty: true, trashItems: [] });
      }
    }
  }

  focusFile = (e) => {
    $(e.target).children().get(0).classList.toggle("opacity-60");
    $(e.target).children().get(1).classList.toggle("bg-ub-orange");
  };

  emptyTrash = () => {
    this.setState({ empty: true, trashItems: [] });
    localStorage.setItem("trash-empty", true);
  };

  restoreTrash = () => {
    this.setState({ empty: false, trashItems: [...this.initialTrashItems] });
    localStorage.setItem("trash-empty", false);
  };

  emptyScreen = () => {
    return (
      <div className="flex-grow flex flex-col justify-center items-center bg-[#111111]">
        <img className=" w-24" src="./themes/Yaru/apps/recycle-empty.png" alt="Ubuntu Trash" />
        <span className="font-bold mt-4 text-xl px-1 text-gray-400">Recycle Bin is empty</span>
      </div>
    );
  };

  showTrashItems = () => {
    return (
      <div className="flex-grow pl-4 flex flex-wrap items-start content-start justify-start overflow-y-auto windowMainScreen bg-[#111111]">
        {this.state.trashItems.map((item, index) => {
          return (
            <div key={index} tabIndex="1" onFocus={this.focusFile} onBlur={this.focusFile} className="flex flex-col items-center text-sm outline-none w-16 my-2 mx-4">
              <div className="w-14 h-16 flex items-center justify-center">
                <img src={item.icon} alt="Ubuntu File Icons" />
              </div>
              <span className="text-center rounded px-0.5">{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="w-full h-full flex flex-col bg-ub-cool-grey text-white select-none">
        <div className="flex items-center justify-between w-full bg-neutral-700 text-sm">
          <span className="font-bold ml-2"></span>
          <div className="flex">
            {this.state.empty ? (
              <div onClick={this.restoreTrash} className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80">
                Restore
              </div>
            ) : (
              <div onClick={this.emptyTrash} className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80">
                Empty
              </div>
            )}
          </div>
        </div>
        {this.state.empty ? this.emptyScreen() : this.showTrashItems()}
      </div>
    );
  }
}

export default Trash;

export const displayTrash = () => {
  return <Trash> </Trash>;
};
