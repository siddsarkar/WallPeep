// const AuthStack = createStackNavigator();
import React from 'react';
import Navigation from './navigation/Navigation';
import {ThemeManager} from './theme/ThemeContext';

export default function App() {
  return (
    <ThemeManager>
      <Navigation />
    </ThemeManager>
  );
}
