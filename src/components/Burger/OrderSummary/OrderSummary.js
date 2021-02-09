import React, { Fragment } from 'react';

import Button from '../../UI/Button/Buton';

const orderSummary = (props) => {

    const orderIngredients = Object.keys(props.ingredients)
        .map((el) => {
            return (
                <li key={el}>
                    <span style={{textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]}
                </li>
            );
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Proceed to checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinue}>CONTINUE</Button>
        </Fragment>
    );
}

export default orderSummary;