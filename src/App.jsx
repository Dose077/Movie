import { HashRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"

function App() {

  return (
    
    <HashRouter>
      <Routes>
        <Route exact path="/" element ={<HomePage/>}/>
        <Route exact path="/movie/:movieId" element ={<MoviePage/>}/>
      </Routes>
    </HashRouter>

  )
}

export default App
