import React from 'react'
import Navigation from './navigation/Navigation'
import {ThemeManager} from './theme/ThemeContext'

const App = () => (
    <ThemeManager>
        <Navigation />
    </ThemeManager>
)

export default App
