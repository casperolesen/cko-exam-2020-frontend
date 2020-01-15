import React from "react";

import { Link } from "react-router-dom";

const AllMenues = ({ data }) => {
    console.log(data);
    
    return (
        <div>
            <h3>Menues</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Week</th>
                        <th>Year</th>
                        <th>Recipes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.weekNo}</td>
                            <td>{m.yearNo}</td>
                            <td>{m.recipes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllMenues;