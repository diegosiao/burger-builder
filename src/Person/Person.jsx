import React from 'react';

const person = (props) => {
    return (
        <div className="Person">
            <h1>{props.name}</h1>
            <p>Is {props.age} years old.</p>
            <button onClick={props.click} >Add some age</button>
        </div>
    );
};

export default person;