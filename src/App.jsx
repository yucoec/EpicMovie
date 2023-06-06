import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import EpiModal from './components/EpiModal'
import Header from './components/Header'
import DetailsMoviePage from './pages/DetailsMoviePage.jsx'
import DetailsSeriePage from './pages/DetailsSeriePage'
import { Home } from './pages/Home'
import SearchedMovies from './pages/SearchedMovies'
import { Series } from './pages/Series'

function App() {

  return (
    <Router>
      <Header />
      <EpiModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/series' element={<Series />} />
        <Route path='/details/:id' element={<DetailsMoviePage />} />
        <Route path='/series/details/:id' element={<DetailsSeriePage />} />
        <Route path='/search/:keyword' element={<SearchedMovies />} />
      </Routes>
    </Router>
  )
}

export default App
