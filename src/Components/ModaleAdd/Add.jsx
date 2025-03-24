import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Recipes from '../../Pages/recipe.json';
import './add.scss';

const ModalAdd = ({ isOpen, onClose, reload }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [preview, setPreview] = useState();

    useEffect(() => {
        // Extraire les catégories uniques du fichier recipe.json
        const uniqueCategories = [...new Set(Recipes.map(recipe => recipe.catégory))];
        setCategories(uniqueCategories);

        // Extraire les types uniques du fichier recipe.json
        const uniqueTypes = [...new Set(Recipes.map(recipe => recipe.type))];
        setTypes(uniqueTypes);
    }, []);
    
    // Fonction pour afficher la preview de l'image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        // Implémenter la logique pour ajouter la nouvelle recette à votre fichier JSON
        const newRecipe = {
            id: Recipes.length + 1,
            name: formData.get('name'),
            catégory: formData.get('catégory'),
            type: formData.get('type'),
            image: preview,
            preparationTime: parseInt(formData.get('preparationTime')),
            cookTime: parseInt(formData.get('cookTime')),
            ingrédients: formData.get('ingrédients').split('\n'),
            instructions: formData.get('instructions').split('\n')
        };

        // Ajouter la nouvelle recette à recipeData
        Recipes.push(newRecipe);

        // Fermer le modal et réinitialiser le formulaire
        onClose();
        setPreview();
        reload();
        e.target.reset();

    }

    const handleClose = () => {
        onClose();
        setPreview();
    }

    return (
        <div className={"modal" + (isOpen ? " active" : '')}>
            <div className="modal__content">
                <FontAwesomeIcon icon={faTimes} className='modal__content-icon' onClick={handleClose} />
                <h2>Ajout recette</h2>
                <form id="test" onSubmit={handleSubmit}>
                    <div className='preview'>
                        {preview ?
                            <img src={preview} alt="preview" />
                            :
                            <>
                                <img src={"/icons/placeholder.svg"} alt="placeholder" />
                                <label htmlFor="image">+ ajouter photo</label>
                                <span>jpg, png : 4mo max</span>
                            </>
                        }
                    </div>
                    <input type="file" id="image" name="image" onChange={handleFileChange} accept='image/*' />
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="preparationTime">Temps de préparation</label>
                    <input type="number" id="preparationTime" name="preparationTime" />

                    <label htmlFor="cookTime">Temps de cuisson</label>
                    <input type="number" id="cookTime" name="cookTime" />

                    <label htmlFor="category">Catégorie</label>
                    <select name="catégory" id="category">
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <label htmlFor="ingrédients">Ingrédients (un par ligne)</label>
                    <textarea name="ingrédients" id="ingrédients"></textarea>

                    <label htmlFor="instructions">Étapes (une par ligne)</label>
                    <textarea name="instructions" id="instructions"></textarea>
                </form>
                <button form="test">Valider</button>
            </div>
        </div>
    );
};

export default ModalAdd;
