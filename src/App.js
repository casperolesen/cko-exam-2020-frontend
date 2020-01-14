import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";
import AllRecipes from "./AllRecipes";
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
    //Call this from the AllHobbies control with the  person to edit
    //Set the state variable personToAddEdit with this person (a clone) to make the new value flow down via props
    pickedRecipes.push(recipe);
    setPickedRecipes([...pickedRecipes]);
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <AllRecipes data={recipes} adder={addRecipeToMenu}/>
          <AddMenu data={pickedRecipes}/>
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