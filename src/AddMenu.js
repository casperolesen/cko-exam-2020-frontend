import React from "react";

const AddMenu = ({ data }) => {

    const ingList = [];
    const inStock = true;

    if (data.length === 0) {
        return (
            <div>
                <h3>AddMenu</h3>
                <p>Please add recipes to menu..</p>
            </div>
        )
    } else {

        {
            data.map(r => (
                console.log(r.ingredients),
                ingList.push(r.ingredients),
                r.ingredients.forEach(i => {
                    console.log("Stock: " + i.stock);
                })
            ))
        }

        return (
            <div>
                <h3>AddMenu</h3>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>prepTime</th>
                            <th>directions</th>
                            <th>in stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.prepTime}</td>
                                <td>{r.directions}</td>
                                <td>{inStock.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }


}

export default AddMenu;