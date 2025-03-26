import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Correction de l'import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import ModalAdd from '../../Components/ModaleAdd/Add';
import Recipes from '../recipe.json'; // Import du fichier JSON
import '../SASS/home.scss';

const RecipeForm = () => {
    // 
    const [favorites, setFavorites] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Initilisé 
    const [recipes, setRecipes] = useState(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
        return storedRecipes || Recipes;
    });
    // Ajouter une nouvelle recette dans le localSrtorage et les mettre à jour
    const updateRecipes = (newRecipes) => {
        setRecipes(newRecipes);
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
    };
    
    // Fonction pour ajouter une nouvelle recette
    const handleAddRecipe = (newRecipe) => {
        // Si newRecipe n'est pas vide, ajoute la nouvelle recette
        if (newRecipe) {
            const updatedRecipes = [...recipes, newRecipe];
            updateRecipes(updatedRecipes);
            setFilteredRecipes(updatedRecipes); 
        }
        setIsModalOpen(false);
    };;


    // Initialisez filteredRecipes et favorites dans un useEffect 
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setFilteredRecipes(recipes); // Utiliser recipes ici
    }, [recipes]);
   

    // Fonction pour ajouter un recette a favorites
   const toggleFavorite = (recipeId) => {
    // constante pour stocker les recettes favorites
        const newFavorites = favorites.includes(recipeId)
        ? favorites.filter(id => id !== recipeId)
        : [...favorites, recipeId];
  
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    
    // Fonction pour filtrer les recettes catégorie et type
    const Filters = (category, type, search) => {
        let recipesFiltered = recipes;
        // Si category est different de 'Toutes', filtrez les recettes par catégories
        if (category !== 'Toutes') {
            recipesFiltered = recipesFiltered.filter(recipe => recipe.catégory === category);
        }
        // Si category est different de 'Toutes', filtrez les recettes par types
        if (type !== 'Tous') {
            recipesFiltered = recipesFiltered.filter(recipe => recipe.type === type);
        }
        // Si search n'est pas vide filtrez les recettes search
        if (search.length > 1) {
            recipesFiltered = recipesFiltered.filter(recipe => 
            recipe.name.toLowerCase().includes(search.toLowerCase()) ||
            recipe.catégory.toLowerCase().includes(search.toLowerCase()) ||
            recipe.type.toLowerCase().includes(search.toLowerCase())
        );
        }
        // Met a jour filteredRecipes
        setFilteredRecipes(recipesFiltered);
    }
    
    
    const reloadData = () => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || Recipes;
        updateRecipes(storedRecipes);
        setFilteredRecipes(storedRecipes); // Mettre à jour filteredRecipes
    };
    
    // Fonction pour filtrer les recettes par search
    const handleSearch = (value) => {
        // Si value est superieur a 1, filtrez les recette par search
        if (value.length > 1) {
            const regex = new RegExp(`^${value}`, 'i');
            const suggestionList = recipes.filter(recipe => regex.test(recipe.name));
            setSuggestions(suggestionList.slice(0, 5));
        
            Filters(selectedCategory, selectedType, value);
        // Sinon videz la suggestion
        } else {
            setSuggestions([]);
            Filters(selectedCategory, selectedType, search);
        }
    };
    
    // Fonction pour fermer le modal si l'utisateur clique sur le bouton fermer ou submit
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    return (
        <>
        {/* Si isModalOpen est true, affichez le modal */}
         {isModalOpen && (
       < ModalAdd reload={reloadData} onClose={handleAddRecipe} isOpen={isModalOpen}/>
        )}
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
            <span className='add' onClick={handleOpenModal}>Ajouter une recette <FontAwesomeIcon icon={faPenToSquare} /></span>
            <section className='section'>
            {filteredRecipes.map(recipe => (
            <article className='card' key={recipe.id}>
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
                <Link to={`/details/${recipe.id}`}>
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
