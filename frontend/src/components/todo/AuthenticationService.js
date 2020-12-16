
import axios from 'axios'
import {API_URL} from '../../Constants'
export const USER_SESSION_ATTR_NAME = 'authenticateUser'
class AuthenticationService {

    registerSuccessfulLogin(username,password) {
        let basicAuthHeader = this.createBasicAuthToken(username,password)
        sessionStorage.setItem(USER_SESSION_ATTR_NAME,username);
        this.setUpAxiosInterceptors(basicAuthHeader)
    }
    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_SESSION_ATTR_NAME, username)
        //console.log('User set for JWT Authentication')
        this.setUpAxiosInterceptors(this.createJwtToken(token))
        //console.log('Axios interceptor set')
    }
    logout(){
        sessionStorage.removeItem(USER_SESSION_ATTR_NAME);
    }
    isUserLoggedIn(){
        //console.log('checking if user logged in')
        let user= sessionStorage.getItem(USER_SESSION_ATTR_NAME);
        //console.log('user=',user)
        if(user === null) 
            return false
        
        return true
    }
    getLoggedInUserName(){
        let user= sessionStorage.getItem(USER_SESSION_ATTR_NAME);
        if(user === null) 
            return ''
        
        return user
    }
    setUpAxiosInterceptors(headerOrToken) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = headerOrToken
                }
                return config
            }
        )
    }
    executeBasicAuthenticationCheck(username, password){
        return axios.get(`${API_URL}/basicauth`,{headers:{authorization: this.createBasicAuthToken(username,password)}})
    }
    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(`${username}:${password}`)
    }
    createJwtToken(token) {
        return 'Bearer ' + token
    }
    executeJwtAuthenticationCheck(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }
}
export default new AuthenticationService()