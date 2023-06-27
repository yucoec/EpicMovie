import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import Header from './components/Header'
// import Anime from './pages/Anime'
// import DetailsAnimePage from './pages/DetailsAnimePage'
// import DetailsMoviePage from './pages/DetailsMoviePage.jsx'
// import DetailsSeriePage from './pages/DetailsSeriePage'
// import EpisodeAnime from './pages/EpisodeAnime'
// import EpisodeSerie from './pages/EpisodeSerie'
// import Home from './pages/Home'
// import List from './pages/List'
// import Search from './pages/Search'
// import Series from './pages/Series'
const Home = lazy(() => import('./pages/Home.jsx'))
const Series = lazy(() => import('./pages/Series.jsx'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const EpisodeSerie = lazy(() => import('./pages/EpisodeSerie'))
const EpisodeAnime = lazy(() => import('./pages/EpisodeAnime'))
const Anime = lazy(() => import('./pages/Anime'))
const DetailsAnimePage = lazy(() => import('./pages/DetailsAnimePage'))
const DetailsMoviePage = lazy(() => import('./pages/DetailsMoviePage.jsx'))
const DetailsSeriePage = lazy(() => import('./pages/DetailsSeriePage'))
const List = lazy(() => import('./pages/List'))
const Search = lazy(() => import('./pages/Search'))

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<MoonLoader color='#fff' size={120} speedMultiplier={2} />}>
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
      </Suspense>
    </HelmetProvider >
  )
}

export default App
