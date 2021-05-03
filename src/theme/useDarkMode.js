import {useContext} from 'react';
import {ThemeContext} from './themeProvider';

const useDarkMode = () => useContext(ThemeContext);

export default useDarkMode;
