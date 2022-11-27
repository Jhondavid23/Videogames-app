import React from "react";
import { Route, Switch } from "react-router-dom";
import Games from './components/Games/Games';
import Home from '../src/components/Home/Home.jsx';
import GameDetail from './components/GameCard/GameDetail';
import CreateForm from "./components/CreateVideogame/CreateForm";
import '../src/App.css'



function App() {
  return (
  <React.Fragment>
    <Switch>
      <Route exact path='/' >
        <Home/>
      </Route>
      <Route exact path='/games' render={()=> <Games/>}/>
      <Route exact path='/create' render={()=> <CreateForm/>}/>
      <Route exact path='/games/:id' component={GameDetail}/>
    </Switch>
    
  </React.Fragment>
  );
}

export default App;
