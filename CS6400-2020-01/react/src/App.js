import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from  'react-router-dom';

import ReactDOM from "react-dom"

import './App.css';

import Header from './layout/Header';
import AddAnimal from './components/AddAnimal';
import axios from 'axios';
import AnimalDashboard from './components/AnimalDashboard';
import AnimalDetail from './components/AnimalDetail';
import AddAdoptionApplication from './components/AddAdoptionApplication';
import Adoption from './components/Adoption';
import AnimalControl from './components/AnimalControl'
import VolunteerOfMonth from './components/VolunteerOfMonth'
import MonthlyAdoptionReport from './components/MonthlyAdoptionReport'
import VolunteerLookup from './components/VolunteerLookup'
import VaccineReminder from './components/VaccineReminder'
import AdoptionAppReview from './components/AdoptionAppReview'

import Test from './Test';
import Login from './components/Login'



class App extends Component {
    state = {

        species: []

          }
        componentDidMount(){
            axios.get('https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/species')
                .then(res => {
                    this.setState({species: res.data})

                })
        }
    render() {


        return (
            <Router>
            <div className="App">
                <div className = "container">
                    <Header />

               
                <Route exact path="/" component={Login} />


                <Route exact path="/Home" render={props => (
                    <React.Fragment>
                        <AnimalDashboard species={this.state.species} animaldash={this.state.animal}/>
                    </React.Fragment>
                )} />

                <Route exact path="/AddAnimal" render={props => (
                    <React.Fragment>
                        <AddAnimal species={this.state.species}/>
                    </React.Fragment>
                )} />

                <Route exact path="/AnimalDetail/:id" render={props => (
                    <React.Fragment>
                        <AnimalDetail test={this.state.animal}/>
                    </React.Fragment>
                )} />


                <Route exact path="/AddAdoption" component={AddAdoptionApplication} />
                <Route  path="/Adoption" component={Adoption} />

                <Route exact path="/AnimalControl" component={AnimalControl} />
                <Route exact path="/VolunteerOfMonth" component={VolunteerOfMonth} />
                <Route exact path="/MonthlyAdoptionReport" component={MonthlyAdoptionReport} />
                <Route exact path="/VolunteerLookup" component={VolunteerLookup} />
                <Route exact path="/VaccineReminder" component={VaccineReminder} />
                <Route exact path="/AdoptionAppReview" component={AdoptionAppReview} />




            </div>

            </div>
            </Router>

        );
    }
}

export default App;
