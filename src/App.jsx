import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EpisodeAnime from './components/EpisodeAnime'
import EpisodeSerie from './components/EpisodeSerie'
import Header from './components/Header'
import { PageNotFound } from './components/PageNotFound'
import { Anime } from './pages/Anime'
import DetailsAnimePage from './pages/DetailsAnimePage'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/series' element={<Series />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/:id/:title' element={<DetailsMoviePage />} />
          <Route path='/list/:page' element={<List />} />
          <Route path='/series/:id/:title' element={<DetailsSeriePage />} />
          <Route path='/anime/:id/:title' element={<DetailsAnimePage />} />
          <Route path='/series/:id/:title/:season/:episode' element={<EpisodeSerie />} />
          <Route path='/anime/:id/:title/:season/:episode' element={<EpisodeAnime />} />
          <Route path='/search/:keyword' element={<Search />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
