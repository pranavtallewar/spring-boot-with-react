import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : "pranav",
            password : '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.loginClicked= this.loginClicked.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container"></div>
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {/*<ShowLoginSuccess showSuccessMsg={this.state.showSuccessMsg}/> */}
                {this.state.showSuccessMsg && <div>Login Successful</div>}
                Username: <input type="username" name="username" value= {this.state.username} onChange = {this.handleChange}/>
                Password: <input type="password" name="password" value= {this.state.password} onChange = {this.handleChange}/>
                <button className="btn btn" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
    handleChange(event){
        //console.log(this.state)
        this.setState ({
            [event.target.name] : event.target.value
        })
    }
    loginClicked(){
        //Basic Authentication purpose
        /*AuthenticationService
        .executeBasicAuthenticationCheck(this.state.username,this.state.password)
            .then(() => {
                    AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
                    this.props.history.push(`/welcome/${this.state.username}`)        
                })
            .catch(() => {
                this.setState({showSuccessMsg:false})
                this.setState({hasLoginFailed:true})
            })*/

        // For JWT Authentication
        AuthenticationService
        .executeJwtAuthenticationCheck(this.state.username,this.state.password)
            .then((response) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                    this.props.history.push(`/welcome/${this.state.username}`)        
                })
            .catch(() => {
                this.setState({showSuccessMsg:false})
                this.setState({hasLoginFailed:true})
            })
    }
}

export default LoginComponent