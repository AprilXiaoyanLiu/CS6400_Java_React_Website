import React, { Component } from 'react';
import {  Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';


class AddVaccination extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
      showForm: false,
      vaccine:[],
      new_vaccine: null,
      new_vaccine_date: null,
      new_vaccine_expire_date: null,
      vaccination_number: null,
      user_name: null,
      page: window.location.href,
      
      animalexcludevac: [
        
        {"id": 2,
        "pet_id": 2,
        "vaccine": ["Feline Chlamydia"]
        }
  
  
      ],
    };

    
    
    this.showMenu = this.showMenu.bind(this);

   
    
  }


  componentDidMount(){
    axios.get('http://localhost:8080/vaccineSpecies' )
        .then(res => {
            this.setState({vaccine: res.data})

        })
}


 

  //      axios.get('http://localhost:8080/animalVaccine')
   //     .then(res => {
    //      console.log(res.data)
     //     this.setState({animalvac:res.data})
     // })};



  

   

  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: true,
    });
  }



  myChangeHandler = (event) => {
    //this.setState({exclude: })
    let nam = event.target.name;
    //const vaccbypetid = this.props.vaccbypetid
    //console.log(nam)
    let val = event.target.value;
  //  const exclude = this.props.VaccExcludeById;
    //const excludev = this.state.animalexcludevac.vaccine
  //  console.log(exclude);
    //console.log(excludev);
   
  // if (nam == "new_vaccine" && exclude.includes(val)){
  //    alert("Already exists!  Cannot add this Vaccine!")
   // } else{this.setState({[nam]: val});};

   this.setState({[nam]: val});
    
  }

 


  handleSubmit = event => {
    event.preventDefault();
    
    const new_ani_vac = {
        pet_id: this.props.ani_for_vac,
        vaccine_type: this.state.new_vaccine,
        username: (this.state.user_name === this.state.user_name || this.state.user_name === "")?this.state.user_name: "nottracked",
        date_administered: this.state.new_vaccine_date,
        expiration_date: this.state.new_vaccine_expire_date,
        vaccination_number: (this.state.vaccination_number === this.state.vaccination_number || this.state.vaccination_number === "")?parseInt(this.state.vaccination_number):"blank",
            

    };

    //post request


    console.log("this is data to post:", new_ani_vac)

   // axios.post('http://localhost:8080/animalVaccine', {new_ani_vac})
   //     .then(res => {
   //         console.log(res)
   //         console.log(res.data);
   //     })


        fetch("http://localhost:8080/animalVaccine", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(new_ani_vac)
        })
        .then(response => response.json())
        .then(response => console.log(response))
}



 

  render() {

    const species = this.props.pet_spe
    const available_vaccine = this.state.available_vaccine
    console.log(available_vaccine)
    //const ex = this.props.VaccExcludeById
    //const exe = ex.vaccine

    const filterDropdown = this.state.vaccine.filter(function(result) {

        
        return result.species === species ;
      });
    return (
      <div>
        

        <Button  variant="contained" color="primary" onClick={this.showMenu}>
                                Add Vaccination
        </Button>

        <div>
        
        {
          this.state.showMenu
            ? (
              <form onSubmit={this.handleSubmit}>
                
                <div>
                <FormControl required >
                <InputLabel id="demo-simple-select-label">Vaccine</InputLabel>
                
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="new_vaccine"
                    onChange={this.myChangeHandler}
                    onClick={this.showForm}
                    label="Vaccine"
                >
                
                {this.state.vaccine.map(spe => (
                <MenuItem value= {spe.vaccine_type} key={spe.vaccine_type}> {spe.vaccine_type} </MenuItem>))}
                
                </Select>
            
            
                
             <form  noValidate>
                <TextField
                    required
                    id="date"
                    label="Vaccination Date"
                    type="date"
                    name="new_vaccine_date"
                    onChange={this.myChangeHandler}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>

            <form  noValidate>
                <TextField
                    required
                    id="date"
                    label="Next Dose Date"
                    type="date"
                    name = "new_vaccine_expire_date"
                    onChange = {this.myChangeHandler}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>

       
            <form  noValidate>
                <TextField
                    id="date"
                    type="number"
                    label="Vaccination Number (optional)"
                    name = "vaccination_number"
                    onChange = {this.myChangeHandler}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
            </FormControl>
            </div>

            <div>
                <button type="submit" class="block" width="30%">Submit</button>
            </div>
            </form>
        
            )
            : (
              null
            )
        }
 </div>
      </div>




         
    );
  }
}

export default AddVaccination;