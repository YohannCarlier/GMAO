import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import { Outlet } from 'react-router-dom';
class App extends Component {
	render(){
		return(
				<div>
					<Outlet />
				</div>
		);
	}
};

export default App;
