import axios from 'axios'
class HelloWorldService {
    executeHelloWorldService(){
        return axios.get('http://localhost:8080/');
    }
    executeHelloWorldServiceBean(){
        return axios.get('http://localhost:8080/hello');
    }
    executeHelloWorldServiceBeanByName(name){
        return axios.get(`http://localhost:8080/hello/${name}`);
    }
}

export default new HelloWorldService()