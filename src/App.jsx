import React, { Component } from "react";
import "./App.css";
import "./Person/Person.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Diego Morais", age: 35 },
      { name: "Camila Morais", age: 36 },
      { name: "Juliana Morais", age: 30 },
    ],
    newName: 'Informe um nome'
  };

  addAgeClickHandler = (evt) => {

    var newPersons = this.state.persons.map((el) => {
      el.age = ++el.age;
      return el;
    });

    this.setState({
      persons: newPersons
    });
  };

  newNameChangedHandler = (evt) => {
    this.setState({
      newName: evt.target.value
    }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.newNameChangedHandler} value={this.state.newName} />
        {this.state.persons.map((el, index) => 
          <Person key={index} name={el.name} age={el.age} click={this.addAgeClickHandler} />)}
      </div>
    );
  }
}

export default App;
