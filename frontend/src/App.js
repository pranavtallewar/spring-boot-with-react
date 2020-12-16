import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './components/learning-examples/FirstComponent'
import SecondComponent from './components/learning-examples/SecondComponent'
import ThirdComponent from './components/learning-examples/ThirdComonent'
import Counter from './components/counter/Counter';

import ToDoApp from './components/todo/ToDoApp';
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <ToDoApp/>
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="learningComponents">
        My World of React
        <FirstComponent/>
        <SecondComponent/>
        <ThirdComponent/>
      </div>
    );
  }
}


// Initialize component with property val passed 
class CounterComponents extends Component {
  render() {
    return (
      <div className="App">
        <Counter by={1}/>
        <Counter by={5}/>
        <Counter by={10}/>
      </div>
    );
  }
}
export default App;
