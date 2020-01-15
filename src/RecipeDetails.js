import React from 'react';
import { Link } from 'react-router-dom';

const RecipeDetails = ({ match, data }) => {
    var recipe = data.find(r => r.id == match.params.recipeId);
    var recipeData;

    if (recipe) {
        console.log(recipe.ingredients);

        recipeData = <div>
            <p>Id: {recipe.id}</p>
            <p>Name: {recipe.name}</p>
            <p>Time: {recipe.prepTime}</p>
            <p>Directions: {recipe.directions}</p>
            <p>Ingredients:</p>
            {recipe.ingredients.map(i => (
                <div>
                <p>item_id: {i.item_id}<br />
                amount: {i.amount}<br />
                stock: {i.stock}</p>
                </div>
            ))}
        </div>
    } else {
        recipeData = <p> Sorry. Recipe doesnt exist </p>;
    }

    return (
        <div>
            <Link to="/">Back</Link>
            {recipeData}
            <Link to="/">Back</Link>
        </div>
    );
};

export default RecipeDetails;