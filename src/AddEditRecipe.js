import React, { useState } from "react";

const AddEditRecipe = (props) => {
    const [recipe, setRecipe] = useState({ ...props.newRecipe });

    const handleChange = (evt) => {
        const target = evt.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setRecipe({ ...recipe, [name]: value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.addEditRecipe(recipe);
        
    }

    return (
        <div>
            <h3>AddEditRecipe</h3>
            <form onSubmit={handleSubmit} onChange={handleChange} >
                id:
                <input
                    readOnly id="id"
                    placeholder={recipe.id === "" ? "" : recipe.id}
                />
                name:
                <input
                    id="name"
                    value={recipe.name}
                />
                prepTime:
                <input
                    id="prepTime"
                    value={recipe.prepTime}
                />
                directions:
                <input
                    id="directions"
                    value={recipe.directions}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddEditRecipe;