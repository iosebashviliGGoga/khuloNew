
import './App.css';
import './slider.scss'
import AnimatedRoutes from './AnimatedRoutes'

import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'

import { SearchContext } from '../src/components/Contexts/Context'
import { HelmetProvider } from 'react-helmet-async'

function App() {

  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState(1)

  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <SearchContext.Provider
            value={{ search, setSearch, language, setLanguage }}
          >
            <AnimatedRoutes />
          </SearchContext.Provider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
