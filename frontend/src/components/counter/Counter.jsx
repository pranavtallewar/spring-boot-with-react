import React, { Component } from 'react';
import './Counter.css'
import PropTypes from 'prop-types'
//Class component
export default class Counter extends Component {

    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        //render = () => {
        //const style = {fontSize:"16px",padding: "15px 30px"}
        // {style}  
        return (
            <div className="counter">
              <h1>I am playing with React Components, State, Styles</h1>
              <CounterButton by = {1} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <CounterButton by = {5} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <CounterButton by = {10} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <span className="commonCount">{this.state.counter}</span>
              <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
          );
    }

    reset(){
        this.setState(
               {counter:0}
            );
    }
    // update state
    increment(by) {
        // Arrow function makes method working without binding in constructor
        //increment = () => {
        console.log(`incrementing from parent  - ${by}`);
        this.setState(
            (prevState) => {
                return {counter : prevState.counter + by}
            }
        );
    }
    decrement(by) {
        
        console.log(`decrementing from parent  - ${by}`);
        this.setState(
            (prevState) => {
                return {counter : prevState.counter - by}
            }
        );
    }
}

class CounterButton extends Component {

    //Define initial state in a constructor
    //constructor(){
    //    super();     
    //    this.increment = this.increment.bind(this);
    //    this.decrement = this.decrement.bind(this);
    //}
    render() {
    //render = () => {
    //const style = {fontSize:"16px",padding: "15px 30px"}
    // {style}  
    return (
        <div className="counterButton">
          <button onClick={() => this.props.incrementMethod(this.props.by)} >+{this.props.by}</button>
          <button onClick={() => this.props.decrementMethod(this.props.by)} >-{this.props.by}</button>
          {/*<span className="count">{this.state.counter}</span>*/}
        </div>
      );
    }
    // update state
    //increment() {
        // Arrow function makes method working without binding in constructor
        //increment = () => {
        // this.setState({
        //     counter : this.state.counter + this.props.by
        // });
    //    this.props.incrementMethod(this.props.by);
    //}
    //decrement() {
    //    this.props.decrementMethod(this.props.by);
    //}
    
  }

  Counter.defaultProps = {
        by : 1
  }

  Counter.propTypes = {
        by : PropTypes.number
  }
  
