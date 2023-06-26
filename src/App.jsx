import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import Header from './components/Header'

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
            <Route path="/" Component={Home} />
            <Route path='/series' Component={Series} />
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
