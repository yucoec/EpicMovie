import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import DetailsMoviePage from './pages/DetailsMoviePage.jsx'
import DetailsSeriePage from './pages/DetailsSeriePage'
import { Home } from './pages/Home'
import SearchedMovies from './pages/SearchedMovies'
import { Series } from './pages/Series'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/series' element={<Series />} />
        <Route path='/details/:id' element={<DetailsMoviePage />} />
        <Route path='/series/details/:id' element={<DetailsSeriePage />} />
        <Route path='/search/:keyword' element={<SearchedMovies />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
