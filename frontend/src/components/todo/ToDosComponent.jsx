import React, {Component} from 'react'
import moment from 'moment'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : [
                    //{id:1, description:"Learn React", done:false, targetDate: new Date()},
                    //{id:2, description:"Learn to dance", done:false, targetDate: new Date()},
                    //{id:3, description:"Become expert with React", done:false, targetDate: new Date()}
                ],
            message:null
        }
        this.deleteTodo = this.deleteTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }
    componentDidMount(){
        this.refreshTodos();
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate-->',nextProps,nextState)
        return true
    }
    componentWillUnmount(){
        console.log('componentWillUnAmount')
    }
    deleteTodo(id){
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username,id)
            .then(
                response => {
                    this.setState({message:`Deleted todo is ${id}`})
                    console.log('Todo deleted.. calling refreshTodo')
                    this.refreshTodos()
                }
            )
    }
    addTodo(){
        console.log('adding todo clicked')
        this.props.history.push(`/todos/-1`)
    }
    updateTodo(id){
        let username = AuthenticationService.getLoggedInUserName()
        console.log("Update -- "+id + " " + username);
        this.props.history.push(`/todos/${id}`)
        /*TodoDataService.deleteTodo(username,id)
            .then(
                response => {
                    this.setState({message:`Deleted todo is ${id}`})
                    console.log('Todo deleted.. calling refreshTodo')
                    this.refreshTodos()
                }
            )*/
    }
    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                                    this.setState({todos: response.data})
                                    console.log('Todos refreshed..', this.state.todos)
                            }
                )
    }
    render(){
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodo}>Create New Todo</button>
                </div><hr/>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>isCompleted</th>
                                <th>Target Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td>
                                            <button className="btn btn-warning" 
                                                    onClick={()=>this.deleteTodo(todo.id)}>Delete</button>&nbsp;
                                            <button className="btn btn-success" 
                                                    onClick={()=>this.updateTodo(todo.id)}>Update</button>
                                        </td>
                                    </tr>
                                )
                            }  
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TodosComponent