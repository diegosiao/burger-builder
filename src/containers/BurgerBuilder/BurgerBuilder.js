import React, { Component, Fragment } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 1.3,
  meat: 2.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchasableState() {
    const sum = Object.keys(this.state.ingredients)
      .map((el) => this.state.ingredients[el])
      .reduce((v, current) => (v += current), 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    let ingredientQt = this.state.ingredients[type];
    let updatedIgredients = { ...this.state.ingredients };
    updatedIgredients[type] = ingredientQt + 1;

    this.setState(
      {
        ingredients: updatedIgredients,
        totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
      },
      this.updatePurchasableState
    );
  };

  removeIngredientHandler = (type) => {
    let ingredientQt = this.state.ingredients[type];

    if (ingredientQt === 0) return;

    let updatedIgredients = { ...this.state.ingredients };
    updatedIgredients[type] = ingredientQt - 1;

    this.setState(
      {
        ingredients: updatedIgredients,
        totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
      },
      this.updatePurchasableState
    );
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("purchase continued");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo)
      disabledInfo[key] = this.state.ingredients[key] <= 0;

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCanceledHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchasingCanceledHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchasingHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
