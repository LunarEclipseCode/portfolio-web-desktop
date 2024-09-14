import React, { Component } from "react";
import yaml from "js-yaml";
import { md5, sha3, blake2b, blake3 } from "hash-wasm";
import { LoremIpsum } from "lorem-ipsum";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import parserMarkdown from "prettier/plugins/markdown";
import parserTypeScript from "prettier/plugins/typescript";
import parserGraphql from "prettier/plugins/graphql";
import parserYaml from "prettier/plugins/yaml";
import parserJava from "prettier-plugin-java";
import parserPhp from "@prettier/plugin-php";
import * as prettierPluginEstree from "prettier/plugins/estree";
import morse from "morse-decoder";
import QRCode from "qrcode";
import jsQR from "jsqr";
import base64 from "base-64";
import base32 from "hi-base32";
import baseX from "base-x";
import nearestPantone from "nearest-pantone";
import { hexToCSSFilter } from "hex-to-css-filter";
import colorConvert from "color-convert";
import { Buffer } from "buffer";

const tailwindColors = {
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },

  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },

  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },

  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },

  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },

  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },

  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },

  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },

  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },

  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },

  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },

  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },

  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },

  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },

  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },

  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },

  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },

  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },

  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },

  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },

  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },

  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  }
};

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SaveIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="saveIconTitle"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="square"
    stroke-linejoin="miter"
    fill="none"
    color="currentColor"
  >
    {" "}
    <title id="saveIconTitle">Save</title>{" "}
    <path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z" />{" "}
    <rect width="10" height="8" x="7" y="13" /> <rect width="8" height="5" x="8" y="3" />{" "}
  </svg>
);

const ToolItem = ({ onClick, imgSrc, altText, toolName, description }) => (
  <div
    onClick={onClick}
    className="tool-item flex group relative transition-all duration-300 hover:scale-95 overflow-hidden items-center gap-6 rounded-lg shadow-md dark:shadow-lg hover:shadow-2xl outline-none bg-gray-200 hover:bg-gray-100 dark:bg-gray-800/70 dark:hover:bg-gray-600/60 dark:focus:bg-gray-700/70 cursor-pointer p-6 h-32"
  >
    <div className="h-24 w-24">
      <img
        src={imgSrc}
        alt={altText}
        className="object-cover h-full w-full filter invert-0 dark:invert contrast-200 brightness-200"
      />
    </div>
    <div className="flex flex-col flex-1">
      <div className="font-semibold text-black dark:text-white text-base">{toolName}</div>
      <div className="text-black dark:text-gray-300 text-sm">{description}</div>
    </div>
  </div>
);

const CustomScrollbar = () => (
  <style>
    {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #1F2937;
        }
      `}
  </style>
);

export class DevToys extends Component {
  constructor() {
    super();
    this.state = {
      selectedTool: null,
      showTopBar: false,

      // JSON to YAML Converter
      jsonInput: "",
      yamlInput: "",
      yamlOutput: "",
      jsonError: null,
      yamlError: null,

      // Number Base Converter
      decimalInput: "",
      hexInput: "",
      octalInput: "",
      binaryInput: "",
      formatNumber: true,
      error: null,

      // Hash Generator
      hashInput: "",
      md5: "",
      sha3256: "",
      sha3512: "",
      blake3: "",
      blake2b: "",

      // Password Generator
      uppercase: false,
      passwordLength: 12,
      includeLowercase: true,
      includeUppercase: true,
      includeDigits: true,
      includeSpecial: true,
      excludeCharacters: "",
      generatedPasswords: [],
      numberOfPasswords: 1,

      // Lorem Ipsum Generator
      loremType: "paragraphs",
      loremLength: 3,
      generatedLorem: "",

      // Code Formatter
      codeInput: "",
      formattedCode: "",
      codeError: null,
      selectedLanguage: "babel",

      // Morse Code
      morseInput: "",
      morseOutput: "",
      morseError: null,
      isMorseEncoding: true,

      // QR Code
      qrInput: "",
      qrOutput: "",
      qrError: null,
      qrMode: "encode",
      qrCanvas: null,
      uploadedImage: null,

      // Base Encoder
      baseInput: "",
      baseOutput: "",
      baseError: null,
      isEncoding: true,
      selectedBase: "base64",

      // color code converter
      colorInput: "#3498db",
      rgb: "52, 152, 219",
      hsl: "204, 70, 53",
      cmyk: "76, 31, 0, 14",
      pantone: "bonnie-blue",
      tailwind: "blue-500",
      cssFilter:
        "invert(59%) sepia(15%) saturate(2275%) hue-rotate(165deg) brightness(89%) contrast(93%);",

      // encryption
      isEncrypting: true,
      encryptionPassword: "",
      encryptionInput: "",
      encryptionOutput: "",
      encryptionError: null,
      showPassword: false
    };
    this.scrollableRef = React.createRef();
    this.observer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    // Scroll the container to the top if selected tool changed
    if (
      prevState.selectedTool !== this.state.selectedTool &&
      this.scrollableRef.current
    ) {
      this.scrollableRef.current.scrollTop = 0;
    }
  }

  // Switch tools and clear errors
  selectTool = (tool) => {
    this.setState({
      selectedTool: tool,
      error: null,
      jsonError: null,
      yamlError: null,
      codeError: null,
      baseError: null,
      qrError: null
    });
  };

  handleCardClick = (tool) => {
    this.setState({
      selectedTool: tool,
      showTopBar: true
    });
  };

  handleBackToHome = () => {
    this.setState({
      selectedTool: null,
      showTopBar: false
    });
  };

  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  pasteFromClipboard = (onChange) => {
    navigator.clipboard.readText().then((text) => onChange({ target: { value: text } }));
  };

  // JSON to YAML Converter
  handleJsonInputChange = (e) => {
    const jsonInput = e.target.value;
    this.setState({ jsonInput });

    if (jsonInput.trim() === "") {
      this.setState({ yamlOutput: "", yamlInput: "", jsonError: null });
      return;
    }

    try {
      const yamlOutput = yaml.dump(JSON.parse(jsonInput));
      this.setState({ yamlOutput, yamlInput: yamlOutput, jsonError: null });
    } catch (error) {
      this.setState({ yamlOutput: "", jsonError: "Invalid JSON" });
    }
  };

  handleYamlInputChange = (e) => {
    const yamlInput = e.target.value;
    this.setState({ yamlInput });

    if (yamlInput.trim() === "") {
      this.setState({ jsonInput: "", yamlError: null });
      return;
    }

    try {
      const jsonOutput = JSON.stringify(yaml.load(yamlInput), null, 2);
      this.setState({ jsonInput: jsonOutput, yamlError: null });
    } catch (error) {
      this.setState({ jsonInput: "", yamlError: "Invalid YAML" });
    }
  };

  clearJsonInput = () => {
    this.setState({ jsonInput: "", yamlOutput: "", jsonError: null });
  };

  clearYamlInput = () => {
    this.setState({ yamlInput: "", jsonInput: "", yamlError: null });
  };

  renderJsonToYamlConverter = () => {
    const { jsonInput, yamlInput, jsonError, yamlError } = this.state;
    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            JSON to YAML Converter
          </h1>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            {/* JSON Section */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-700 dark:text-gray-300">JSON</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
                    onClick={() => this.copyToClipboard(jsonInput)}
                  >
                    <CopyIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.pasteFromClipboard(this.handleJsonInputChange)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clipboard"
                    >
                      <path d="M16 4h-2a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>

                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearJsonInput}
                  >
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder="Enter JSON"
                value={jsonInput}
                onChange={this.handleJsonInputChange}
              />
              {jsonError && <span className="text-red-500">{jsonError}</span>}
            </div>

            {/* YAML Section */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-700 dark:text-gray-300">YAML</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
                    onClick={() => this.copyToClipboard(yamlInput)}
                  >
                    <CopyIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.pasteFromClipboard(this.handleYamlInputChange)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clipboard"
                    >
                      <path d="M16 4h-2a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>

                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearYamlInput}
                  >
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder="Enter YAML"
                value={yamlInput}
                onChange={this.handleYamlInputChange}
              />
              {yamlError && <span className="text-red-500">{yamlError}</span>}
            </div>
          </section>
        </section>
      </main>
    );
  };

  // Number Base Converter
  formatOutput = (value, groupSize) => {
    return value.replace(
      new RegExp(`(.{1,${groupSize}})(?=(.{${groupSize}})+$)`, "g"),
      "$1 "
    );
  };

  handleDecimalChange = (e) => {
    const decimalValue = e.target.value;
    if (isNaN(decimalValue)) {
      this.setState({
        error: "Decimal",
        decimalInput: decimalValue,
        hexInput: "NaN",
        octalInput: "NaN",
        binaryInput: "NaN"
      });
      return;
    }

    const hexValue = parseInt(decimalValue, 10).toString(16).toUpperCase();
    const octalValue = parseInt(decimalValue, 10).toString(8);
    const binaryValue = parseInt(decimalValue, 10).toString(2);

    this.setState({
      error: null,
      decimalInput: decimalValue,
      hexInput: this.state.formatNumber ? this.formatOutput(hexValue, 4) : hexValue,
      octalInput: this.state.formatNumber ? this.formatOutput(octalValue, 3) : octalValue,
      binaryInput: this.state.formatNumber
        ? this.formatOutput(binaryValue, 4)
        : binaryValue
    });
  };

  handleHexChange = (e) => {
    const hexValue = e.target.value.replace(/\s+/g, "").toUpperCase();
    if (!/^[0-9A-F]*$/.test(hexValue)) {
      this.setState({
        error: "Hexadecimal",
        hexInput: hexValue,
        decimalInput: "NaN",
        octalInput: "NaN",
        binaryInput: "NaN"
      });
      return;
    }

    const decimalValue = parseInt(hexValue, 16).toString(10);
    const octalValue = parseInt(decimalValue, 10).toString(8);
    const binaryValue = parseInt(decimalValue, 10).toString(2);

    this.setState({
      error: null,
      decimalInput: decimalValue,
      hexInput: this.state.formatNumber ? this.formatOutput(hexValue, 4) : hexValue,
      octalInput: this.state.formatNumber ? this.formatOutput(octalValue, 3) : octalValue,
      binaryInput: this.state.formatNumber
        ? this.formatOutput(binaryValue, 4)
        : binaryValue
    });
  };

  handleOctalChange = (e) => {
    const octalValue = e.target.value.replace(/\s+/g, "");
    if (!/^[0-7]*$/.test(octalValue)) {
      this.setState({
        error: "Octal",
        octalInput: octalValue,
        decimalInput: "NaN",
        hexInput: "NaN",
        binaryInput: "NaN"
      });
      return;
    }

    const decimalValue = parseInt(octalValue, 8).toString(10);
    const hexValue = parseInt(decimalValue, 10).toString(16).toUpperCase();
    const binaryValue = parseInt(decimalValue, 10).toString(2);

    this.setState({
      error: null,
      decimalInput: decimalValue,
      hexInput: this.state.formatNumber ? this.formatOutput(hexValue, 4) : hexValue,
      octalInput: this.state.formatNumber ? this.formatOutput(octalValue, 3) : octalValue,
      binaryInput: this.state.formatNumber
        ? this.formatOutput(binaryValue, 4)
        : binaryValue
    });
  };

  handleBinaryChange = (e) => {
    const binaryValue = e.target.value.replace(/\s+/g, "");
    if (!/^[01]*$/.test(binaryValue)) {
      this.setState({
        error: "Binary",
        binaryInput: binaryValue,
        decimalInput: "NaN",
        hexInput: "NaN",
        octalInput: "NaN"
      });
      return;
    }

    const decimalValue = parseInt(binaryValue, 2).toString(10);
    const hexValue = parseInt(decimalValue, 10).toString(16).toUpperCase();
    const octalValue = parseInt(decimalValue, 10).toString(8);

    this.setState({
      error: null,
      decimalInput: decimalValue,
      hexInput: this.state.formatNumber ? this.formatOutput(hexValue, 4) : hexValue,
      octalInput: this.state.formatNumber ? this.formatOutput(octalValue, 3) : octalValue,
      binaryInput: this.state.formatNumber
        ? this.formatOutput(binaryValue, 4)
        : binaryValue
    });
  };

  toggleFormatNumber = () => {
    this.setState(
      (prevState) => ({
        formatNumber: !prevState.formatNumber
      }),
      () => {
        this.handleDecimalChange({ target: { value: this.state.decimalInput } });
      }
    );
  };

  toggleUppercase = () => {
    this.setState(
      (prevState) => ({
        uppercase: !prevState.uppercase
      }),
      () => {
        this.updateHashes(this.state.hashInput);
      }
    );
  };

  renderBaseConverter = () => {
    const { decimalInput, hexInput, octalInput, binaryInput, formatNumber, error } =
      this.state;
    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Number Base Converter
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg border bg-gray-200 dark:bg-gray-700 px-4">
                  <span className="text-gray-900 dark:text-white">Format number</span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={formatNumber}
                        onClick={this.toggleFormatNumber}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${formatNumber ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${formatNumber ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          {error && (
            <div className="text-red-500 font-semibold">
              The current value isn't a valid {error}.
            </div>
          )}
          <div className="flex flex-col gap-4">
            {this.renderBaseSection("Decimal", decimalInput, this.handleDecimalChange)}
            {this.renderBaseSection("Hexadecimal", hexInput, this.handleHexChange)}
            {this.renderBaseSection("Octal", octalInput, this.handleOctalChange)}
            {this.renderBaseSection("Binary", binaryInput, this.handleBinaryChange)}
          </div>
        </section>
      </main>
    );
  };

  renderBaseSection = (label, value, onChange) => {
    return (
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="self-end text-lg text-gray-700 dark:text-gray-300">{label}</h2>
          <div className="flex">
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
              onClick={() => this.copyToClipboard(value)}
            >
              <CopyIcon />
            </button>
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
              onClick={() => this.pasteFromClipboard(onChange)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard"
              >
                <path d="M16 4h-2a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 rounded-lg">
          <input
            className="h-10 flex-grow bg-transparent px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono rounded-md"
            spellCheck="false"
            value={value}
            onChange={onChange}
          />
        </div>
      </section>
    );
  };

  // Hash Generator
  async updateHashes(input) {
    if (input.trim() === "") {
      this.setState({
        md5: "",
        sha3256: "",
        sha3512: "",
        blake3: "",
        blake2b: ""
      });
      return;
    }

    const md5Hash = await md5(input);
    const sha3256Hash = await sha3(input, 256);
    const sha3512Hash = await sha3(input, 512);
    const blake3Hash = await blake3(input);
    const blake2bHash = await blake2b(input);

    this.setState({
      md5: this.state.uppercase ? md5Hash.toUpperCase() : md5Hash,
      sha3256: this.state.uppercase ? sha3256Hash.toUpperCase() : sha3256Hash,
      sha3512: this.state.uppercase ? sha3512Hash.toUpperCase() : sha3512Hash,
      blake3: this.state.uppercase ? blake3Hash.toUpperCase() : blake3Hash,
      blake2b: this.state.uppercase ? blake2bHash.toUpperCase() : blake2bHash
    });
  }

  handleHashInputChange = async (e) => {
    const hashInput = e.target.value;
    this.setState({ hashInput });
    await this.updateHashes(hashInput);
  };

  renderHashSection = (label, value) => {
    return (
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="self-end text-lg text-gray-700 dark:text-gray-300">{label}</h2>
          <div className="flex">
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
              onClick={() => this.copyToClipboard(value)}
            >
              <CopyIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 rounded-lg">
          <input
            className="h-10 flex-grow bg-transparent px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono rounded-md"
            spellCheck="false"
            value={value}
            readOnly
          />
        </div>
      </section>
    );
  };

  renderHashGenerator = () => {
    const { hashInput, md5, sha3256, sha3512, blake3, blake2b, uppercase } = this.state;
    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Hash Generator
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg border bg-gray-200 dark:bg-gray-700 px-4">
                  <span className="text-gray-900 dark:text-white">Uppercase</span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={uppercase}
                        onClick={this.toggleUppercase}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${uppercase ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${uppercase ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-lg text-gray-700 dark:text-gray-300">Input</h2>
            </div>
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 rounded-lg">
              <input
                className="h-10 flex-grow bg-transparent px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono rounded-md"
                placeholder="Enter text to hash"
                value={hashInput}
                onChange={this.handleHashInputChange}
              />
            </div>
            {this.renderHashSection("MD5", md5)}
            {this.renderHashSection("SHA3-256", sha3256)}
            {this.renderHashSection("SHA3-512", sha3512)}
            {this.renderHashSection("BLAKE3", blake3)}
            {this.renderHashSection("BLAKE2b", blake2b)}
          </section>
        </section>
      </main>
    );
  };

  // Password Generator
  generatePassword = () => {
    const {
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeDigits,
      includeSpecial,
      excludeCharacters,
      numberOfPasswords
    } = this.state;
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    let characterPool = "";

    if (includeLowercase) characterPool += lowercaseChars;
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeDigits) characterPool += digitChars;
    if (includeSpecial) characterPool += specialChars;

    if (excludeCharacters) {
      characterPool = characterPool
        .split("")
        .filter((char) => !excludeCharacters.includes(char))
        .join("");
    }

    if (characterPool.length === 0) {
      this.setState({
        generatedPasswords: [],
        errorMessage: "No password can be generated because no characters are left."
      });
      return;
    }

    const passwords = [];
    for (let i = 0; i < numberOfPasswords; i++) {
      let password = "";
      for (let j = 0; j < passwordLength; j++) {
        const randomIndex = Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
            characterPool.length
        );
        password += characterPool[randomIndex];
      }
      passwords.push(password);
    }

    this.setState({ generatedPasswords: passwords });
  };

  handlePasswordLengthChange = (e) => {
    this.setState({ passwordLength: e.target.value });
  };

  handleExcludeCharactersChange = (e) => {
    this.setState({ excludeCharacters: e.target.value });
  };

  handleToggleOption = (option) => {
    this.setState((prevState) => ({
      [option]: !prevState[option]
    }));
  };

  handleNumberOfPasswordsChange = (e) => {
    this.setState({ numberOfPasswords: e.target.value });
  };

  renderPasswordGenerator = () => {
    const {
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeDigits,
      includeSpecial,
      excludeCharacters,
      generatedPasswords,
      numberOfPasswords,
      errorMessage
    } = this.state;

    const handlePasswordLengthChange = (event) => {
      const value = event.target.value;
      if (!isNaN(value) && !value.includes("e")) {
        this.setState({ passwordLength: value });
      }
    };

    const copyPasswordsToClipboard = () => {
      const { generatedPasswords } = this.state;
      navigator.clipboard.writeText(generatedPasswords.join("\n"));
    };

    const saveAsText = () => {
      const { generatedPasswords } = this.state;
      const element = document.createElement("a");
      const file = new Blob([generatedPasswords.join("\n")], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "passwords.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    };

    const clearPasswords = () => {
      this.setState({ generatedPasswords: [] });
    };

    const processPasswordGen = () => {
      let value = parseInt(this.state.passwordLength);
      let errorMessage = "";

      if (isNaN(value) || value < 8) {
        value = 8;
        errorMessage = "Password has to be at least 8 characters long.";
      } else if (value > 128) {
        value = 128;
        errorMessage = "Sorry, cannot create password with more than 128 characters.";
      }

      this.setState({ passwordLength: value, errorMessage }, this.generatePassword);
    };

    const handleNumberInputChange = (event, handler) => {
      const value = event.target.value;
      if (!isNaN(value) && !value.includes("e")) {
        handler(event);
      }
    };

    const calculateLineNumberWidth = () => {
      const maxDigits = Math.max(generatedPasswords.length.toString().length, 3);
      return 8 + maxDigits * 8;
    };

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <style>{`
            .line-number-background {
              padding-bottom: 0.5em;
              min-height: 100%;
              width: ${calculateLineNumberWidth()}px; /* Dynamically calculated width */
            }
            
            .custom-number-input {
              -webkit-appearance: none;
              -moz-appearance: textfield;
              text-align: center;
            }
  
            /* Remove arrows in Chrome, Safari, Edge, Opera */
            .custom-number-input::-webkit-outer-spin-button,
            .custom-number-input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
  
            /* Remove arrows in Firefox */
            .custom-number-input {
              -moz-appearance: textfield;
            }
        `}</style>
        <section className="flex flex-col gap-0">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Password Generator
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Password Length
                  </span>
                  <input
                    type="number"
                    value={passwordLength}
                    onChange={handlePasswordLengthChange}
                    className="h-10 w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 rounded-lg text-center custom-number-input"
                    min="8"
                    max="128"
                  />
                </div>
              </li>
              {errorMessage && (
                <li>
                  <p className="text-red-500 text-base">{errorMessage}</p>
                </li>
              )}
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Include Lowercase Characters
                  </span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeLowercase}
                        onClick={() => this.handleToggleOption("includeLowercase")}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${includeLowercase ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${includeLowercase ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Include Uppercase Characters
                  </span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeUppercase}
                        onClick={() => this.handleToggleOption("includeUppercase")}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${includeUppercase ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${includeUppercase ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Include Digits
                  </span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeDigits}
                        onClick={() => this.handleToggleOption("includeDigits")}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${includeDigits ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${includeDigits ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Include Special Characters
                  </span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeSpecial}
                        onClick={() => this.handleToggleOption("includeSpecial")}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${includeSpecial ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${includeSpecial ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        On
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4 h-14">
                  <span className="text-gray-900 dark:text-white flex-1">
                    Exclude Characters
                  </span>
                  <input
                    type="text"
                    value={excludeCharacters}
                    onChange={this.handleExcludeCharactersChange}
                    className="h-10 w-48 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 rounded-lg text-left"
                  />
                </div>
              </li>
            </ul>
          </section>

          <div className="flex items-center mb-0 mt-6">
            <button
              onClick={processPasswordGen}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Generate Passwords
            </button>
            <span className="text-gray-900 dark:text-white mx-2">x</span>
            <input
              type="number"
              value={numberOfPasswords}
              onChange={(event) =>
                handleNumberInputChange(event, this.handleNumberOfPasswordsChange)
              }
              className="h-10 w-16 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-2 rounded-lg text-center custom-number-input"
              min="1"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-4"
              onClick={saveAsText}
            >
              <SaveIcon />
            </button>
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
              onClick={copyPasswordsToClipboard}
            >
              <CopyIcon />
            </button>
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
              onClick={clearPasswords}
            >
              <ClearIcon />
            </button>
          </div>
          <section className="flex flex-col gap-4">
            <div className="relative h-64 border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white overflow-auto custom-scrollbar">
              <div className="absolute top-0 left-0 line-number-background bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-right pr-2 pt-2">
                {generatedPasswords.map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="ml-10 whitespace-nowrap">
                {generatedPasswords.map((password, index) => (
                  <div key={index} className="leading-6 select-text">
                    {password}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
    );
  };

  // Lorem Ipsum Generator
  lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 12,
      min: 7
    },
    wordsPerSentence: {
      max: 16,
      min: 8
    }
  });

  handleLoremTypeChange = (event) => {
    this.setState({ loremType: event.target.value });
  };

  handleLoremLengthChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && !value.includes("e")) {
      this.setState({ loremLength: value });
    }
  };

  generateLoremIpsum = () => {
    const { loremType, loremLength } = this.state;
    const length = parseInt(loremLength);

    if (length < 1 || isNaN(length)) {
      this.setState({
        generatedLorem: "",
        errorMessage: "Length must be at least 1."
      });
      return;
    }

    let generatedLorem = "";
    if (loremType === "words") {
      generatedLorem = this.lorem.generateWords(length);
    } else if (loremType === "sentences") {
      generatedLorem = this.lorem.generateSentences(length);
    } else if (loremType === "paragraphs") {
      generatedLorem = this.lorem.generateParagraphs(length);
    }

    this.setState({ generatedLorem, errorMessage: "" });
  };

  copyLoremToClipboard = () => {
    const { generatedLorem } = this.state;
    navigator.clipboard.writeText(generatedLorem);
  };

  clearLorem = () => {
    this.setState({ generatedLorem: "" });
  };

  renderLoremIpsumGenerator = () => {
    const { loremType, loremLength, generatedLorem, errorMessage } = this.state;

    const saveLoremAsText = () => {
      const element = document.createElement("a");
      const file = new Blob([generatedLorem], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "lorem_ipsum.txt";
      document.body.appendChild(element);
      element.click();
    };

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <style>{`
                  .button-group {
                      display: flex;
                      margin-top: 0em; /* Move the buttons closer to the output box */
                      position: relative;
                      top: 1.5em;
                      right: 0;
                  }
                   .dropdown-container {
                      position: relative;
                      display: inline-block;
                  }
                  .dropdown-select {
                      appearance: none;
                      width: 100%;
                      height: 100%;
                      background-color: #d1d5db; /* Light mode */
                      color: black; /* Light mode */
                      text-align: center;
                      padding: 0.45em; /* Adjust padding to accommodate longer text and icon */
                      padding-right: 2em;
                      padding-left: 1em;
                      margin-right: 1em;
                      border: none;
                      border-radius: 0.4em;
                      font-size: 1rem;
                      position: relative;
                  }
                  .dropdown-select.dark {
                      background-color: #4B5563; /* Dark mode */
                      color: white; /* Dark mode */
                  }
                  .dropdown-select option {
                      text-align: left; /* Align dropdown options to the left */
                      padding: 0.5rem;
                  }
                  .dropdown-select::after {
                      content: '';
                      position: absolute;
                      top: 50%;
                      width: 0;
                      height: 0;
                      border-left: 5px solid transparent;
                      border-right: 5px solid transparent;
                      border-top: 5px solid black; /* Light mode */
                      transform: translateY(-50%);
                      pointer-events: none; /* Ensures it doesn't block other interactions */
                  }
                  .dropdown-select.dark::after {
                      border-top-color: white; /* Dark mode */
                  }
                  .length-input {
                      text-align: center; /* Center the number in the input field */
                      -webkit-appearance: none;
                      -moz-appearance: textfield;
                  }
  
                  .length-input::-webkit-outer-spin-button,
                  .length-input::-webkit-inner-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                  }
  
                  .length-input {
                      -moz-appearance: textfield;
                  }
                  .custom-dropdown-icon {
                      position: absolute;
                      right: 10px; /* Adjust this as needed */
                      top: 50%;
                      transform: translateY(-50%);
                      pointer-events: none; /* Ensures the icon doesn't block other interactions */
                  }
                      
              `}</style>
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Lorem Ipsum Generator
          </h1>
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
              <span className="text-gray-900 dark:text-white flex-1">Type</span>
              <div className="dropdown-container">
                <select
                  value={loremType}
                  onChange={this.handleLoremTypeChange}
                  className="dropdown-select dark:bg-gray-700 dark:text-white"
                >
                  <option value="words">Words</option>
                  <option value="sentences">Sentences</option>
                  <option value="paragraphs">Paragraphs</option>
                </select>
                <svg
                  className="custom-dropdown-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
              <span className="text-gray-900 dark:text-white flex-1">Length</span>
              <input
                type="number"
                value={loremLength}
                onChange={this.handleLoremLengthChange}
                className="h-10 w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 rounded-lg length-input"
                min="1"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-base">{errorMessage}</p>}
          </section>

          <section className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={this.generateLoremIpsum}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-lg"
              >
                Generate
              </button>
            </div>
            <div className="button-group">
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-4"
                onClick={saveLoremAsText}
              >
                <SaveIcon />
              </button>
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-2"
                onClick={this.copyLoremToClipboard}
              >
                <CopyIcon />
              </button>
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                onClick={this.clearLorem}
              >
                <ClearIcon />
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="relative h-72 border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white overflow-auto custom-scrollbar">
              <div className="ml-2 pt-2 whitespace-pre-line select-text">
                {generatedLorem}
              </div>
            </div>
          </section>
        </section>
      </main>
    );
  };

  // Code Formatter
  handleLanguageChange = (e) => {
    this.setState({
      selectedLanguage: e.target.value,
      codeInput: "",
      formattedCode: "",
      codeError: null
    });
  };

  handleCodeInputChange = async (e) => {
    const codeInput = e.target.value;
    this.setState({ codeInput });

    try {
      const parserMap = {
        babel: "babel",
        html: "html",
        css: "css",
        markdown: "markdown",
        typescript: "typescript",
        graphql: "graphql",
        yaml: "yaml",
        java: "java",
        kotlin: "kotlin",
        php: "php",
        sql: "sql",
        svelte: "svelte",
        ruby: "ruby"
      };

      const selectedParser = parserMap[this.state.selectedLanguage];

      const pluginsMap = {
        babel: [parserBabel, prettierPluginEstree],
        html: [parserHtml],
        css: [parserCss],
        markdown: [parserMarkdown],
        typescript: [parserTypeScript, prettierPluginEstree],
        graphql: [parserGraphql],
        yaml: [parserYaml],
        java: [parserJava],
        php: [parserPhp]
      };

      const formattedCode = await prettier.format(codeInput, {
        parser: selectedParser,
        plugins: pluginsMap[this.state.selectedLanguage],
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        embeddedLanguageFormatting: "auto"
      });

      this.setState({ formattedCode, codeError: null });
    } catch (error) {
      this.setState({
        formattedCode: `Error: ${error.message}`,
        codeError: error.message
      });
    }
  };

  clearCodeInput = () => {
    this.setState({ codeInput: "", formattedCode: "", codeError: null });
  };

  renderCodeFormatter = () => {
    const { codeInput, formattedCode, selectedLanguage } = this.state;

    const getFileExtension = () => {
      switch (selectedLanguage) {
        case "babel":
        case "javascript":
          return "js";
        case "typescript":
          return "ts";
        case "html":
          return "html";
        case "css":
          return "css";
        case "graphql":
          return "graphql";
        case "yaml":
          return "yaml";
        case "java":
          return "java";
        case "php":
          return "php";
        default:
          return "txt";
      }
    };

    const saveFormattedCode = () => {
      const fileExtension = getFileExtension();
      const element = document.createElement("a");
      const file = new Blob([formattedCode], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `formatted_code.${fileExtension}`;
      document.body.appendChild(element);
      element.click();
    };

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Code Formatter
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-700 px-4">
                  <label className="text-gray-900 dark:text-white">
                    Select Language:
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={this.handleLanguageChange}
                    className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md p-2 pl-3"
                  >
                    <option value="babel">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="graphql">GraphQL</option>
                    <option value="yaml">YAML</option>
                    <option value="java">Java</option>
                    <option value="php">PHP</option>
                  </select>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Input</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearCodeInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder="Enter code"
                value={codeInput}
                onChange={this.handleCodeInputChange}
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Output</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={saveFormattedCode}
                  >
                    <SaveIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(formattedCode)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <textarea
                className={`flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar ${
                  this.state.codeError ? "text-red-500" : ""
                }`}
                placeholder=""
                value={formattedCode}
                readOnly
              />
            </div>
          </section>
        </section>
      </main>
    );
  };

  // Morse code decode/encode
  handleMorseInputChange = (e) => {
    const morseInput = e.target.value;
    this.setState({ morseInput });

    if (this.state.isMorseEncoding) {
      try {
        const morseOutput = morse.encode(morseInput);
        this.setState({ morseOutput, morseError: null });
      } catch (error) {
        this.setState({ morseOutput: "", morseError: "Invalid input for encoding" });
      }
    } else {
      try {
        const morseOutput = morse.decode(morseInput);
        this.setState({ morseOutput, morseError: null });
      } catch (error) {
        this.setState({ morseOutput: "", morseError: "Invalid input for decoding" });
      }
    }
  };

  handleMorseOutputChange = (e) => {
    const morseOutput = e.target.value;
    this.setState({ morseOutput });

    if (this.state.isMorseEncoding) {
      try {
        const morseInput = morse.decode(morseOutput);
        this.setState({ morseInput, morseError: null });
      } catch (error) {
        this.setState({ morseInput: "", morseError: "Invalid input for decoding" });
      }
    } else {
      try {
        const morseInput = morse.encode(morseOutput);
        this.setState({ morseInput, morseError: null });
      } catch (error) {
        this.setState({ morseInput: "", morseError: "Invalid input for encoding" });
      }
    }
  };

  clearMorseInput = () => {
    this.setState({ morseInput: "", morseOutput: "", morseError: null });
  };

  toggleMorseConversionMode = () => {
    this.setState((prevState) => ({
      isMorseEncoding: !prevState.isMorseEncoding,
      morseInput: prevState.morseOutput,
      morseOutput: prevState.morseInput
    }));
  };

  renderMorseEncoderDecoder = () => {
    const { morseInput, morseOutput, morseError, isMorseEncoding } = this.state;

    const saveMorseOutputAsText = () => {
      const element = document.createElement("a");
      const file = new Blob([morseOutput], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "morse_output.txt";
      document.body.appendChild(element);
      element.click();
    };

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Morse Code Encoder/Decoder
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-14 items-center gap-6 rounded-lg border bg-gray-200 dark:bg-gray-700 px-4">
                  <span className="text-gray-900 dark:text-white">Mode</span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isMorseEncoding}
                        onClick={this.toggleMorseConversionMode}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${isMorseEncoding ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${isMorseEncoding ? "translate-x-7" : "translate-x-1"}`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        {isMorseEncoding ? "Encoder" : "Decoder"}
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Input</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearMorseInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder={
                  isMorseEncoding ? "Enter text to encode" : "Enter Morse Code to decode"
                }
                value={morseInput}
                onChange={this.handleMorseInputChange}
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Output</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={saveMorseOutputAsText}
                  >
                    <SaveIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(morseOutput)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                value={morseOutput}
                readOnly
              />
              {morseError && <span className="text-red-500">{morseError}</span>}
            </div>
          </section>
        </section>
      </main>
    );
  };

  // QR Code Encode/Decode
  handleQrInputChange = (e) => {
    const qrInput = e.target.value;
    this.setState({ qrInput });

    if (this.state.qrMode === "encode") {
      QRCode.toDataURL(qrInput, { width: 400, height: 400, margin: 2 })
        .then((url) => {
          this.setState({ qrOutput: url, qrError: null });
        })
        .catch((error) => {
          this.setState({ qrOutput: "", qrError: "Failed to generate QR Code" });
        });
    }
  };

  handleQrImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        this.setState({ uploadedImage: img.src });
        img.onload = () => {
          const canvas = this.state.qrCanvas;
          const context = canvas.getContext("2d");
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            this.setState({ qrOutput: code.data, qrError: null });
          } else {
            this.setState({ qrOutput: "", qrError: "Failed to decode QR Code" });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  saveQrAsJpg = () => {
    const { qrOutput } = this.state;
    if (qrOutput) {
      const link = document.createElement("a");
      link.href = qrOutput;
      link.download = "qrcode.jpg";
      link.click();
    }
  };

  clearQrInput = () => {
    this.setState({ qrInput: "", qrOutput: "", qrError: null, uploadedImage: null });
  };

  toggleQrMode = () => {
    this.setState((prevState) => ({
      qrMode: prevState.qrMode === "encode" ? "decode" : "encode",
      qrInput: "",
      qrOutput: "",
      qrError: null,
      uploadedImage: null
    }));
  };

  renderQrCodeEncoderDecoder = () => {
    const { qrOutput, qrInput, qrError, qrMode, uploadedImage } = this.state;

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            QR Code Encoder/Decoder
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-16 items-center gap-6 rounded-lg border bg-gray-200 dark:bg-gray-700 px-4">
                  <span className="text-gray-900 dark:text-white">Mode</span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={qrMode === "encode"}
                        onClick={this.toggleQrMode}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${
                          qrMode === "encode"
                            ? "bg-blue-600"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
                            qrMode === "encode" ? "translate-x-7" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        {qrMode === "encode" ? "Encoder" : "Decoder"}
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Input</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearQrInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder={qrMode === "encode" ? "Enter text" : ""}
                value={qrInput}
                onChange={this.handleQrInputChange}
                style={{ display: qrMode === "decode" ? "none" : "block" }}
              />

              {qrMode === "decode" && !uploadedImage && (
                <label className="flex items-center justify-center flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={this.handleQrImageUpload}
                    className="hidden"
                  />
                  Click to upload a QR code image
                </label>
              )}
              {qrMode === "decode" && uploadedImage && (
                <div className="flex items-center justify-center flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={uploadedImage}
                    alt="Uploaded QR"
                    className="min-w-1/2 min-h-1/2 max-w-[95%] max-h-[95%]"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Output</h2>
                <div className="flex items-center">
                  {qrMode === "encode" && qrOutput && (
                    <button
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                      onClick={this.saveQrAsJpg}
                    >
                      <SaveIcon />
                    </button>
                  )}
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(qrOutput)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              {qrMode === "encode" ? (
                qrOutput ? (
                  <div className="flex items-center justify-center flex-1">
                    <img
                      src={qrOutput}
                      alt="QR Code"
                      className="min-w-1/2 min-h-1/2 max-w-[95%] max-h-[95%] rounded-lg border-2 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                ) : (
                  <div className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:bg-gray-700 font-mono custom-scrollbar"></div>
                )
              ) : (
                <div
                  className={`flex-1 h-full border-2 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:bg-gray-700 font-mono custom-scrollbar ${
                    qrError
                      ? "border-red-500 bg-red-500/10"
                      : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {qrError ? qrError : qrOutput}
                </div>
              )}
            </div>
            {qrMode === "decode" && (
              <canvas
                ref={(canvas) => (this.state.qrCanvas = canvas)}
                className="hidden"
              />
            )}
          </section>
        </section>
      </main>
    );
  };

  // Base encoder/decoder
  handleBaseInputChange = (e) => {
    const baseInput = e.target.value;
    this.setState({ baseInput });

    this.processBaseConversion(baseInput, this.state.isEncoding);
  };

  processBaseConversion = (input, isEncoding) => {
    const { selectedBase } = this.state;
    let baseOutput = "";
    let baseError = null;

    try {
      if (isEncoding) {
        baseOutput = this.encode(input, selectedBase);
      } else {
        baseOutput = this.decode(input, selectedBase);
      }
    } catch (error) {
      baseError = "Invalid input for " + (isEncoding ? "encoding" : "decoding");
    }

    this.setState({ baseOutput, baseError });
  };

  encode = (input, base) => {
    switch (base) {
      case "base16":
        return Buffer.from(input, "utf8").toString("hex");
      case "base32":
        return base32.encode(input);
      case "base64":
        return base64.encode(input);
      case "base58":
        return baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz").encode(
          Buffer.from(input, "utf8")
        );
      case "base62":
        return baseX(
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        ).encode(Buffer.from(input, "utf8"));
      case "base85":
        return baseX(
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~"
        ).encode(Buffer.from(input, "utf8"));
      case "base91":
        return baseX(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[\\]^_`{|}~"'
        ).encode(Buffer.from(input, "utf8"));
      default:
        throw new Error("Unsupported encoding");
    }
  };

  decode = (input, base) => {
    switch (base) {
      case "base16":
        return Buffer.from(input, "hex").toString("utf8");
      case "base32":
        return base32.decode(input);
      case "base64":
        return base64.decode(input);
      case "base58":
        return Buffer.from(
          baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz").decode(
            input
          )
        ).toString("utf8");
      case "base62":
        return Buffer.from(
          baseX("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").decode(
            input
          )
        ).toString("utf8");
      case "base85":
        return Buffer.from(
          baseX(
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~"
          ).decode(input)
        ).toString("utf8");
      case "base91":
        return Buffer.from(
          baseX(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[\\]^_`{|}~"'
          ).decode(input)
        ).toString("utf8");
      default:
        throw new Error("Unsupported decoding");
    }
  };

  clearBaseInput = () => {
    this.setState({ baseInput: "", baseOutput: "", baseError: null });
  };

  toggleConversionMode = () => {
    this.setState(
      (prevState) => ({
        isEncoding: !prevState.isEncoding,
        baseInput: prevState.baseOutput,
        baseOutput: prevState.baseInput
      }),
      () => {
        this.processBaseConversion(this.state.baseInput, this.state.isEncoding);
      }
    );
  };

  handleBaseSelection = (e) => {
    this.setState(
      { selectedBase: e.target.value, baseInput: "", baseOutput: "", baseError: null },
      () => {
        this.processBaseConversion(this.state.baseInput, this.state.isEncoding);
      }
    );
  };

  renderBaseEncoderDecoder = () => {
    const { baseInput, baseOutput, baseError, isEncoding, selectedBase } = this.state;
    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Base Encoder/Decoder
          </h1>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="flex h-12 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 justify-between">
              <span className="text-gray-900 dark:text-white">Mode:</span>
              <div className="flex items-center">
                <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                  {isEncoding ? "Encoder" : "Decoder"}
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isEncoding}
                  onClick={this.toggleConversionMode}
                  className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${
                    isEncoding ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
                      isEncoding ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
            {/* Base Selection */}
            <div className="flex h-12 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 justify-between">
              <span className="text-gray-900 dark:text-white">Base:</span>
              <select
                value={selectedBase}
                onChange={this.handleBaseSelection}
                className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5 outline-none ml-auto pl-3 pr-3"
              >
                <option value="base16">Base16</option>
                <option value="base32">Base32</option>
                <option value="base58">Base58</option>
                <option value="base62">Base62</option>
                <option value="base64">Base64</option>
                <option value="base85">Base85</option>
                <option value="base91">Base91</option>
              </select>
            </div>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Input</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(baseInput)}
                  >
                    <CopyIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.pasteFromClipboard(this.handleBaseInputChange)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clipboard"
                    >
                      <path d="M16 4h-2a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearBaseInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder={isEncoding ? "Enter text to encode" : "Enter text to decode"}
                value={baseInput}
                onChange={this.handleBaseInputChange}
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Output</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(baseOutput)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder={baseError ? baseError : isEncoding ? "" : ""}
                value={baseError ? baseError : baseOutput}
                readOnly
              />
            </div>
          </section>
        </section>
      </main>
    );
  };

  // Color Converter
  handleColorInputChange = (e) => {
    const hex = `#${e.target.value}`;
    this.setState({ colorInput: hex });

    if (/^#([0-9A-Fa-f]{3}){1,2}$/i.test(hex)) {
      this.updateColorValues(hex);
    } else {
      this.setInvalidState("Invalid Hex value");
    }
  };

  handleRgbInputChange = (e) => {
    const value = e.target.value;
    this.setState({ rgb: value });

    const rgb = value.split(",").map((v) => parseInt(v.trim(), 10));
    if (rgb.length === 3 && rgb.every((v) => !isNaN(v) && v >= 0 && v <= 255)) {
      const hex = `#${colorConvert.rgb.hex(rgb)}`;
      this.updateColorValues(hex);
    } else {
      this.setInvalidState("Invalid RGB value");
    }
  };

  handleHslInputChange = (e) => {
    const value = e.target.value;
    this.setState({ hsl: value });

    const hsl = value.split(",").map((v) => parseInt(v.trim(), 10));
    if (
      hsl.length === 3 &&
      !isNaN(hsl[0]) &&
      hsl[0] >= 0 &&
      hsl[0] <= 360 &&
      hsl[1] >= 0 &&
      hsl[1] <= 100 &&
      hsl[2] >= 0 &&
      hsl[2] <= 100
    ) {
      const rgb = colorConvert.hsl.rgb(hsl);
      const hex = `#${colorConvert.rgb.hex(rgb)}`;
      this.updateColorValues(hex);
    } else {
      this.setInvalidState("Invalid HSL value");
    }
  };

  handleCmykInputChange = (e) => {
    const value = e.target.value;
    this.setState({ cmyk: value });

    const cmyk = value.split(",").map((v) => parseInt(v.trim(), 10));
    if (cmyk.length === 4 && cmyk.every((v) => !isNaN(v) && v >= 0 && v <= 100)) {
      const rgb = colorConvert.cmyk.rgb(cmyk);
      const hex = `#${colorConvert.rgb.hex(rgb)}`;
      this.updateColorValues(hex);
    } else {
      this.setInvalidState("Invalid CMYK value");
    }
  };

  handleColorPickerChange = (e) => {
    const hex = e.target.value;
    this.updateColorValues(hex);
  };

  setInvalidState = (error) => {
    this.setState({
      pantone: "undefined",
      tailwind: "undefined",
      cssFilter: "undefined",
      error
    });
  };

  updateColorValues = (hex) => {
    try {
      const rgb = colorConvert.hex.rgb(hex);
      const hsl = colorConvert.rgb.hsl(rgb);
      const cmyk = colorConvert.rgb.cmyk(rgb);

      let pantoneName = "undefined";
      try {
        const pantoneColor = nearestPantone.getClosestColor(hex);
        pantoneName = pantoneColor.name;
      } catch (error) {
        console.error("Pantone color lookup failed", error);
      }

      const nearestTailwindColor = this.getNearestTailwindColor(hex);

      const config = {
        acceptanceLossPercentage: 1,
        maxChecks: 10
      };
      const cssFilter = hexToCSSFilter(hex, config).filter;

      this.setState({
        colorInput: hex,
        rgb: `${rgb.join(", ")}`,
        hsl: `${hsl.join(", ")}`,
        cmyk: `${cmyk.join(", ")}`,
        pantone: pantoneName,
        tailwind: nearestTailwindColor,
        cssFilter,
        error: null
      });
    } catch (e) {
      this.setInvalidState("Invalid color value");
    }
  };

  getNearestTailwindColor = (hex) => {
    const rgb = colorConvert.hex.rgb(hex);
    let closestColor = "";
    let closestDistance = Infinity;

    Object.entries(tailwindColors).forEach(([key, value]) => {
      if (typeof value === "string") {
        const twRgb = colorConvert.hex.rgb(value);
        const distance = this.colorDistance(rgb, twRgb);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestColor = `${key}`;
        }
      } else {
        Object.entries(value).forEach(([shade, colorHex]) => {
          const twRgb = colorConvert.hex.rgb(colorHex);
          const distance = this.colorDistance(rgb, twRgb);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestColor = `${key}-${shade}`;
          }
        });
      }
    });

    return `${closestColor}`;
  };

  colorDistance = (rgb1, rgb2) => {
    return Math.sqrt(
      Math.pow(rgb2[0] - rgb1[0], 2) +
        Math.pow(rgb2[1] - rgb1[1], 2) +
        Math.pow(rgb2[2] - rgb1[2], 2)
    );
  };

  renderColorSection = (label, value, onChange, isValid = true) => {
    return (
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="self-end text-lg text-gray-900 dark:text-gray-300">{label}</h2>
        </div>
        <div className="flex flex-col">
          <input
            className={`h-10 flex-grow bg-zinc-200 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:bg-gray-200 dark:focus:bg-gray-700 font-mono rounded-md border-b-2 ${
              isValid ? "border-gray-300 dark:border-gray-600" : "border-red-600"
            }`}
            spellCheck="false"
            value={value}
            onChange={onChange}
          />
          {!isValid && (
            <span className="text-red-500 text-base mt-1">Invalid {label} value</span>
          )}
        </div>
      </section>
    );
  };

  renderColorConverter = () => {
    const { colorInput, rgb, hsl, cmyk, pantone, tailwind, cssFilter, error } =
      this.state;

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Color Converter
          </h1>
          <div className="flex items-center gap-3">
            <label className="text-gray-900 dark:text-white font-medium text-xl">
              Pick Color:
            </label>
            <input
              type="color"
              onChange={this.handleColorPickerChange}
              value={colorInput}
              className="w-8 h-9 border-none bg-transparent cursor-pointer"
            />
          </div>
          <div
            className="w-full h-32 rounded-lg shadow-lg"
            style={{ backgroundColor: error ? "white" : colorInput }}
          ></div>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {this.renderColorSection(
              "Hex Code",
              colorInput.slice(1), // Slice off the leading "#"
              this.handleColorInputChange,
              !error || error !== "Invalid Hex value"
            )}
            {this.renderColorSection(
              "RGB",
              rgb,
              this.handleRgbInputChange,
              !error || error !== "Invalid RGB value"
            )}
            {this.renderColorSection(
              "HSL",
              hsl,
              this.handleHslInputChange,
              !error || error !== "Invalid HSL value"
            )}
            {this.renderColorSection(
              "CMYK",
              cmyk,
              this.handleCmykInputChange,
              !error || error !== "Invalid CMYK value"
            )}
            {this.renderColorSection("Nearest Pantone", pantone, () => {}, true)}
            {this.renderColorSection("Nearest Tailwind CSS", tailwind, () => {}, true)}
          </section>
          <section className="mt-4">
            {this.renderColorSection("CSS Filter", cssFilter, () => {}, true)}
          </section>
        </section>
      </main>
    );
  };

  //AES256 Encryption
  async encrypt(text, password) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );
      const encryptedData = new Uint8Array(encrypted);
      const result = new Uint8Array(salt.length + iv.length + encryptedData.length);
      result.set(salt);
      result.set(iv, salt.length);
      result.set(encryptedData, salt.length + iv.length);
      return btoa(String.fromCharCode(...result));
    } catch (error) {
      throw new Error("Encryption failed.");
    }
  }

  async decrypt(encryptedText, password) {
    try {
      const decodedData = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
      const salt = decodedData.slice(0, 16);
      const iv = decodedData.slice(16, 28);
      const data = decodedData.slice(28);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      throw new Error("Decryption failed.");
    }
  }

  handleEncryptionInputChange = async (e) => {
    const encryptionInput = e.target.value;
    this.setState({ encryptionInput });

    if (this.state.encryptionPassword.trim() === "") {
      this.setState({ encryptionOutput: "", encryptionError: "Password is required" });
      return;
    }

    try {
      let encryptionOutput = "";
      const { encryptionPassword, isEncrypting } = this.state;

      if (isEncrypting && encryptionInput) {
        encryptionOutput = await this.encrypt(encryptionInput, encryptionPassword);
      } else if (!isEncrypting) {
        encryptionOutput = await this.decrypt(encryptionInput, encryptionPassword);
      }

      this.setState({ encryptionOutput, encryptionError: null });
    } catch (error) {
      this.setState({
        encryptionOutput: "",
        encryptionError: "Invalid input or password"
      });
    }
  };

  clearEncryptionInput = () => {
    this.setState({ encryptionInput: "", encryptionOutput: "", encryptionError: null });
  };

  handlePasswordChange = (e) => {
    this.setState({ encryptionPassword: e.target.value }, () => {
      this.handleEncryptionInputChange({ target: { value: this.state.encryptionInput } });
    });
  };

  toggleEncryptionMode = () => {
    this.setState((prevState) => {
      const shouldReset = prevState.encryptionError !== null && !prevState.isEncrypting;
      return {
        isEncrypting: !prevState.isEncrypting,
        encryptionInput: shouldReset ? "" : prevState.encryptionOutput,
        encryptionOutput: shouldReset ? "" : prevState.encryptionInput,
        encryptionPassword: shouldReset ? "" : prevState.encryptionPassword,
        encryptionError: shouldReset ? null : prevState.encryptionError
      };
    });
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  genPassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?{}[]";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    this.setState({ encryptionPassword: password }, () => {
      this.handleEncryptionInputChange({ target: { value: this.state.encryptionInput } });
    });
  };

  renderAesEncrypterDecrypter = () => {
    const {
      encryptionInput,
      encryptionOutput,
      encryptionError,
      isEncrypting,
      encryptionPassword,
      showPassword
    } = this.state;

    return (
      <main className="overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 h-full bg-white dark:bg-gray-900">
        <CustomScrollbar />
        <section className="flex flex-col gap-6 h-full">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            AES256-GCM Encrypter/Decrypter
          </h1>
          <section className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex h-12 items-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-700 px-4">
                  <span className="text-gray-900 dark:text-white">Mode</span>
                  <div className="flex flex-1 justify-end">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEncrypting}
                        onClick={this.toggleEncryptionMode}
                        className={`group inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${
                          isEncrypting ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
                            isEncrypting ? "translate-x-7" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                      <label className="leading-none cursor-pointer pr-3 text-gray-900 dark:text-white">
                        {isEncrypting ? "Encrypt" : "Decrypt"}
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-end">
                    <label
                      htmlFor="password"
                      className="text-gray-900 dark:text-white sm:mb-0 mb-2"
                    >
                      Password:
                    </label>
                    <div className="flex items-center flex-grow bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none border-2 border-gray-300 dark:border-gray-600 focus-within:border-blue-400">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="flex-grow bg-transparent outline-none text-right sm:text-left"
                        value={encryptionPassword}
                        onChange={this.handlePasswordChange}
                        placeholder="Enter encryption/decryption password"
                      />
                      <button
                        onClick={this.toggleShowPassword}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
                              fill="currentColor"
                            />
                            <path
                              d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="currentColor"
                              d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={this.genPassword}
                        className="ml-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <svg
                          fill="currentColor"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>lightbulb-on</title>
                          <path d="M20 24.75h-8c-0.69 0-1.25 0.56-1.25 1.25v2c0 0 0 0 0 0 0 0.345 0.14 0.658 0.366 0.885l2 2c0.226 0.226 0.538 0.365 0.883 0.365 0 0 0.001 0 0.001 0h4c0 0 0.001 0 0.002 0 0.345 0 0.657-0.14 0.883-0.365l2-2c0.226-0.226 0.365-0.538 0.365-0.883 0-0.001 0-0.001 0-0.002v0-2c-0.001-0.69-0.56-1.249-1.25-1.25h-0zM18.75 27.482l-1.268 1.268h-2.965l-1.268-1.268v-0.232h5.5zM27.125 12.558c0.003-0.098 0.005-0.214 0.005-0.329 0-2.184-0.654-4.216-1.778-5.91l0.025 0.040c-1.919-3.252-5.328-5.447-9.263-5.644l-0.027-0.001h-0.071c-3.934 0.165-7.338 2.292-9.274 5.423l-0.028 0.049c-1.17 1.687-1.869 3.777-1.869 6.031 0 0.012 0 0.025 0 0.037v-0.002c0.184 2.294 0.923 4.383 2.081 6.176l-0.032-0.052c0.322 0.555 0.664 1.102 1.006 1.646 0.671 0.991 1.314 2.13 1.862 3.322l0.062 0.151c0.194 0.455 0.637 0.768 1.153 0.768 0 0 0.001 0 0.001 0h-0c0.173-0 0.338-0.035 0.489-0.099l-0.008 0.003c0.455-0.194 0.768-0.638 0.768-1.155 0-0.174-0.036-0.34-0.1-0.49l0.003 0.008c-0.669-1.481-1.374-2.739-2.173-3.929l0.060 0.095c-0.327-0.523-0.654-1.044-0.962-1.575-0.939-1.397-1.557-3.083-1.71-4.901l-0.003-0.038c0.019-1.735 0.565-3.338 1.485-4.662l-0.018 0.027c1.512-2.491 4.147-4.17 7.185-4.332l0.022-0.001h0.052c3.071 0.212 5.697 1.934 7.162 4.423l0.023 0.042c0.864 1.293 1.378 2.883 1.378 4.593 0 0.053-0 0.107-0.002 0.16l0-0.008c-0.22 1.839-0.854 3.496-1.807 4.922l0.026-0.041c-0.287 0.487-0.588 0.968-0.889 1.446-0.716 1.066-1.414 2.298-2.020 3.581l-0.074 0.175c-0.067 0.148-0.106 0.321-0.106 0.503 0 0.69 0.56 1.25 1.25 1.25 0.512 0 0.952-0.308 1.146-0.749l0.003-0.008c0.625-1.33 1.264-2.452 1.978-3.52l-0.060 0.096c0.313-0.498 0.625-0.998 0.924-1.502 1.131-1.708 1.891-3.756 2.12-5.961l0.005-0.058zM15.139 5.687c-0.199-0.438-0.633-0.737-1.136-0.737-0.188 0-0.365 0.041-0.525 0.116l0.008-0.003c-2.463 1.415-4.215 3.829-4.711 6.675l-0.008 0.057c-0.011 0.061-0.017 0.132-0.017 0.204 0 0.617 0.447 1.129 1.035 1.231l0.007 0.001c0.063 0.011 0.135 0.018 0.209 0.018h0c0.615-0.001 1.126-0.446 1.23-1.031l0.001-0.008c0.366-2.067 1.575-3.797 3.252-4.852l0.030-0.017c0.437-0.2 0.735-0.634 0.735-1.138 0-0.187-0.041-0.364-0.115-0.523l0.003 0.008zM1.441 3.118l4 2c0.16 0.079 0.348 0.126 0.546 0.126 0.69 0 1.25-0.56 1.25-1.25 0-0.482-0.273-0.9-0.672-1.109l-0.007-0.003-4-2c-0.16-0.079-0.348-0.126-0.546-0.126-0.69 0-1.25 0.56-1.25 1.25 0 0.482 0.273 0.9 0.672 1.109l0.007 0.003zM26 5.25c0.001 0 0.001 0 0.002 0 0.203 0 0.395-0.049 0.564-0.135l-0.007 0.003 4-2c0.407-0.212 0.679-0.63 0.679-1.112 0-0.69-0.56-1.25-1.25-1.25-0.199 0-0.387 0.046-0.554 0.129l0.007-0.003-4 2c-0.413 0.21-0.69 0.631-0.69 1.118 0 0.69 0.559 1.25 1.249 1.25h0zM30.559 20.883l-4-2c-0.163-0.083-0.355-0.132-0.559-0.132-0.69 0-1.249 0.559-1.249 1.249 0 0.486 0.278 0.908 0.683 1.114l0.007 0.003 4 2c0.163 0.083 0.355 0.132 0.559 0.132 0.69 0 1.249-0.559 1.249-1.249 0-0.486-0.278-0.908-0.683-1.114l-0.007-0.003zM5.561 18.867l-3.913 1.83c-0.428 0.205-0.718 0.634-0.718 1.131 0 0.691 0.56 1.25 1.25 1.25 0.191 0 0.372-0.043 0.534-0.119l-0.008 0.003 3.913-1.83c0.428-0.205 0.718-0.634 0.718-1.131 0-0.691-0.56-1.25-1.25-1.25-0.191 0-0.372 0.043-0.534 0.119l0.008-0.003zM2 13.25h1c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-1c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0zM30 10.75h-1c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h1c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Input</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(encryptionInput)}
                  >
                    <CopyIcon />
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() =>
                      this.pasteFromClipboard(this.handleEncryptionInputChange)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clipboard"
                    >
                      <path d="M16 4h-2a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={this.clearEncryptionInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 h-full border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar"
                placeholder={
                  isEncrypting ? "Enter text to encrypt" : "Enter text to decrypt"
                }
                value={encryptionInput}
                onChange={this.handleEncryptionInputChange}
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-gray-900 dark:text-gray-300">Output</h2>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => this.copyToClipboard(encryptionOutput)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <textarea
                className={`flex-1 h-full border-2 rounded-lg ${
                  encryptionError
                    ? "border-red-600"
                    : "border-gray-300 dark:border-gray-600"
                } bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 font-mono custom-scrollbar`}
                placeholder={
                  encryptionError ||
                  (isEncrypting && !encryptionInput && encryptionPassword
                    ? ""
                    : isEncrypting
                      ? "Encrypted output"
                      : "Decrypted output")
                }
                value={encryptionError || encryptionOutput}
                readOnly
              />
            </div>
          </section>
        </section>
      </main>
    );
  };

  renderToolContent = () => {
    switch (this.state.selectedTool) {
      case "jsonToYaml":
        return this.renderJsonToYamlConverter();
      case "baseConverter":
        return this.renderBaseConverter();
      case "hashGenerator":
        return this.renderHashGenerator();
      case "passwordGenerator":
        return this.renderPasswordGenerator();
      case "loremipsumGenerator":
        return this.renderLoremIpsumGenerator();
      case "codeFormatter":
        return this.renderCodeFormatter();
      case "morseEncoderDecoder":
        return this.renderMorseEncoderDecoder();
      case "qrCodeEncoderDecoder":
        return this.renderQrCodeEncoderDecoder();
      case "baseEncoderDecoder":
        return this.renderBaseEncoderDecoder();
      case "colorConverter":
        return this.renderColorConverter();
      case "aesEncrypterDecrypter":
        return this.renderAesEncrypterDecrypter();
      default:
        return this.renderHomeScreen();
    }
  };

  renderHomeScreen = () => {
    return (
      <div className="p-4 grid gap-3 xl:gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-4 bg-gray-100 dark:bg-gray-900">
        <ToolItem
          onClick={() => this.handleCardClick("jsonToYaml")}
          class="fill-white"
          imgSrc="./images/devtoys/JsonYaml.svg"
          altText="Json to Yaml Icon"
          toolName="Json <> Yaml Converter"
          description="Convert Json data to Yaml and vice versa"
        />
        <ToolItem
          onClick={() => this.handleCardClick("baseConverter")}
          imgSrc="./images/devtoys/hash2.svg"
          altText="Number Base Converter Icon"
          toolName="Number Base Converter"
          description="Convert numbers from one base to another"
        />
        <ToolItem
          onClick={() => this.handleCardClick("hashGenerator")}
          imgSrc="./images/devtoys/fingerprint.svg"
          altText="Hash Generator Icon"
          toolName="Hash Generator"
          description="Calculate hash from text input"
        />
        <ToolItem
          onClick={() => this.handleCardClick("passwordGenerator")}
          imgSrc="./images/devtoys/key2.svg"
          altText="Password Generator Icon"
          toolName="Password Generator"
          description="Generate random passwords"
        />
        <ToolItem
          onClick={() => this.handleCardClick("loremipsumGenerator")}
          imgSrc="./images/devtoys/text.svg"
          altText="Password Generator Icon"
          toolName="Lorem Ipsum Generator"
          description="Generate placeholder text"
        />
        <ToolItem
          onClick={() => this.handleCardClick("codeFormatter")}
          imgSrc="./images/devtoys/code.svg"
          altText="Password Generator Icon"
          toolName="Code Formatter"
          description="Make your code prettier"
        />
        <ToolItem
          onClick={() => this.handleCardClick("morseEncoderDecoder")}
          imgSrc="./images/devtoys/wave.svg"
          altText="Morse Encoder/Decoder Icon"
          toolName="Morse Code Encoder/Decoder"
          description="Encode or decode Morse Code"
        />
        <ToolItem
          onClick={() => this.handleCardClick("qrCodeEncoderDecoder")}
          imgSrc="./images/devtoys/qr_code.svg"
          altText="QR Code Encoder/Decoder Icon"
          toolName="QR Code Encoder/Decoder"
          description="Encode or decode QR Code"
        />
        <ToolItem
          onClick={() => this.handleCardClick("baseEncoderDecoder")}
          imgSrc="./images/devtoys/encode.svg"
          altText="Base64 Encoder/Decoder Icon"
          toolName="Base Encoder/Decoder"
          description="Encode or decode text using various base encodings"
        />
        <ToolItem
          onClick={() => this.handleCardClick("colorConverter")}
          imgSrc="./images/devtoys/color.svg"
          altText="Color Converter Icon"
          toolName="Color Converter"
          description="Convert between different color conventions"
        />
        <ToolItem
          onClick={() => this.handleCardClick("aesEncrypterDecrypter")}
          imgSrc="./images/devtoys/lock.svg"
          altText="AES256 Encrypter Decrypter Icon"
          toolName="AES256 Encrypter/Decrypter"
          description="Encrypt or decrypt your text using AES256-GCM"
        />
        <style jsx>{`
          .icon-white img {
            filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(93deg)
              brightness(103%) contrast(103%);
          }
        `}</style>
      </div>
    );
  };

  render() {
    return (
      <div
        className="w-full h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white select-none overflow-y-auto custom-appscrollbar"
        ref={this.scrollableRef}
      >
        {this.state.showTopBar && (
          <div className="flex items-center justify-between w-full bg-slate-400 dark:bg-gray-800 bg-opacity-60 text-sm p-2">
            <button
              onClick={this.handleBackToHome}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 "
            >
              <img
                src="./images/devtoys/home.svg"
                alt="Home"
                width="20"
                height="20"
                className="filter invert dark:invert-0"
              />
            </button>
            <div className="flex">
              <button
                onClick={() => this.handleCardClick("baseConverter")}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img
                  src="./images/devtoys/hash.svg"
                  alt="Hash"
                  width="20"
                  height="20"
                  className="filter invert dark:invert-0"
                />
              </button>
              <button
                onClick={() => this.handleCardClick("jsonToYaml")}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img
                  src="./images/devtoys/converter.svg"
                  alt="Convert"
                  width="20"
                  height="20"
                  className="filter invert dark:invert-0"
                />
              </button>
              <button
                onClick={() => this.handleCardClick("hashGenerator")}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <img
                  src="./images/devtoys/hash.svg"
                  alt="Lock"
                  width="20"
                  height="20"
                  className="filter invert dark:invert-0"
                />
              </button>
            </div>
          </div>
        )}
        <div className="flex-grow flex flex-col p-4">
          {this.state.selectedTool ? this.renderToolContent() : this.renderHomeScreen()}
        </div>
        <style jsx>{`
          .custom-appscrollbar::-webkit-scrollbar {
            width: 0.5 / em;
          }
          .custom-appscrollbar::-webkit-scrollbar-track {
            background: #e5e7eb; /* Light mode track */
          }
          .dark .custom-appscrollbar::-webkit-scrollbar-track {
            background: #121928; /* Dark mode track */
          }
          .custom-appscrollbar::-webkit-scrollbar-thumb {
            background-color: #9ca3af; /* Light mode thumb */
            border-radius: 10px;
          }
          .dark .custom-appscrollbar::-webkit-scrollbar-thumb {
            background-color: #1f2937; /* Dark mode thumb */
          }
          .custom-appscrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280; /* Light mode hover */
          }
          .dark .custom-appscrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #374151; /* Dark mode hover */
          }
        `}</style>
      </div>
    );
  }
}

export default DevToys;

export const displayDevToys = () => {
  return <DevToys> </DevToys>;
};
