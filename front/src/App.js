import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './components/Main';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route>
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
