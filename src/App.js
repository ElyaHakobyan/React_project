import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './ToDo'
import AboutUs from './navBar/AboutUs'
import ContactUs from './navBar/ContactUs'
import Home from './navBar/Home'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>

        <Link to="/">ToDo</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/home">Home</Link>

        <Switch>
          <Route exact path="/" component={ToDo}>
          </Route>
          <Route exact path="/" exact component={AboutUs}>
          <Redirect to="/about" />
          </Route>
          <Route exact path="/contact" component={ContactUs}>
          </Route>
          <Route exact path="/home" component={Home}>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
