import React, { Component } from "react";
import axios from "axios";
import { FiCopy, FiCheck, FiRefreshCcw } from "react-icons/fi";
import "katex/dist/katex.min.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const scrollbarStyle = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 0.6em;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #333;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #444;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }
  .custom-scrollbar {
    scroll-behavior: smooth;
    overscroll-behavior: none;
  }
`;

export class GPT extends Component {
  constructor() {
    super();
    this.state = {
      conversation: [],
      userInput: "",
      isLoading: false,
      copiedMessageIndex: null,
      showPrompts: true,
      copiedCodeBlock: null,
    };
  }

  handleUserInput = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.handleSendMessage();
    }
  };

  handleSendMessage = async (userInput = this.state.userInput) => {
    const { conversation } = this.state;
    if (userInput.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: userInput,
    };

    this.setState({
      conversation: [...conversation, newMessage],
      userInput: "",
      isLoading: true,
      showPrompts: false,
    });

    await this.getGPTResponse(userInput);
  };

  getGPTResponse = async (userInput) => {
    try {
      const response = await fetch("https://api.raj-datta.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...this.state.conversation.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: userInput },
          ],
        }),
      });

      if (!response.ok) {
        console.error("Error in API response:", response.status, await response.text());
        return;
      }

      const data = await response.json();
      console.log("GPT Response data:", data);

      const gptResponse = {
        sender: "gpt",
        text: data.choices[0].message.content,
      };

      this.setState((prevState) => ({
        conversation: [...prevState.conversation, gptResponse],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      this.setState({ isLoading: false });
    }
  };

  handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copiedMessageIndex: index });
      setTimeout(() => {
        this.setState({ copiedMessageIndex: null });
      }, 2000);
    });
  };

  handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      this.setState({ copiedCodeBlock: code });
      setTimeout(() => {
        this.setState({ copiedCodeBlock: null });
      }, 2000);
    });
  };

  handleRegenerate = async (index) => {
    const { conversation } = this.state;
    const messageToRegenerate = conversation[index - 1];

    const newConversation = conversation.slice(0, index);

    this.setState({
      conversation: newConversation,
      isLoading: true,
    });

    await this.getGPTResponse(messageToRegenerate.text);
  };

  handlePromptClick = (prompt) => {
    this.handleSendMessage(prompt);
  };

  replaceLatexDelimiters = (text) => {
    return text.replace(/\\\(/g, "$").replace(/\\\)/g, "$").replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
  };

  createTableFromText = (text) => {
    const rows = text
      .trim()
      .split("\n")
      .map((row) => row.split("|").filter((col) => col.trim() !== ""));

    if (rows.length === 0) return null;

    const headerRow = rows[0];
    const bodyRows = rows.slice(1).filter((row) => !row.every((cell) => cell.trim().replace(/-/g, "").length === 0));

    return (
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
          <thead>
            <tr className="bg-zinc-800 text-left text-zinc-400">
              {headerRow.map((header, index) => (
                <th key={index} className="px-4 py-2 border-b border-zinc-700">
                  {this.renderMarkdownCell(header.trim())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-zinc-400">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border-b border-zinc-700">
                    {this.renderMarkdownCell(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  renderMarkdownCell = (text) => {
    const processedText = this.replaceLatexDelimiters(text);
    return (
      <ReactMarkdown
        children={processedText}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            return !inline && language ? (
              <div className="relative custom-scrollbar overflow-x-auto bg-zinc-800 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-30">
                <div className="flex justify-between items-center bg-zinc-700 text-gray-300 p-2 text-xs font-mono rounded-t-lg">
                  <span>{language}</span>
                  <button onClick={() => this.handleCopyCode(children)} className="flex items-center space-x-1 text-gray-500 hover:text-gray-300 transition duration-300">
                    {this.state.copiedCodeBlock === children ? (
                      <>
                        <FiCheck className="text-green-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <SyntaxHighlighter className="code-block" style={a11yDark} language={language} PreTag="div" children={String(children).replace(/\n$/, "")} {...props} />
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          del: ({ children }) => <del>{children}</del>,
        }}
      />
    );
  };

  splitContentIntoSections = (message) => {
    const lines = message.split("\n");
    const sections = [];
    let currentSection = { type: "text", content: [] };

    lines.forEach((line) => {
      if (/\|.*\|/.test(line)) {
        if (currentSection.type === "text" && currentSection.content.length > 0) {
          sections.push(currentSection);
          currentSection = { type: "table", content: [] };
        }
        currentSection.content.push(line);
      } else {
        if (currentSection.type === "table" && currentSection.content.length > 0) {
          sections.push(currentSection);
          currentSection = { type: "text", content: [] };
        }
        currentSection.content.push(line);
      }
    });

    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  renderSection = (section, index) => {
    if (section.type === "table") {
      return (
        <div key={index} className="mt-2 mb-4">
          {this.createTableFromText(section.content.join("\n"))}
        </div>
      );
    } else {
      const processedText = this.replaceLatexDelimiters(section.content.join("\n"));
      return (
        <ReactMarkdown
          key={index}
          children={processedText}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              return !inline && language ? (
                <div className="relative custom-scrollbar overflow-x-auto">
                  <div className="flex justify-between items-center bg-zinc-800 text-gray-300 p-2 text-xs font-mono rounded-t-lg custom-scrollbar">
                    <span>{language}</span>
                    <button onClick={() => this.handleCopyCode(children)} className="flex items-center space-x-1 text-gray-500 hover:text-gray-300 custom-scrollbar">
                      {this.state.copiedCodeBlock === children ? (
                        <>
                          <FiCheck className="text-green-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter style={a11yDark} language={language} PreTag="div" children={String(children).replace(/\n$/, "")} className="custom-scrollbar" {...props} />
                  <style>{scrollbarStyle}</style>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            del: ({ children }) => <del>{children}</del>,
          }}
        />
      );
    }
  };

  renderMessageContent = (message) => {
    const sections = this.splitContentIntoSections(message);
    return sections.map(this.renderSection);
  };

  renderConversation = () => {
    return (
      <div className="flex-grow flex flex-col items-start justify-start overflow-y-auto p-0 bg-zinc-950 custom-scrollbar">
        {this.state.conversation.map((message, index) => {
          const isGPT = message.sender === "gpt";
          const messageClass = isGPT ? "bg-zinc-800 text-zinc-400 shadow-lg backdrop-blur-md bg-opacity-50 ml-2" : "bg-zinc-900 text-zinc-400 shadow-lg backdrop-blur-md bg-opacity-50 mr-3 mt-1";

          const alignmentClass = isGPT ? "self-start" : "self-end";
          const mobileWidthClass = isGPT ? "w-10/12 sm:w-8/12" : "w-10/12 sm:w-8/12";
          const textAlignClass = "text-left";

          return (
            <div key={index} className={`${mobileWidthClass} mb-2 ${alignmentClass}`}>
              <div className={`p-4 rounded-lg ${messageClass} ${textAlignClass} max-w-full break-words`}>{this.renderMessageContent(message.text)}</div>
              {isGPT && (
                <div className="flex justify-start space-x-2 mt-2 mx-2">
                  <button className="text-xs text-gray-400 hover:text-gray-100 flex items-center transition duration-300" onClick={() => this.handleCopy(message.text, index)}>
                    {this.state.copiedMessageIndex === index ? <FiCheck className="text-green-400 text-lg" /> : <FiCopy className="text-lg" />}
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-100 flex items-center transition duration-300" onClick={() => this.handleRegenerate(index)}>
                    <FiRefreshCcw className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {this.state.isLoading && <div className="p-3 my-0 rounded-lg bg-zinc-800 text-zinc-400 self-start shadow-md animate-pulse w-10/12 sm:w-8/12 max-w-full md:max-w-3xl mb-2 ml-2">Fetching response from OpenAI...</div>}
      </div>
    );
  };

  renderPromptOptions = () => {
    const prompts = ["Integrate (x^2)*sin(x)/(1+x^2) from 0 to pi", "Write a Python function that returns a list of primenumbers from 1 to n", "Create a table showing the values of the Riemann Zeta function and the Gamma function for the first 7 positive integers."];

    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 lg:space-y-5 mx-5">
        {prompts.map((prompt, index) => (
          <button key={index} onClick={() => this.handlePromptClick(prompt)} className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded-md hover:bg-zinc-700 transition duration-300 w-full max-w-2xl text-center shadow-lg">
            {prompt}
          </button>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-400 select-none custom-scrollbar">
        <style>{scrollbarStyle}</style>
        {this.state.showPrompts && !this.state.conversation.length && <div className="flex-grow flex items-center justify-center">{this.renderPromptOptions()}</div>}
        <div className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">{this.renderConversation()}</div>
        <div className="flex items-center justify-between w-full bg-zinc-950 bg-opacity-50 text-sm p-2.5">
          <input
            type="text"
            value={this.state.userInput}
            onChange={this.handleUserInput}
            onKeyPress={this.handleKeyPress}
            className="flex-grow bg-zinc-900 text-zinc-400 text-md p-2.5 px-4 rounded-lg outline-none shadow-inner placeholder-zinc-400 w-full"
            placeholder="Type a message..."
          />
          <button onClick={() => this.handleSendMessage(this.state.userInput)} className="border border-transparent bg-zinc-800 px-4 py-2 ml-2 rounded-lg text-zinc-400 shadow-md hover:bg-zinc-700 transition duration-300">
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default GPT;

export const displayGPT = () => {
  return <GPT />;
};
