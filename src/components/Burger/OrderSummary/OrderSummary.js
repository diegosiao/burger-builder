import React, { Component, Fragment } from "react";

import Button from "../../UI/Button/Buton";

class OrderSummary extends Component {
  componentWillUpdate() {
      console.log('[Order Summary] Will update');
  }

  render() {
    const orderIngredients = Object.keys(this.props.ingredients).map((el) => {
      return (
        <li key={el}>
          <span style={{ textTransform: "capitalize" }}>{el}</span>:{" "}
          {this.props.ingredients[el]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{orderIngredients}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Proceed to checkout?</p>
        <Button btnType={"Danger"} clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType={"Success"} clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
