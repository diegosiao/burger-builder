import React, { Component } from "react";
import Button from "../../../components/UI/Button/Buton";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import classes from "./ContactData.css";
import axiosfb from "../../../axios-fb";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    console.log(this.props);

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
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
      this.props.history.push("/");
    });
  };

  render() {
    let form = (
      <form>
        <Input name="name" placeholder="Your Name" />
        <Input name="email" placeholder="Your E-mail" />
        <Input name="street" placeholder="Street of your Address" />
        <Input name="postal" placeholder="Your Postal Code" />

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if(this.state.loading)
        form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h1>Enter your contact data:</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
