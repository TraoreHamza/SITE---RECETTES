import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import ModalAdd from '../../Components/ModaleAdd/Add';
import Recipes from '../recipe';
import '../SASS/home.scss';

const RecipeForm = () => {
    // 
    const [favorites, setFavorites] = useState([]);
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    // Initialisez filteredRecipes et favorites dans un useEffect 
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setFilteredRecipes(Recipes);
    }, []);

    // Fonction pour ajouter un recette a favorites
    const toggleFavorite = (recipeId) => {
        const newFavorites = favorites.includes(recipeId)
            ? favorites.filter(id => id !== recipeId)
            : [...favorites, recipeId];
        // Stockez les favorites dans le localeStorage
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    useEffect(() => {
        getWorks();
    }, [])

    const getWorks = async () => {
        try {
            const data = await fetchWorks();
            setWorks(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
        <Header onSearch={handleSearch} />
        <ModalAdd reload={Recipes} isOpen={isOpenAdd} onClose={() => setIsOpenAdd(false)} />
            <h1>NOS RECETTES</h1>
            <span onClick={() => setIsOpenAdd(true)}>Editer <FontAwesomeIcon icon={faPenToSquare} /></span>
            <section className='section'>
            {filteredRecipes.map(recipe => (
            <article className='card'>
                    <figure>
                        <img src={recipe.image} alt={recipe.name} />
                    </figure>
                <div className='info'>
                <div>
                    <span className='info_span'>{recipe.catégory}</span>
                    <span className='info_span'>{recipe.type}</span>
                </div>
                    <span className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}  onClick={() => toggleFavorite(recipe.id)}> <FontAwesomeIcon icon={faHeart} /></span>
                </div>
                <Link to={`/details/${recipe.id}`} key={recipe.id}>
                <h2>{recipe.name}</h2>
                </Link>
                <div className='info_prepa'>
                    <span className='preparation'><FontAwesomeIcon icon={faUtensils} />{recipe.preparationTime} min</span>
                    <span className='cuisson'><FontAwesomeIcon icon={faBowlRice} />{recipe.cookTime} min</span>
                </div>
            </article>
            ))}
            </section>
        </>
    );
};

export default RecipeForm;