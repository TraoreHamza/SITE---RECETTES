import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './Pages/RecipeList/Home';
import Details from './Pages/RecipeDetail/Details';
import Favories from './Pages/FavoriteRecipes/Favories'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import './App.css'
function App() {


  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/favories" element={<Favories />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)
}

export default App
