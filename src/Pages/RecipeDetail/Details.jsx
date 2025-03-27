import React from 'react';
import  {useParams} from 'react-router';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';
import Recipes from '../recipe';
import '../SASS/details.scss';

const Details = () => {
  // Utilise le hook useParams pour extraire l'ID de la recette.
  const { id } = useParams();
  // Crée un état pour stocker la recette trouvée.
  const [recipe, setRecipe] = useState(null);
 
  // Utilisation de useEffect pour charger la recette quand l'ID change.
  useEffect(() => {
      // Récupérer toutes les recettes du localStorage
      // Combine les recettes initiales (Recipes) avec celles du localStorage.
      const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      
      // Combiner les recettes initiales avec celles du localStorage
      const allRecipes = [...Recipes, ...storedRecipes];
      
      // Trouver la recette correspondant à l'ID
      // Gère les cas où l'ID pourrait être une chaîne ou un nombre.
      const foundRecipe = allRecipes.find(recipe => recipe.id === id || recipe.id === parseInt(id));
      setRecipe(foundRecipe);
  }, [id]);
  console.log(JSON.parse(localStorage.getItem('recipes')));
  // Si la recette n'est pas trouvé affiche un message d'erreur
  if (!recipe) {
      return <div>Aucune recette trouvé</div>;
  }
    return (
        <>
          <Header />
            <main>
              <h1>{recipe.name}</h1>
                <figure>
                    <img src={recipe.image} alt="" />
                </figure>
                <section className='flex__section'>
              <table class="info-table">
                <thead>
                  <tr>
                    <th class="author-info">
                      Par:
                      <img src="/illustrations-png.webp" alt="Author Image"/>
                    </th>
                    <td class="nutrition-info">
                      Mathieu Duchamps<br/>
                      Ph.D., docteur en nutrition
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="prep-time">
                      <p><FontAwesomeIcon icon={faUtensils} /><br /> Préparation <br/>{recipe.preparationTime} min</p>
                    </td>
                    <td class="cook-time">
                      <p> <FontAwesomeIcon icon={faBowlRice} /> <br /> Cuisson <br/>{recipe.cookTime} min</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            
              <article>
                <h3>Ingrédients:</h3>
                <ul>
                {recipe.ingrédients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Instruction:</h3>
                <ul>
                {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </article>
            </section>
            </main>
        </>
    );
};

export default Details;