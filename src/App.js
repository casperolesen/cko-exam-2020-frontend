import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";
import AllRecipes from "./AllRecipes";
import AddEditRecipe from "./AddEditRecipe";
import AddMenu from "./AddMenu";

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";

function App() {
  const [roles, setRoles] = useState([]);
  const emptyRecipe = { id: "", name: "", prepTime: "", directions: "" };
  const [recipeToAddEdit, setRecipeToAddEdit] = useState(emptyRecipe);
  const [recipes, setRecipes] = useState([]); // all recipes
  const [pickedRecipes, setPickedRecipes] = useState([]); // choosen recipes for menu

  const logInState = (r) => {
    setRoles(r);
  }

  useEffect(() => {
    facade.getRecipeAll().then(res => {
      console.log(res);
      setRecipes(res);
    });
  }, []);

  const addRecipeToMenu = (recipe) => {
    let stock = true;

    if (pickedRecipes.length === 7) {
      alert("You have already picked 7 recipes. Remove 1 to add another..");
      return;
    }

    recipe.ingredients.forEach(i => {
      console.log("Stock: " + i.stock);
      if (i.stock === 0) {
        stock = false;
        alert("Not possible to add to Menu. Some ingredients are not in stock..");
        return;
      }
    })

    if (stock) {
      pickedRecipes.push(recipe);
      recipes.splice(recipes.indexOf(recipe), 1);
      setPickedRecipes([...pickedRecipes]);
      setRecipes([...recipes]);
    }

  }

  const removeRecipeFromMenu = (recipe) => {
    pickedRecipes.splice(pickedRecipes.indexOf(recipe), 1);
    recipes.push(recipe);
    setPickedRecipes([...pickedRecipes]);
    setRecipes([...recipes]);
  }

  const addMenuHandler = (data) => {
    console.log(data);
    facade.addMenu(data);
  }

  const editRecipe = (recipe) => {
    const edit = recipes.find(x => x.id == recipe.id);
    setRecipeToAddEdit(edit);
  }

  const storeAddEditRecipe = (recipe) => {
    facade.addEditRecipe(recipe);

    if (recipe.id === "") {
      recipes.push(recipe);
    } else {
      var foundIndex = recipes.findIndex(x => x.id === recipe.id);
      recipes[foundIndex] = recipe;
    }

    setRecipes([...recipes]);
    setRecipeToAddEdit(emptyRecipe);
  }

  const deleteRecipe = (id) => {
    facade.deleteRecipe(id);
    const filtered = recipes.filter(function (value, index, arr) {
      return value.id != id;
    });
    setRecipes(filtered);
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <AllRecipes
            data={recipes}
            adder={addRecipeToMenu}
            deleter={deleteRecipe}
            editer={editRecipe}
          />
          <AddMenu
            data={pickedRecipes}
            remover={removeRecipeFromMenu}
            addMenuHandler={addMenuHandler}
          />
          <AddEditRecipe
            newRecipe={recipeToAddEdit}
            //  Next two lines, are if you decide to use the pattern introduced in the day-2 exercises
            addEditRecipe={storeAddEditRecipe}
            key={recipeToAddEdit.id}
          />
        </Route>
        <Route path="/login">
          <Login logInState={logInState} />
        </Route>
        <PrivateRoute path="/user" component={LoggedIn} roles={roles} />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, roles: roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => facade.getToken() != null
        ? <Component {...props} roles={roles} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
  )
}

function LoggedIn(props) {
  const { roles } = props;
  return (
    <div className="data-wrapper">
      <div className="info-box">
        <h2 className="headline">Data recieved</h2>
        <h4>Roles:</h4>
        {
          roles.map((elem, index) => (<h5 key={index}>{elem}</h5>))
        }
      </div>
    </div>
  )
}

export default App;