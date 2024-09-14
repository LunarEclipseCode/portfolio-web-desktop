import {displayMusic} from './components/apps/music';
import displayVsCode from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayAboutRaj } from './components/apps/me';
// import { displayTalks } from './components/apps/me';
import { displayTerminalCalc } from './components/apps/calc';
import { displayNumWorks } from './components/apps/numworks';
import { displayEditor } from './components/apps/editor';
import displayPaint from './components/apps/paint'
import { displayTrading } from './components/apps/trading';
import { displayVMBox } from './components/apps/vmbox';
import { displayImageEditor } from './components/apps/image-editor';
import { displayChess } from './components/apps/chess';
import {displayAlgo} from './components/apps/algo';
import { displayDevToys } from './components/apps/devtoys';
import { displayGPT } from './components/apps/gpt';

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    // {
    //     id: "calc",
    //     title: "Calculator",
    //     icon: './themes/Yaru/apps/calc.png',
    //     disabled: false,
    //     favourite: true,
    //     desktop_shortcut: false,
    //     screen: displayTerminalCalc,
    // },
    {
        id: "about-raj",
        title: "About Raj",
        icon: './themes/Yaru/apps/profile.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutRaj,
    },
    {
        id: "code",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "music",
        title: "Music Player",
        icon: './themes/Yaru/apps/music-player.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayMusic,
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/settings.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "trash",
        title: "Recycle Bin",
        icon: './themes/Yaru/apps/recycle-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrash,
    },
    {
        id: "sendmsg",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGedit,
    },
    {
        id: "numworks",
        title: "NumWorks",
        icon: './themes/Yaru/apps/numworks.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayNumWorks,
    },
    {
        id: "quill",
        title: "Quill",
        icon: './themes/Yaru/apps/quill.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayEditor,
    },
    {
        id: "paint",
        title: "Paint",
        icon: './themes/Yaru/apps/palette.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayPaint,
    },
    {
        id: "trading",
        title: "Trading View",
        icon: './themes/Yaru/apps/tradingview.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrading,
    },
    {
        id: "image-editor",
        title: "Photo Editor",
        icon: './themes/Yaru/apps/photo.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayImageEditor,
    },
    {
        id: "vmbox",
        title: "VMBox",
        icon: './themes/Yaru/apps/package.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayVMBox,
    },
    {
        id: "games",
        title: "Chess",
        icon: './themes/Yaru/apps/chess.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayChess,
    },
    {
        id: "algo-visual",
        title: "Algorithm Visualizer",
        icon: './themes/Yaru/apps/algorithm.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayAlgo,
    },
    {
        id: "devtoys",
        title: "DevToys",
        icon: './themes/Yaru/apps/code.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayDevToys,
    },
    {
        id: "chatgpt",
        title: "ChatGPT",
        icon: './themes/Yaru/apps/chatgpt.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGPT,
    },
    // {
    //     id: "Talks",
    //     title: "Talks",
    //     icon: './themes/Yaru/system/user-home.png',
    //     disabled: false,
    //     favourite: true,
    //     desktop_shortcut: true,
    //     screen: displayTalks,
    // },
]

export default apps;