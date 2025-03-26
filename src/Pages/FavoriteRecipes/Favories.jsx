import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faHeart, faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import Recipes from '../recipe';
import '../SASS/favories.scss';

const Favorites = () => {
    
  const [favorites, setFavorites] = useState([]);
 // Initialisez favorites dans un useEffect 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []); 

  // Fonction pour ajouté une recette dans les favoris
  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
   
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  // Fonction pour filtrer les recettes en fonction des favoris
  const favoriteRecipes = Recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <>
   <Header />
    <div className="favorites">
      <h1>Mes Recettes Favorites</h1>
      {/* Si il n'y a pas de recettes favorites, affichez un message */}
      {favoriteRecipes.length === 0 ? (
        <p>Vous n'avez pas encore de recettes favorites.</p>
      ) : (
        <section className='section'>
          {favoriteRecipes.map(recipe => (
            <article className='card' key={recipe.id}>
              <figure>
                <img src={recipe.image} alt={recipe.name} />
              </figure>
              <div className='info'>
                <div>
                    <span className='info_span'>{recipe.catégory}</span>
                    <span className='info_span'>{recipe.type}</span>
                </div>
                <span
                  className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(recipe.id)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </div>
              <Link to={`/details/${recipe.id}`}>
                <h2>{recipe.name}</h2>
              </Link>
              <div className='info_prepa'>
                <span className='preparation'>
                  <FontAwesomeIcon icon={faUtensils} />{recipe.preparationTime} min
                </span>
                <span className='cuisson'>
                  <FontAwesomeIcon icon={faBowlRice} />{recipe.cookTime} min
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
    </>

  );
};

export default Favorites;
