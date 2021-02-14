import React, { Component, Fragment } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

import axiosfb from "../../axios-fb";

import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 1.3,
  meat: 2.3,
};

const initialState = {
  totalPrice: 4,
  purchasable: false,
  purchasing: false,
  loading: false,
  error: null,
};

class BurgerBuilder extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    axiosfb
      .get("ingredients.json")
      .then((response) => {
        initialState.ingredients = response ? response.data : null;
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false, error: 'Sorry, ingredients could not be loaded.' });
      });
  }

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
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Diego Morais",
        email: "diegosiao@gmail.com",
        address: {
          line1: "Rua Francisco de Assis de Oliveira, 50",
          line2: "Villares - casa 41A",
          cep: "59068350",
        },
      },
    };

    axiosfb.post("/orders.json", order).then((response) => {
      this.setState({
        ...initialState,
      });
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo)
      disabledInfo[key] = this.state.ingredients[key] <= 0;

    let orderSummary = null;

    let burger = this.state.error ? this.state.error : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchasingCanceledHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCanceledHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosfb);
