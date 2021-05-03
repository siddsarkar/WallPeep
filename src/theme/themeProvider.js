import React, {createContext, useEffect, useState} from 'react';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import AsyncStore from '../utils/asyncStore';

const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

const ThemeProvider = ({children}) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    async function retrieveTheme() {
      const isDark = await AsyncStore.getItem('theme');
      if (isDark === 'dark') {
        toggleDark(true);
      }
    }
    retrieveTheme();
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      toggleDark(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleDark = (mode) => {
    setDark(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeManager = ({children}) => (
  <AppearanceProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </AppearanceProvider>
);

export {ThemeContext};
export default ThemeManager;
