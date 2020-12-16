import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import TodosComponent from './ToDosComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
import UpdateTodoComponent from './UpdateTodoComponent'

class ToDoApp extends Component {
    render(){
        return (
            <div className="ToDoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}></Route>
                            <Route path="/login" component={LoginComponent}></Route>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={UpdateTodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={TodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}
export default ToDoApp