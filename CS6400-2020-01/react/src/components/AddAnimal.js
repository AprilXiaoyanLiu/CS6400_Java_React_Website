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



class AddAnimal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pet_name: "",
        sex: "",
        age: null,
        alteration_status: "",
        descriptions: "",
        microchipId: null,
        species: "",
        value: [],
        adoption_status: "",
        surrender_reason: "",
        surrender_date: "",
        surrender_by_animal_control: "",
        breed_species: [],
        vaccine:[],
        new_vaccine_type: null,
        new_vaccine_date: null,
        new_vaccine_expire_date: null,
        vaccination_number: null
      };
      this.onSubmit = this.onSubmit.bind(this)
     

    }

    

    componentDidMount(){
      //axios.get('https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/animal' )

      axios.get('http://localhost:8080/breed')

          .then(res => {
              this.setState({breed_species: res.data})

          })


            axios.get('http://localhost:8080/vaccineSpecies' )
                .then(res => {
                    this.setState({vaccine: res.data})

                })

              }



    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
      console.log(nam);
      console.log(val)
    }

    handleChangeMultiple = (event) => {
      //const {options} = event.target
      var options = event.target.options
      console.log(options)
      let nam = event.target.name;
      let val = event.target.value;
      console.log(nam)
      let value_array = []
      value_array.push(val)



     // let val = []
     // for (let i=0, l = options.length; i<1; i+=1 ){
     //   if (options[i].selected){
     //     val.push(options[i].value);
    //    }
    //  }

      console.log("check this")
      console.log(value_array)


      this.setState({breed:value_array});
      console.log(this.state.breed)
    }



    handleChange2 = (e) => {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      console.log(value);
      this.setState({value: value});
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

        const animal_table = {
            pet_name: this.state.pet_name,

            sex: this.state.sex,
            age: this.state.age,
            alteration_status: this.state.alteration_status,
            descriptions: this.state.descriptions,
            microchipId: this.microchipId


        };

       //todo- how to insert animal breed table and


    const animalInfowithVaccine_table = {
      pet_name: this.state.pet_name,

      sex: this.state.sex,
      age: parseInt(this.state.age),
      alteration_status: this.state.alteration_status,
      descriptions: this.state.descriptions,
      microchipId: (this.state.microchipId === this.state.microchipId||this.state.microchipId==="")?this.state.microchipId: "blank",
      species: this.state.species,
      breed: this.state.value,
      adoption_status: "pending",
      surrender_reason: this.state.surrender_reason,
      surrender_date: this.state.surrender_date,
      surrender_by_animal_control: this.state.surrender_by_animal_control,
      vaccine_type: this.state.new_vaccine_type ,
      date_administered: (this.state.new_vaccine_date === this.state.new_vaccine_date || this.state.new_vaccine_date==="") ? this.state.new_vaccine_date: "blank",
      expiration_date: (this.state.new_vaccine_expire_date === this.state.new_vaccine_expire_date || this.state.new_vaccine_expire_date==="")? this.state.new_vaccine_expire_date: "blank",
      vaccination_number: (this.state.vaccination_number === this.state.vaccination_number || this.state.vaccination_number === "" )? parseInt(this.state.vaccination_number):  "blank"


     

  }
   console.log("check this now", animalInfowithVaccine_table)


        //post request

   //     axios.post('http://localhost:8080/animalAllinfo', {animalInfo_table})
    //        .then(res => {
     //           console.log(res)
     //           console.log(res.data);

     //       })

    //    axios.post('http://localhost:8080/animalbase', {animal_table})
    //    .then(res => {
    //        console.log(res)
    //        console.log(res.data);

    //    })
    fetch("http://localhost:8080/animalAllInfoWithVaccination", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(animalInfowithVaccine_table)
    })
   // .then(response => response.json())
   // .then(response => console.log(response));


  //  axios.post('http://localhost:8080/animalAllInfoWithVaccination', {animalInfowithVaccine_table})
  //  .then(res => {
  //      console.log(res)
  //      console.log(res.data);
   // })


    }





    render() {
        const spec = this.state.species;
        const breed_sp = this.state.breed_species;
        const vaccine = this.state.vaccine;


        const species = this.props.species
        const classes = makeStyles()

        const filteredBreed = breed_sp.filter(function(result) {
          return result.species === spec;
        });

        const filteredVaccine = vaccine.filter(function(result) {
          return result.species === spec;

        });


        console.log("check filtered Vaccine", filteredVaccine)

      return (
        <div className={classes.root}  method="POST">
            <h3>Enter Animal Information</h3>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>

                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Pet Name"
                        defaultValue=""
                        variant="filled"
                        name="pet_name"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>
                <div>

                <TextField
                        required id="standard-required"
                        id="standard-number"
                        type="number"
                        label="Age (Months)"
                        defaultValue=""
                        variant="filled"
                        name="age"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>


                <div>

                <FormControl required >
                <InputLabel id="demo-simple-select-label">Species</InputLabel>

                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="species"
                    onChange={this.myChangeHandler}
                    label="Species"
                >

                {species.map(spe => (
                <MenuItem value= {spe.species} key={spe.id}> {spe.species} </MenuItem>))}

                </Select>
            </FormControl>
            </div>

            <div>
              <p>Breed:</p>
            <label>
              <select width="200px" multiple={true} value={this.state.value} onChange={this.handleChange2} required >

                {filteredBreed.map(breed => (
                <option value= {breed.breed} key={breed.breed}> {breed.breed} </option>))}
              </select>
            </label>
            </div>


            <div>
            <FormControl required >
                <InputLabel id="demo-simple-select-label">Sex</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="sex"
                    onChange={this.myChangeHandler}
                    label="Sex"
                >


                <MenuItem value= "female"> female </MenuItem>
                <MenuItem value= "male"> male </MenuItem>

                <MenuItem value= "unknown"> unknown </MenuItem>

                </Select>
            </FormControl>
            </div>

            <div>
            <FormControl required >
                <InputLabel id="demo-simple-select-label">Alteration Status</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="alteration_status"
                    onChange={this.myChangeHandler}
                    label="Alteration Status"
                >



                <MenuItem value= "neutered"> neutered </MenuItem>
                <MenuItem value= "unaltered"> unaltered </MenuItem>


                </Select>
            </FormControl>
            </div>

                <div>
                <TextField
                        id="filled-helperText"
                        label="Microchip Id"
                        defaultValue="Blank"
                        variant="filled"
                        name="microchipId"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>

                <div>
                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Descriptions"
                        defaultValue="Descriptions"
                        variant="filled"
                        name="descriptions"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
}
                </div>

              <div>
                <form  noValidate>
                <TextField
                    required id="standard-required"
                    id="date"
                    label="Surrender Date"
                    name="surrender_date"
                    type="date"
                    onChange={this.myChangeHandler}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </form>

              </div>

              <div>
                <TextField
                        required id="standard-required"
                        id="filled-helperText"
                        label="Surrender Reason"
                        defaultValue=""
                        variant="filled"
                        name="surrender_reason"
                        margin="dense"
                        onChange={this.myChangeHandler}
                />
                </div>

                <div>

              <FormControl required >
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <p>Surrender by Animal Control:</p>
                  <Select
                      minWidth="120"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="surrender_by_animal_control"
                      onChange={this.myChangeHandler}
                      label="Surrender by Animal Control"
                  >


                  <MenuItem value= "0"> Yes </MenuItem>
                  <MenuItem value= "1"> No </MenuItem>


                  </Select>
              </FormControl>
            </div>

            <div><h4>Vaccination Information</h4></div>

            <div>
                <FormControl required >
                <InputLabel id="demo-simple-select-label">Vaccine</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="new_vaccine_type"
                    onChange={this.myChangeHandler}
                    onClick={this.showForm}
                    label="Vaccine"
                >

                {filteredVaccine.map(spe => (
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
                    label="Vaccination Number (optional)"
                    name = "vaccination_number"
                    type="number"
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

      </div>


      </div>



      );
    }
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

  export default AddAnimal;
