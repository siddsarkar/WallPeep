import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#0c0c0c',
    card: '#191919',
    cardHeader: '#242526',
    inputBackground: '#4a4a4f',

    textPlaceholder: '#737373',
    textSecondary: '#737378',
  },
};

export const lightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    cardHeader: '#fff',
    inputBackground: '#ececec',
    textPlaceholder: '#737373',
  },
};

// define more themes

const nord = {
  /*
  Base component color of "Polar Night".
  Used for texts, backgrounds, carets and structuring characters like curly- and square brackets.
  Styleguide Nord - Polar Night
  */
  nord0: '#2e3440',

  /*
  Lighter shade color of the base component color.
  Used as a lighter background color for UI elements like status bars.
  Styleguide Nord - Polar Night
  */
  nord1: '#3b4252',

  /*
  Lighter shade color of the base component color.
  Used as line highlighting in the editor.
  In the UI scope it may be used as selection- and highlight color.
  Styleguide Nord - Polar Night
  */
  nord2: '#434c5e',

  /*
  Lighter shade color of the base component color.
  Used for comments, invisibles, indent- and wrap guide marker.
  In the UI scope used as pseudoclass color for disabled elements.
  Styleguide Nord - Polar Night
  */
  nord3: '#4c566a',

  /*
  Base component color of "Snow Storm".
  Main color for text, variables, constants and attributes.
  In the UI scope used as semi-light background depending on the theme shading design.
  Styleguide Nord - Snow Storm
  */
  nord4: '#d8dee9',

  /*
  Lighter shade color of the base component color.
  Used as a lighter background color for UI elements like status bars.
  Used as semi-light background depending on the theme shading design.
  Styleguide Nord - Snow Storm
  */
  nord5: '#e5e9f0',

  /*
  Lighter shade color of the base component color.
  Used for punctuations, carets and structuring characters like curly- and square brackets.
  In the UI scope used as background, selection- and highlight color depending on the theme shading design.
  Styleguide Nord - Snow Storm
  */
  nord6: '#eceff4',

  /*
  Bluish core color.
  Used for classes, types and documentation tags.
  Styleguide Nord - Frost
  */
  nord7: '#8fbcbb',

  /*
  Bluish core accent color.
  Represents the accent color of the color palette.
  Main color for primary UI elements and methods/functions.
  Can be used for
    - Markup quotes
    - Markup link URLs
  Styleguide Nord - Frost
  */
  nord8: '#88c0d0',

  /*
  Bluish core color.
  Used for language-specific syntactic/reserved support characters and keywords, operators, tags, units and
  punctuations like (semi)colons,commas and braces.
  Styleguide Nord - Frost
  */
  nord9: '#81a1c1',

  /*
  Bluish core color.
  Used for markup doctypes, import/include/require statements, pre-processor statements and at-rules (`@`).
  Styleguide Nord - Frost
  */
  nord10: '#5e81ac',

  /*
  Colorful component color.
  Used for errors, git/diff deletion and linter marker.
  Styleguide Nord - Aurora
  */
  nord11: '#bf616a',

  /*
  Colorful component color.
  Used for annotations.
  Styleguide Nord - Aurora
  */
  nord12: '#d08770',

  /*
  Colorful component color.
  Used for escape characters, regular expressions and markup entities.
  In the UI scope used for warnings and git/diff renamings.
  Styleguide Nord - Aurora
  */
  nord13: '#ebcb8b',

  /*
  Colorful component color.
  Main color for strings and attribute values.
  In the UI scope used for git/diff additions and success visualizations.
  Styleguide Nord - Aurora
  */
  nord14: '#a3be8c',
  /*
  Colorful component color.
  Used for numbers.
  Styleguide Nord - Aurora
  */
  nord15: '#b48ead',
};

export const nordTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,

    background: nord.nord0, // darkest
    card: nord.nord1,
    cardHeader: nord.nord3,
    inputBackground: nord.nord5, // lightest

    textPlaceholder: nord.nord3, // darkest
    textSecondary: nord.nord4,
    text: nord.nord6, // lightest

    primary: nord.nord8,
  },
};
