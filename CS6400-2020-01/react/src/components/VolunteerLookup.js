//table: prompt to look up an approved adopter
//have a search dialog to search part of both the applicant last name and co-applicant last name
//include all contact information
// can choose adopter, the user then propmted to enter the adoption date and adoption fee and then submit the adoption into the database



import React, {Component} from 'react';

import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router';
import TextField from '@material-ui/core/TextField';


//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation,
// conditional editable information: this is finished, now think whether need do breed

class VolunteerLookup extends Component {
    constructor(props){

    super(props);

    this.state = {

        //report:[]
        volunteer:[],
      //     {
      //       "first_name" : "John",
      //       "last_name": "Smith",
      //       "email_address": "John@gmail.com",
      //       "phone": '1242377292'
      //     },
      //     {
      //       "first_name" : "Lucy",
      //       "last_name": "Green",
      //       "email_address": "LG@gmail.com",
      //       "phone": '2452377292'
      //     }
      // ],
      selected_first_name:"",
      selected_last_name:"",

        spec: "",

          columns: [
            { title: 'First Name',
            field: 'first_name',

            editable: 'onAdd'},

            {
              title: 'Last Name',
              field: 'last_name',

              editable: 'onAdd'
            },
            {
              title: 'Email',
              field: 'email_address',
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Phone Number',
              field: 'phone',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            }

          ]

        };


        };

        //componentDidMount() {
        //    fetch('http://localhost:8080/animal')
        //    .then(response => response.json())
        //    .then(data => this.setState({animal: data}))}
        // componentDidMount(){
        //     axios.get('https://my-json-server.typicode.com/neojohny/demo/adoption' )
        //         .then(res => {
        //             this.setState({volunteer: res.data})
        //
        //         })
        // }
        handleSubmit = event => {
                    event.preventDefault();

                    const adoption_record = {
                      first_name: this.state.selected_first_name?this.state.selected_first_name:"",
                      last_name: this.state.selected_last_name?this.state.selected_last_name:""



                    };
                    console.log(adoption_record)
                    //post request


                        // fetch('https://my-json-server.typicode.com/neojohny/demo/volunteerLookUp')
                        //          .then(response => response.json())
                        //          .then(data => this.setState({volunteer: data},() => console.log(this.state)))
                        //          .catch( error => {
                        //              console.log("login error", error)
                        //          });
                                   fetch(
                                   'http://localhost:8080/volunteerLookUp', {
                                   method: "POST",
                                   headers: {
                                     "content-type": "application/json",
                                   },
                                   body: JSON.stringify(adoption_record),

                                 })
                                 .then(response => response.json() )
                                 .then(response => this.setState(
                                   { volunteer: response },
                                   () => console.log(this.state)
                                 ))
                                 .catch( error => {
                                     console.log("login error", error)
                                 });
                       };
        myChangeHandler = (event) => {
                        let nam = event.target.name;
                        let val = event.target.value;

                        this.setState({[nam]: val});
                      };

    render() {
        //const [sp, setSpecies] = React.useState('');


        //const handleChange = (event) => {
         //   setSpecies(event.target.value);
        //};
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };









        return (


          <>
        <form onSubmit={this.handleSubmit}>

        <div>

        <TextField
                id="standard-required"
                id="filled-helperText"
                label="First Name"
                defaultValue=""
                //variant="filled"
                name="selected_first_name"
                margin="dense"
                style = {{width: 150}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.myChangeHandler}
        />
        <TextField
                id="standard-required"
                id="filled-helperText"
                label="Last Name"
                defaultValue=""
                //variant="filled"
                name="selected_last_name"
                margin="dense"
                style = {{width: 150}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.myChangeHandler}
        />



<button type="submit" class="block" width="100%">Submit</button>

        </div>
        </form>
          <div>





              <MaterialTable
                  icons={tableIcons}
                  title="Volunteer Lookup "
                  columns={this.state.columns}
                  data={this.state.volunteer}
                  options = {{
                      filtering:true
                  }}


              />

          </div>
          </>

        );
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(5),
      },
    },
  }));




export default VolunteerLookup;
