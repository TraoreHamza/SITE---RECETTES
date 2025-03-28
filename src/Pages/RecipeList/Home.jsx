import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Correction de l'import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import Accordion from '../../Components/Accordion/Accordion';
import Recipes from '../recipe.json'; 
import '../SASS/home.scss';

const Home = () => {
    // 
    const [favorites, setFavorites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [selectedType, setSelectedType] = useState('Tous');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recipes, setRecipes] = useState(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
        return storedRecipes || Recipes;
    });

    console.log(setRecipes);

    // Initialisez filteredRecipes et favorites dans un useEffect 
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setFilteredRecipes(recipes); 
    }, []);

    // Fonction pour ajouter un recette a favorites
    // Basculer une recette dans les favoris
    // Vérifie si la recette est déjà dans les favoris
    // Crée un nouveau tableau :
    // Retire la recette si elle existe
    // Ajoute la recette si elle n'existe pas
    const toggleFavorite = (recipeId) => {
    // constante pour stocker les recettes favorites
        const newFavorites = favorites.includes(recipeId)
        ? favorites.filter(id => id !== recipeId)
        : [...favorites, recipeId];
        console.log("New favorites:", newFavorites);
        // Met à jour l'état favorites
        setFavorites(newFavorites);
        // Sauvegarde dans le localStorage
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
   
    // Fonction pour filtrer les recettes catégorie, type...
    // Filtre par catégorie (si sélectionné)
    // Filtre par type (si sélectionné)
    // Filtre par recherche textuelle (si >1 caractère)
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
        // Ce filtrage ne s'applique que si la chaîne de recherche (search) contient plus d'un caractère.
        // Cela évite des recherches trop larges ou des opérations inutiles pour des saisies très courtes.
            recipesFiltered = recipesFiltered.filter(recipe => 
            recipe.name.toLowerCase().includes(search.toLowerCase()) ||
            recipe.catégory.toLowerCase().includes(search.toLowerCase()) ||
            recipe.type.toLowerCase().includes(search.toLowerCase())
        );
        }
        // Met a jour filteredRecipes
        setFilteredRecipes(recipesFiltered);
    };
    // Cette fonction estappelée lorsque l'utilisateur sélectionne un nouveau catégorie.
    const filterCategory = (category) => {
        setSelectedCategory(category);
        Filters(category, selectedType, search);
    };
    // Cette fonction est appelée lorsque l'utilisateur sélectionne une nouvelle types de recette.
    const filterType = (type) => {
        setSelectedType(type);
        Filters(selectedCategory, type, search);
    };
    
    // Fonction pour filtrer les recettes par search
    const handleSearch = (value) => {
        // Si value est superieur a 1, filtrez les recette par search
        if (value.length > 1) {
            const regex = new RegExp(`^${value}`, 'i');
        // Filtre toutes les recettes dont le nom correspond à la regex
        // Garde seulement les 5 premières suggestions
            const suggestionList = recipes.filter(recipe => regex.test(recipe.name));
            setSuggestions(suggestionList.slice(0, 5));
        
            Filters(selectedCategory, selectedType, value);
        // Sinon vide la liste des suggestions
        // Réapplique les filtres avec la dernière valeur de recherche valide
        } else {
            setSuggestions([]);
            Filters(selectedCategory, selectedType, search);
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
                <Accordion title="Catégories" content={['Toutes', ...new Set(recipes.map(recipe => recipe.catégory))]}
                onSelect={filterCategory}/>
                <Accordion title="Types" content={['Tous', ...new Set(recipes.map(recipe => recipe.type))]}
                onSelect={filterType}/>
            </div>
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

export default Home;
