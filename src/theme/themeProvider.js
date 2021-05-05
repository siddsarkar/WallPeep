import React, {createContext, useEffect, useState} from 'react';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import AsyncStore from '../utils/asyncStore';

const ThemeContext = createContext({
  scheme: 'light',
  toggleScheme: () => {},
});

const ThemeProvider = ({children}) => {
  const [scheme, setScheme] = useState('light');

  useEffect(() => {
    async function retrieveTheme() {
      const asScheme = await AsyncStore.getItem('theme');
      if (asScheme) {
        toggleScheme(asScheme);
      }
    }
    retrieveTheme();
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      toggleScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleScheme = (_scheme) => {
    setScheme(_scheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        scheme,
        toggleScheme,
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
