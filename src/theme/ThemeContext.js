import React, {createContext, useEffect, useState} from 'react';
import {Appearance, AppearanceProvider} from 'react-native-appearance';

const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({children}) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      toggleDark(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleDark = mode => {
    setDark(mode);
  };

  //   useEffect(() => {
  //     getDark();
  //   }, []);

  //   const getDark = async () => {
  //     let lsDark = await AsyncStore.getItem('dark', null);
  //     if (lsDark === null) {
  //       console.log('NO DATA');
  //       setDark(false);
  //       AsyncStore.setItem('dark', false);
  //     } else {
  //       setDark(lsDark);
  //       console.log('DATA FOUND', lsDark);
  //     }
  //   };

  //   const toggleDark = () => {
  //     AsyncStore.setItem('dark', !dark);
  //     console.log('[Update Theme] Setting theme from ls.. lsDark:%s', !dark);
  //   };

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

export default ThemeContext;
export const useDarkMode = () => React.useContext(ThemeContext);

export const ThemeManager = ({children}) => (
  <AppearanceProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </AppearanceProvider>
);
