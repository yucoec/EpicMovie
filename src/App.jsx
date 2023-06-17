import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EpiModal from './components/EpiModal'
import EpisodeSerie from './components/EpisodeSerie'
import Header from './components/Header'
import DetailsMoviePage from './pages/DetailsMoviePage.jsx'
import DetailsSeriePage from './pages/DetailsSeriePage'
import { Home } from './pages/Home'
import List from './pages/List'
import Search from './pages/Search'
import { Series } from './pages/Series'

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Header />
        <EpiModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/series' element={<Series />} />
          <Route path='/:id/:title' element={<DetailsMoviePage />} />
          <Route path='/list/:page' element={<List />} />
          <Route path='/series/:id/:title' element={<DetailsSeriePage />} />
          <Route path='/:id/:title/:season/:episode' element={<EpisodeSerie />} />
          <Route path='/search/:keyword' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
