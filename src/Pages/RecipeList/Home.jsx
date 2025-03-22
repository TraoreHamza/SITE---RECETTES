import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import Accordion from '../../Components/Accordion/Accordion';
import Recipes from '../recipe';
import '../SASS/home.scss';

const Home = () => {
    // 
    const [favorites, setFavorites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [selectedType, setSelectedType] = useState('Tous');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

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
    
    // Fonction pour filtrer les re
    const Filters = (category, type, search) => {
        let recipes = Recipes;
        // Si category est different de 'Toutes', filtrez les recettes par catégories
        if (category !== 'Toutes') {
            recipes = recipes.filter(recipe => recipe.catégory === category);
        }
        // Si category est different de 'Toutes', filtrez les recettes par types
        if (type !== 'Tous') {
            recipes = recipes.filter(recipe => recipe.type === type);
        }
        // Si search n'est pas vide filtrez les recettes search
        if (search.length > 1) {
            recipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(search.toLowerCase()) ||
            recipe.catégory.toLowerCase().includes(search.toLowerCase()) ||
            recipe.type.toLowerCase().includes(search.toLowerCase())
        );
        }
        // Met a jour filteredRecipes
        setFilteredRecipes(recipes);
    };
    // Fonction pour filtrer les catégories
    const filterCategory = (category) => {
        setSelectedCategory(category);
        Filters(category, selectedType, '');
    };
    // Fonction pour afficher les types
    const filterType = (type) => {
        setSelectedType(type);
        Filters(selectedCategory, type, '');
    };
    
    // Fonction pour filtrer les recettes par search
    const handleSearch = (value) => {
        // Si value est superieur a 1, filtrez les recette par search
        if (value.length > 1) {
            const regex = new RegExp(`^${value}`, 'i');
            const suggestionList = Recipes.filter(recipe => regex.test(recipe.name));
            setSuggestions(suggestionList.slice(0, 5));
        
            Filters(selectedCategory, selectedType, value);
        // Sinon videz la suggestion
        } else {
            setSuggestions([]);
            Filters(selectedCategory, selectedType, '');
        }
    };
    return (
        <>
            <Header onSearch={handleSearch} />
        {suggestions.length > 0 && (
            <ul className="suggestions">
            {suggestions.map(recipe => (
                <li key={recipe.id} onClick={() => {
                setSearch(recipe.name);
                setSuggestions([]);
                setFilteredRecipes([recipe]);
            }}>
                {recipe.name}
                </li>
            ))}
            </ul>
        )}
            <h1>NOS RECETTES</h1>
            <div className="rental__accordions">
                <Accordion title="Catégories" content={['Toutes', ...new Set(Recipes.map(recipe => recipe.catégory))]}
                onSelect={filterCategory}/>
                <Accordion title="Types" content={['Tous', ...new Set(Recipes.map(recipe => recipe.type))]}
                onSelect={filterType}/>
            </div>
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

export default Home;