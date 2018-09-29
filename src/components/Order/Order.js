import React from 'react';

import Burger from '../Burger/Burger';

import classes from './Order.css';

export default (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            key={ig.name}
            style={
                {
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #cccccc',
                    padding: '5px'
                }
            }
            >{ig.name} ({ig.amount})</span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <Burger ingredients={props.ingredients} />
        </div>
    )
}
