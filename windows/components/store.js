// src/store/useThemeStore.js
import { create } from 'zustand';

const useThemeStore = create((set) => ({
  isDarkMode: false, // Default to light mode
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useThemeStore;
