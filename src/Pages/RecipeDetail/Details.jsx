import React from 'react';
import  {useParams} from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Header from '../../Components/Header/Header';

import Recipes from '../recipe';
import '../SASS/details.scss';
const Details = () => {
    const {id} = useParams();
    const recipe = Recipes.find(recipe => recipe.id === id);
    console.log(id);
    return (
        <>
           <Header />
            <main>
              <h1>{recipe && recipe.name}</h1>
                <figure>
                    <img src={recipe && recipe.image} alt="" />
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
                      <p><FontAwesomeIcon icon={faUtensils} /><br /> Préparation <br/>{recipe && recipe.preparationTime} min</p>
                    </td>
                    <td class="cook-time">
                      <p> <FontAwesomeIcon icon={faBowlRice} /> <br /> Cuisson <br/>{recipe && recipe.cookTime} min</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            
              <article>
                <h3>Ingrédients:</h3>
                <ul>
                {recipe && recipe.ingrédients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Instruction:</h3>
                <ul>
                {recipe && recipe.instructions.map((instruction, index) => (
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