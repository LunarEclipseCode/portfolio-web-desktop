import React, { Component } from "react";
import $ from "jquery";

export class Terminal extends Component {
  constructor() {
    super();
    this.cursor = "";
    this.terminal_rows = 1;
    this.current_directory = "~";
    this.curr_dir_name = "root";
    this.prev_commands = [];
    this.commands_index = -1;
    this.child_directories = {
      root: ["books", "projects", "skills", "languages", "interests"],
      books: ["James Norbury - Big Panda and Tiny Dragon.pdf"],
      skills: ["Quantum Computing", "Computational Biology", "UI Customization", "Web Scraping"],
      projects: ["portfolio", "survivor-library-downloader"],
      interests: ["pokemon", "hot wheels"],
      languages: ["Python", "Qiskit", "C", "Java", "CSS"],
    };
    this.state = {
      terminal: [],
    };
  }

  componentDidMount() {
    this.reStartTerminal();
  }

  componentDidUpdate() {
    clearInterval(this.cursor);
    this.startCursor(this.terminal_rows - 2);
  }

  componentWillUnmount() {
    clearInterval(this.cursor);
  }

  reStartTerminal = () => {
    clearInterval(this.cursor);
    $("#terminal-body").empty();
    this.appendTerminalRow();
  };

  appendTerminalRow = () => {
    let terminal = this.state.terminal;
    terminal.push(this.terminalRow(this.terminal_rows));
    this.setState({ terminal });
    this.terminal_rows += 2;
  };

  terminalRow = (id) => {
    const rowStyle = {
      display: "flex",
      width: "100%",
      height: "20px",
    };

    const usernameStyle = {
      color: "#0dbf0d", // Green
    };

    const colonStyle = {
      color: "#e5e5e5", // Light white
      marginLeft: "2px",
      marginRight: "2px",
    };

    const directoryStyle = {
      color: "#00aaff", // Blue
    };

    const dollarStyle = {
      color: "#e5e5e5", // Light white
      marginLeft: "2px",
      marginRight: "4px",
    };

    const cursorStyle = {
      marginTop: "4px",
      width: "6px",
      height: "14px",
      backgroundColor: "#e5e5e5", // White
    };

    return (
      <React.Fragment key={id}>
        <div style={rowStyle}>
          <div className="flex">
            <div style={usernameStyle}>lunar@eclipse</div>
            <div style={colonStyle}>:</div>
            <div style={directoryStyle}>{this.current_directory}</div>
            <div style={dollarStyle}>$</div>
          </div>
          <div id="cmd" onClick={this.focusCursor} className=" bg-transparent relative flex-1 overflow-hidden">
            <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
            <div id={`cursor-${id}`} style={cursorStyle}></div>
            <input
              id={`terminal-input-${id}`}
              data-row-id={id}
              onKeyDown={this.checkKey}
              onBlur={this.unFocusCursor}
              className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
              spellCheck={false}
              autoFocus={true}
              autoComplete="off"
              type="text"
            />
          </div>
        </div>
        <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
      </React.Fragment>
    );
  };

  focusCursor = (e) => {
    clearInterval(this.cursor);
    this.startCursor($(e.target).data("row-id"));
  };

  unFocusCursor = (e) => {
    this.stopCursor($(e.target).data("row-id"));
  };

  startCursor = (id) => {
    clearInterval(this.cursor);
    $(`input#terminal-input-${id}`).trigger("focus");
    // Update the cursor position on every input change
    $(`input#terminal-input-${id}`).on("input", function () {
      const inputVal = $(this).val();
      $(`#cmd span#show-${id}`).text(inputVal);

      // Move the cursor to the end of the input text
      const textWidth = $(`#cmd span#show-${id}`).width();
      $(`#cursor-${id}`).css({
        marginLeft: `${textWidth}px`,
      });
    });
    this.cursor = window.setInterval(function () {
      if ($(`#cursor-${id}`).css("visibility") === "visible") {
        $(`#cursor-${id}`).css({ visibility: "hidden" });
      } else {
        $(`#cursor-${id}`).css({ visibility: "visible" });
      }
    }, 500);
  };

  stopCursor = (id) => {
    clearInterval(this.cursor);
    $(`#cursor-${id}`).css({ visibility: "visible" });
  };

  removeCursor = (id) => {
    this.stopCursor(id);
    $(`#cursor-${id}`).css({ display: "none" });
  };

  clearInput = (id) => {
    $(`input#terminal-input-${id}`).trigger("blur");
  };

  /**
   * Handle Tab key for autocomplete and prevent default focus switch.
   * Also prevent focus shift to other DOM elements.
   */
  checkKey = (e) => {
    const terminal_row_id = $(e.target).data("row-id");
    const inputVal = $(`input#terminal-input-${terminal_row_id}`).val().trim();
    const currentDirContent = this.child_directories[this.curr_dir_name] || [];

    if (e.key === "Tab") {
      e.preventDefault(); // Prevent the default focus switching

      // Implement a simple autocomplete by checking the input value against the current directory contents
      const matches = currentDirContent.filter((file) => file.startsWith(inputVal));

      if (matches.length === 1) {
        // Autocomplete to the full file or directory name
        $(`input#terminal-input-${terminal_row_id}`).val(matches[0]);
        $(`#show-${terminal_row_id}`).text(matches[0]);
      }
    } else if (e.key === "Enter") {
      let command = inputVal;
      if (command.length !== 0) {
        this.removeCursor(terminal_row_id);
        this.handleCommands(command, terminal_row_id);
      } else return;
      // push to history
      this.prev_commands.push(command);
      this.commands_index = this.prev_commands.length - 1;

      this.clearInput(terminal_row_id);
    } else if (e.key === "ArrowUp") {
      let prev_command;

      if (this.commands_index <= -1) prev_command = "";
      else prev_command = this.prev_commands[this.commands_index];

      $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
      $(`#show-${terminal_row_id}`).text(prev_command);

      this.commands_index--;
    } else if (e.key === "ArrowDown") {
      let prev_command;

      if (this.commands_index >= this.prev_commands.length) return;
      if (this.commands_index <= -1) this.commands_index = 0;

      if (this.commands_index === this.prev_commands.length) prev_command = "";
      else prev_command = this.prev_commands[this.commands_index];

      $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
      $(`#show-${terminal_row_id}`).text(prev_command);

      this.commands_index++;
    }
  };

  childDirectories = (parent) => {
    let files = [];
    files.push(`<div class="flex justify-start flex-wrap">`);
    this.child_directories[parent].forEach((file) => {
      // Remove the quotes around the names
      files.push(`<span class="font-bold mr-2" style="color: #00aaff">${file}</span>`);
    });
    files.push(`</div>`);
    return files;
  };

  closeTerminal = () => {
    $("#close-terminal").trigger("click");
  };

  handleCommands = (command, rowId) => {
    const words = command.split(" ").filter(Boolean);
    const main = words[0];
    const resultElement = document.getElementById(`row-result-${rowId}`);
    words.shift(); // Remove the command from the words
    let rest = words.join(" ").trim();
    let result = "";

    const validateArgs = (expectedArgs = 1) => {
      if (words.length > expectedArgs) {
        result = `too many arguments, arguments must be <${expectedArgs}.`;
        return false;
      }
      return true;
    };

    const openAppHandler = (app) => {
      if (validateArgs(1) && (words[0] === "." || words.length === 0)) {
        this.props.openApp(app);
      } else {
        result = `Command '${main}' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-raj, todoist, trash, settings, sendmsg ]`;
      }
    };

    const appCommands = ["calc", "code", "chrome", "music", "trash", "about-raj", "settings", "sendmsg", "numworks", "quill", "paint", "trading", "image-editor", "vmbox", "chess", "algo-visual", "devtoys", "chatgpt"];

    switch (main) {
      case "cd":
        if (!validateArgs(1)) break;
        if (rest === "") {
          this.current_directory = "~";
          this.curr_dir_name = "root";
          break;
        }
        let pathParts = rest.split("/");
        let newDirectory = this.curr_dir_name === "root" ? "root" : this.current_directory.replace("~", "root").split("/").pop();
        let newCurrentDirectory = this.current_directory.replace("~", "root").split("/");

        for (let part of pathParts) {
          if (part === "..") {
            if (newCurrentDirectory.length > 1) {
              newCurrentDirectory.pop();
              newDirectory = newCurrentDirectory[newCurrentDirectory.length - 1];
            }
          } else if (part !== "." && part !== "") {
            if (this.child_directories[newDirectory] && this.child_directories[newDirectory].includes(part)) {
              newCurrentDirectory.push(part);
              newDirectory = part;
            } else {
              result = `bash: cd: ${rest}: No such file or directory`;
              break;
            }
          }
        }

        if (result === "") {
          this.current_directory = newCurrentDirectory.join("/").replace("root", "~");
          this.curr_dir_name = newDirectory;
        }
        break;
      case "ls":
        if (!validateArgs(1)) break;
        let target = words[0] || this.curr_dir_name;
        result = target in this.child_directories ? this.childDirectories(target).join("") : `ls: cannot access '${target}': No such file or directory`;
        break;
      case "mkdir":
        result = words[0] ? this.props.addFolder(words[0]) : "mkdir: missing operand";
        break;
      case "pwd":
        result = this.current_directory.replace("~", "/home/raj");
        break;
      case "echo":
        result = this.xss(words.join(" "));
        break;
      case "clear":
        this.reStartTerminal();
        return;
      case "exit":
        this.closeTerminal();
        return;
      case "sudo":
        result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
        break;
      case "rick":
        result = `<iframe class='w-2/5' src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
        break;
      default:
        if (appCommands.includes(main)) {
          openAppHandler(main);
        } else {
          result = `Command '${main}' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-raj, todoist, trash, settings, sendmsg ]`;
        }
    }

    resultElement.innerHTML = result;
    this.appendTerminalRow();
  };

  xss(str) {
    if (!str) return;
    return str
      .split("")
      .map((char) => {
        switch (char) {
          case "&":
            return "&amp";
          case "<":
            return "&lt";
          case ">":
            return "&gt";
          case '"':
            return "&quot";
          case "'":
            return "&#x27";
          case "/":
            return "&#x2F";
          default:
            return char;
        }
      })
      .join("");
  }

  render() {
    const terminalStyle = {
      height: "100%",
      width: "100%",
      backgroundColor: "#0c0c0c", // Dark background for Windows Terminal
      color: "#e5e5e5", // Light white text
      fontFamily: "'Consolas', 'Courier New', monospace", // Monospaced font
      fontSize: "14px",
      fontWeight: "bold",
    };

    return (
      <div style={terminalStyle} id="terminal-body">
        {this.state.terminal}
      </div>
    );
  }
}

export default Terminal;

export const displayTerminal = (addFolder, openApp, closeWindow) => {
  return (
    <Terminal addFolder={addFolder} openApp={openApp} closeWindow={closeWindow}>
      {" "}
    </Terminal>
  );
};
