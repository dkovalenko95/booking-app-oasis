import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'darkModeOasis'
  );

  // Set dark/light css class for root(documentElement)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((isDark) => !isDark);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }} >
      { children }
    </DarkModeContext.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
};

export { DarkModeProvider, useDarkMode };
