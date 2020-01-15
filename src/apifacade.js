//const URL = "http://localhost:8080/cko-exam-2020-backend";
const URL = "https://lecasper.dk/cko-exam-2020-backend";
function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

class ApiFacade {
    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, { username: user, password: pass });
        const promise = fetch(URL + "/api/login", options)
            .then(handleHttpErrors);

        promise.then(res => this.setToken(res.token));
        return promise;
    }

    getRecipeAll = () => {
        const promise = fetch(URL + "/api/recipe/all").then(handleHttpErrors);
        return promise;
    };

    addEditRecipe = (recipe) => {
        if (recipe.id === "") {
            const option = this.makeOptions("POST", true, recipe);
            const promise = fetch(URL + "/api/recipe/add", option).then(handleHttpErrors);
            return promise;
        } else {
            const option = this.makeOptions("POST", true, recipe);
            const promise = fetch(URL + "/api/recipe/edit", option).then(handleHttpErrors);
            return promise;
        }

    }

    deleteRecipe = (id) => {
        const option = this.makeOptions("POST", true, { id: id });
        const promise = fetch(URL + "/api/recipe/delete", option).then(handleHttpErrors);
        return promise;
    }

    getMenuAll = () => {
        const promise = fetch(URL + "/api/menu/all").then(handleHttpErrors);
        return promise;
    };

    addMenu = (recipes) => {
        const option = this.makeOptions("POST", true, recipes);
        const promise = fetch(URL + "/api/menu/add", option).then(handleHttpErrors);
        return promise;

    }

    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
}

const facade = new ApiFacade();
export default facade;