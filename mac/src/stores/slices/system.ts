import type { StateCreator } from "zustand";
import { enterFullScreen, exitFullScreen } from "~/utils";

export interface SystemSlice {
  dark: boolean;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  fullscreen: boolean;
  toggleDark: () => void;
  toggleWIFI: () => void;
  toggleBluetooth: () => void;
  toggleAirdrop: () => void;
  toggleFullScreen: (v: boolean) => void;
  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
}

export const createSystemSlice: StateCreator<SystemSlice> = (set) => {
  // Check for user's system dark mode preference
  const userPrefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Get user's saved preference from localStorage
  const savedPreference = localStorage.getItem("darkMode");
  const initialDarkMode =
    savedPreference !== null ? JSON.parse(savedPreference) : userPrefersDark;

  // Apply initial dark mode setting
  if (initialDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    dark: initialDarkMode,
    volume: 100,
    brightness: 80,
    wifi: true,
    bluetooth: true,
    airdrop: true,
    fullscreen: false,
    toggleDark: () =>
      set((state) => {
        const newDarkMode = !state.dark;
        if (newDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
        return { dark: newDarkMode };
      }),
    toggleWIFI: () => set((state) => ({ wifi: !state.wifi })),
    toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
    toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
    toggleFullScreen: (v) =>
      set(() => {
        v ? enterFullScreen() : exitFullScreen();
        return { fullscreen: v };
      }),
    setVolume: (v) => set(() => ({ volume: v })),
    setBrightness: (v) => set(() => ({ brightness: v }))
  };
};
