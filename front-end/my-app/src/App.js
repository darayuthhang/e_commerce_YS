// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Register from './components/register/register';
import Login from './components/login/login';
import './App.css';
function App() {
  return (
    <div className="App">
     
    <Router>
        <Switch>
          
           <Route
            exact path='/'
            component={Home}/>
            <Route  path="/register" component={Register}/>   
            <Route  path="/login" component={Login}/>   
        </Switch>
    </Router>
    </div>
  );
}

export default App;
