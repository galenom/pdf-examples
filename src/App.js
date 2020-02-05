import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { FileSaver } from './FileSaver';
import { ReactPDF } from './ReactPDF';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Routes/> 
    </div>
  );
}

const Nav = () => (
  <nav>
    <NavLink to='/file-saver' activeClassName='selected'>File Saver</NavLink>
    <NavLink to='/react-pdf' activeClassName='selected'>React PDF</NavLink>
  </nav>
)
const Routes = () => (
  <Router>
    <Nav />
    <Switch>
      <Route path={['/','/file-saver']} exact>
        <FileSaver />
      </Route>
      <Route path='/react-pdf'>
        <ReactPDF />
      </Route>
    </Switch>
  </Router>
)

export default App;
