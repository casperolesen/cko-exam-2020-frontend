import React from "react";

const AllRecipes = ({ data, adder, deleter, editer }) => {
    return (
        <div>
            <h3>AllRecipes</h3>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>prepTime</th>
                        <th>directions</th>
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
                                <a href="xx" onClick={(e) => { e.preventDefault(); editer(r) }}>edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllRecipes;