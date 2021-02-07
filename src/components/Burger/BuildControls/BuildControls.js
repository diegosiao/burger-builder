import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map((control, key) => 
                <BuildControl label={control.label} 
                    key={key}
                    disabled={props.disabled[control.type]}
                    type={control.type} 
                    added={() => props.ingredientAdded(control.type) }
                    removed={() => props.ingredientRemoved(control.type) } />)}
            <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

buildControls.propTypes = {
    price: PropTypes.number.isRequired
}

export default buildControls;