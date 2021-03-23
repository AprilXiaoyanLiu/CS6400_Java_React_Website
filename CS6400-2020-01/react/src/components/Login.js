import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import { Grid, MuiThemeProvider, Button } from '@material-ui/core';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            userrole: "",
            redirect: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        console.log(this.state.username)
        console.log(this.state.password)
    }


    handleSubmit(event){
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        const usernew = JSON.stringify(user);

        console.log('user test is,', user)
        

        


          fetch('http://localhost:8080/verifyUser', {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
            
          })
          .then(response => response.text() )
          .then(response => this.setState(
            { userrole: response },
            () => console.log(this.state)
          ))
          .catch( error => {
              console.log("login error", error)
          });

          console.log(this.state.userrole)



          

          console.log(this.state)


          console.log(this.state.username)
          console.log(this.state.userrole)

          if (this.state.userrole === '"ingie"'){
              console.this.log("This will be so happy!!!")
          }



         
          //this.renderRedirect()
         


   


        event.preventDefault();
    }


    renderRedirectCondition() {

        if ((this.state.userrole === '"unauthorized"') )
        {console.log("unauthorized")}
       // {alert("Unauthorized! Check your username or password!")}


        

        else if ((this.state.userrole === '"inge') ){
        console.log("now we see redirect")
        return <Redirect to ={{
            pathname:'/Home',
            state:{ username :this.state.userrole}
          }}
                />}


        else {
            console.log(this.state.userrole)
        }
        
        
    }



    renderRedirectInge = () => {
        const user = {
            username: this.state.username,
            userrole: this.state.userrole
        }
        if (this.state.redirect) {
            return <Redirect to ={{
                pathname: '/Home',
                state: user
             }} />
        }
    }


    renderRedirectEmployee = () => {
        const user = {
            username: this.state.username,
            userrole: this.state.userrole
        }
        if (this.state.redirect) {
            return <Redirect to ={{
                pathname: '/Home',
                state: user
             }} />
        }
    }


    
    renderRedirectVolunteer = () => {
        const user = {
            username: this.state.username,
            userrole: this.state.userrole
        }
        if (this.state.redirect) {
            return <Redirect to ={{
                pathname: '/Home',
                state: user
             }} />
        }
    }


    


    

    render(){


        console.log('check this ', this.state.userrole)


        this.setRedirect = () => {
            
           this.setState(
               {redirect: true}
             )
  
            
          }

        

        



        
        
        return (

            <>
            
           
            <div>

         
                <form onSubmit={this.handleSubmit}>
                    <input
                    type = "username"
                    name = "username"
                    placeholder="User Name"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    />

                    <input
                    type = "password"
                    name = "password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />

                    
                   
                    <button type="submit"   >Login</button>

                </form>
            </div>

            <div>
                {this.state.userrole == '"inge"' && <p>Welcome back {this.state.username}!</p>}
                {this.state.userrole == '"employee"' && <p>Welcome back {this.state.username}!</p>}
                {this.state.userrole == '"volunteer"' && <p>Welcome back {this.state.username}!</p>}
                {this.state.userrole == '"unauthorized"' && <p>Unauthorized! Check your username or password</p>}
            </div>



            <div>

            {this.renderRedirectInge()}
            {this.state.userrole == '"inge"'&&
            <Button onclick={this.setRedirect} variant="contained" color="primary" onClick={this.setRedirect}>
                                Take Me to Home Page
            </Button>
            }
            </div>



            <div>

            {this.renderRedirectEmployee()}
            {this.state.userrole == '"employee"'&&
            <Button onclick={this.setRedirect} variant="contained" color="primary" onClick={this.setRedirect}>
                                Take Me to Home Page
            </Button>
            }
            </div>


            <div>

                {this.renderRedirectVolunteer()}
                {this.state.userrole == '"volunteer"'&&
                <Button onclick={this.setRedirect} variant="contained" color="primary" onClick={this.setRedirect}>
                                    Take Me to Home Page
                </Button>
                }
                </div>

            </>
        )
    }
}

export default Login;