import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Recipes from '../../Pages/recipe.json';
import './add.scss';

// isOpen : Indique si le modal est ouvert ou fermé.
// onClose : Fonction pour fermer le modal.
// reload : Fonction pour recharger les données après l'ajout d'une recette.
const ModalAdd = ({ isOpen, onClose, reload }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    // Stocke le prévisualisation de l'image sélectionn
    const [preview, setPreview] = useState();
    const [errors, setErrors] = useState({});

    // S'exécute une fois au chargement du composant.
    // Extrait les catégories et types uniques des recettes existantes.
    // Met à jour les états categories et types
    useEffect(() => {
        // Extraire les catégories uniques du fichier recipe.json
        const uniqueCategories = [...new Set(Recipes.map(recipe => recipe.catégory))];
        setCategories(uniqueCategories);

        // Extraire les types uniques du fichier recipe.json
        const uniqueTypes = [...new Set(Recipes.map(recipe => recipe.type))];
        setTypes(uniqueTypes);
    }, []);
    
    // Vérifie si tous les champs requis du formulaire sont remplis.
    // Crée un objet newErrors avec des messages d'erreur pour chaque champ manquant.
    const validateForm = (formData) => {
        const newErrors = {};
        // Si les l'une des champs est vide affiche une erreur sous le champ
        if (!formData.get('name')) newErrors.name = "Le titre est requis";
        if (!formData.get('preparationTime')) newErrors.preparationTime = "Le temps de préparation est requis";
        if (!formData.get('cookTime')) newErrors.cookTime = "Le temps de cuisson est requis";
        if (!formData.get('ingrédients')) newErrors.ingrédients = "Les ingrédients sont requis";
        if (!formData.get('instructions')) newErrors.instructions = "Les instructions sont requises";
        if (!formData.get('image').name) newErrors.image = "Une image est requise";
        // Met à jour l'état errors et retourne les erreurs.
        setErrors(newErrors);
        return newErrors;
    };
    
    // Fonction pour afficher la preview de l'image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
    }
    
    // Fonction handleSublit pour sommetre la formulaire
    // Empêche le comportement par défaut du formulaire.
    // Valide le formulaire et arrête la soumission s'il y a des erreurs.
    // Convertit l'image en base64 si une image est sélectionnée.
    // Crée un nouvel objet recette avec les données du formulaire.
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData(e.target);
        const formErrors = validateForm(formData);
        
        if (Object.keys(formErrors).length > 0) {
            return; // Arrêter la soumission si le formulaire n'est pas valide
        }

        const file = e.target.image.files[0];
        let imageData = null;
    
        if (file) {
            imageData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }
        // Ajoute la nouvelle recette à la liste existante.
        const newRecipe = {
            id: Recipes.length + 1,
            name: formData.get('name'),
            catégory: formData.get('catégory'),
            type: formData.get('type'),
            image: imageData || "/icons/placeholder.svg",
            preparationTime: parseInt(formData.get('preparationTime')),
            cookTime: parseInt(formData.get('cookTime')),
            ingrédients: formData.get('ingrédients').split('\n'),
            instructions: formData.get('instructions').split('\n')
        };
        onClose(newRecipe);


        // Ajouter la nouvelle recette à recipeData
        Recipes.push(newRecipe);

        // Ferme le modal, réinitialise le formulaire et recharge les données.
        onClose();
        setPreview();
        reload();
        e.target.reset();

    }
    
    // Ferme le modal et réinitialise la prévisualisation de l'image.
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
                    {errors.name && <span className="error">{errors.image}</span>}
                    <label htmlFor="name">Titre</label>
                    <input type="text" id="name" name="name" placeholder='Ecrivez le titre de votre recette' className={errors.name ? 'error_input' : ''} />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label htmlFor="preparationTime">Temps de préparation</label>
                    <input type="number" id="preparationTime" name="preparationTime" placeholder='Temps de préparation' />
                    {errors.name && <span className="error">{errors.preparationTime}</span>}

                    <label htmlFor="cookTime">Temps de cuisson</label>
                    <input type="number" id="cookTime" name="cookTime" placeholder='Temps de cuisson'/>
                    {errors.cookTime && <span className="error">{errors.cookTime}</span>}

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
                    <textarea name="ingrédients" id="ingrédients" placeholder='Ecrivez les ingrédients'></textarea>
                    {errors.ingrédients && <span className="error">{errors.ingrédients}</span>}

                    <label htmlFor="instructions">Étapes (une par ligne)</label>
                    <textarea name="instructions" id="instructions" placeholder='Ecrivez les étapes '></textarea>
                    {errors.ingrédients && <span className="error">{errors.instructions}</span>}
                </form>
                <button form="test">Valider</button>
            </div>
        </div>
    );
};

export default ModalAdd;
