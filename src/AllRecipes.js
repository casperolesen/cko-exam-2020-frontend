import React, {useState} from "react";

import { Link } from "react-router-dom";

const AllRecipes = ({ data, adder, deleter, editer, searcher, reseter }) => {

    const [filterTxt, setFilterTxt] = useState([]);

    const handleChange = (evt) => {
        const target = evt.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setFilterTxt(value);
    }

    return (
        <div>
                <h3>Recipes</h3>

                <form onChange={handleChange}>
                    <input type="text" placeholder="Search by name.." />
                    <button onClick={(e) => {e.preventDefault(); searcher(filterTxt)}}>Search</button>
                    <button onClick={(e) => {e.preventDefault(); reseter()}}>Reset</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Directions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.prepTime}</td>
                                <td>{r.directions}</td>
                                <td>
                                    <a href="xx" onClick={(e) => { e.preventDefault(); adder(r) }}>add</a>,
                                <a href="xx" onClick={(e) => { e.preventDefault(); deleter(r.id) }}>delete</a>,
                                <a href="xx" onClick={(e) => { e.preventDefault(); editer(r) }}>edit</a>,
                                <Link to={`details/${r.id}`}>view</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}

export default AllRecipes;