import React from "react";

const AddMenu = ({ data, remover, addMenuHandler }) => {

    const ingList = [];
    let inStock = true;

    if (data.length === 0) {
        return (
            <div>
                <h3>New Menu</h3>
                <p>Please add recipes to menu..</p>
            </div>
        )
    } else {

        {
            data.map(r => (
                inStock = true,
                console.log(r.ingredients),
                ingList.push(r.ingredients)

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
                                <td>
                                    <a href="xx" onClick={(e) => { e.preventDefault(); remover(r) }}>remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={(e) => {e.preventDefault(); addMenuHandler(data)}}>Save Menu</button>
            </div>
        )
    }


}

export default AddMenu;