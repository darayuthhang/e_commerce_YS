// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Register from './components/register/register';
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
        </Switch>
    </Router>
    </div>
  );
}

export default App;
