import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, MuiThemeProvider, Button } from '@material-ui/core';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//TO-DO Change Breed to Multiple Value Selection
//Add surrender related information
// may need put vaccinations in a seperate section 
//add date 
//add some form condition, error handling and etc. 



class AddAdoptionApplication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        applicant_first_name: null,
        applicant_last_name: null,
        coapplicant_first_name: null,
        coapplicant_last_name: null,
        street: null,
        city: null,
        state: null,
        zipcode: null,
        phone_number: null,
        application_date: null,
        status: 2
      };
      this.onSubmit = this.onSubmit.bind(this)
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }

    makeStyles = (theme) => {
        return {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(5),
          width: '60ch',
        }
      }}

     

      onSubmit = e => {
        e.preventDefault();
        
        //this.props.onSubmit(this.state);
        alert("clicked!")
          // clear form
        
      };

    //  submitAnimalInfo(event) {
    //      event.preventDefault;
    //      let animalinfo = {

    //      }

    //      fetch( ,{
    //          method: "Post",
    //          headers = 
    //      })
    //  }

    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
          applicant_first_name: this.state.applicant_first_name,
          applicant_last_name: this.state.applicant_last_name,
          coapplicant_first_name: this.state.coapplicant_first_name,
          coapplicant_last_name: this.state.coapplicant_last_name,
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          phone_number: this.state.phone_number,
          application_date: this.state.application_date,
          status: 3
        };





            fetch("http://localhost:8080/applicantInformation", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user)
            })
    }

    render() {
        const spec = this.state.species;
        this.handleChange = (event) => {
            this.setState({ spec: event.target.value });
          };

        const species = this.props.species
        const classes = makeStyles()
        
      return (
        <div >
            <h3>Enter Application Information</h3>

            <form onSubmit={this.handleSubmit}>
            <div>
                <div>
                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Applicant First Name"
                        defaultValue=""
                        variant="filled"
                        name="applicant_first_name"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>
                <div>
                
                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Applicant Last Name"
                        defaultValue=""
                        variant="filled"
                        name="applicant_last_name"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>

                <div>
                
                <TextField
                        
                        id="filled-helperText"
                        label="Co-applicant First Name"
                        defaultValue=""
                        variant="filled"
                        name="coapplicant_first_name"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>

                <div>
                <TextField
                       
                        id="filled-helperText"
                        label="Co-applicant Last Name"
                        defaultValue=""
                        variant="filled"
                        name="coapplicant_last_name"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>

                <div>
                <p>Address:</p>

                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Street"
                        defaultValue=""
                        variant="filled"
                        name="street"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />

                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="City"
                        defaultValue=""
                        variant="filled"
                        name="city"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />

                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="State"
                        defaultValue=""
                        variant="filled"
                        name="state"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />

                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        type="number"
                        label="ZipCode"
                        defaultValue=""
                        variant="filled"
                        name="zipcode"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />        
                </div>

                

                    <div>

                    <TextField
                    required id="standard-required"
                    id="filled-helperText"
                    label="Phone Number"
                    defaultValue=""
                    variant="filled"
                    name="phone_number"
                    margin="dense"
                    onChange={this.myChangeHandler}
                    />
                    </div>

                    <div>

                    <TextField
                    required id="standard-required"
                    id="filled-helperText"
                    label="Email Address"
                    defaultValue=""
                    variant="filled"
                    name="email_address"
                    margin="dense"
                    onChange={this.myChangeHandler}
                    />
                    </div>

                    <div>
                <form  noValidate>
                <TextField
                    id="date"
                    label="Date of Application"
                    name="application_date"
                    type="date"
                    onChange={this.myChangeHandler}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </form>

              </div>

                    

            



                    <div>
                <button type="submit" class="block" width="30%">Submit</button>
                </div>
      <div>
          
      </div>
      </div>
      </form>
      </div>
      
      
      
      );
    }
}



  export default AddAdoptionApplication;