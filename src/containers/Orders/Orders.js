import React, { Component } from "react";
import axios from "../../axios-fb";

import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {

        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });  
        }
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = <p>No order to show.</p>;

    if (this.state.orders.length) 
        orders = this.state.orders.map((order) => (
            <Order key={order.id} ingredients={order.ingredients} price={+order.totalPrice} />));

    if (this.state.loading) orders = <Spinner />;

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
