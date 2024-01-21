import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, ThemeSwitch } from './components/Theme';
import Home from './components/Home';
import './App.css';
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <header className="App-header">
                    <LanguageSwitcher/>
                    <ThemeSwitch />
                </header>
                <Home />
            </div>
        </ThemeProvider>
    );
}

export default App;
