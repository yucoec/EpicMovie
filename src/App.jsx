import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import EpiModal from './components/EpiModal'
import EpisodeSerie from './components/EpisodeSerie'
import Header from './components/Header'
import { PageNotFound } from './components/notfound/pageNotFound'
import DetailsMoviePage from './pages/DetailsMoviePage.jsx'
import DetailsSeriePage from './pages/DetailsSeriePage'
import { Home } from './pages/Home'
import List from './pages/List'
import SearchedMovies from './pages/SearchedMovies'
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
          <Route path='/search/:keyword' element={<SearchedMovies />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
