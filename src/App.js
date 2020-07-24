import React, { Component } from 'react';
import styled from 'styled-components';

import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black;
    }
`;

class App extends Component {
  state = {
    persons: [
      {id:'asd1', name: 'Tywin', age: 28 },
      {id:'asd2', name: 'Cersei', age: 29 },
      {id:'asd3', name: 'Tyrion', age: 26 },
    ],
    otherState: 'the bastard',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green', 
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }


let persons = null;

let dispVariable = 'Toggle Persons'

if (this.state.showPersons) {
  persons = (
    <div>
      {this.state.persons.map((person, index) => {
        return <Person 
          click={() => this.deletePersonHandler(index)}
          name={person.name} 
          age={person.age}
          key={person.id}
          changed={(event) => this.nameChangedHandler(event, person.id)} 
          />
      })}
    </div>
  )
  dispVariable = 'Hide Persons'
  // style.backgroundColor = 'red';
  // style[':hover'] = {
  //   backgroundColor: 'lightred',
  //   color: 'black'
  // }
}

const classes = [];
if (this.state.persons.length <= 2){
  classes.push('red'); //classes = ['red']
}
if (this.state.persons.length <= 1){
  classes.push('bold'); //classes = ['red', bold']
}

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton alt={this.state.showPersons} 
          onClick={this.togglePersonsHandler}>Toggle Persons
          </StyledButton>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
