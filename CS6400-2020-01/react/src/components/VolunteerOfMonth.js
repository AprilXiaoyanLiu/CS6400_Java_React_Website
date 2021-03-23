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
import MenuItem from '@material-ui/core/MenuItem';


//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation,
// conditional editable information: this is finished, now think whether need do breed

class VolunteerOfMonth extends Component {
    constructor(props){

    super(props);

    this.state = {

        //application:[]
        //  [
        //     {
        //     "application_number":  1,
        //     'applicant_first_name': 'John',
        //     'applicant_last_name':  'Zhao',
        //     'coapplicant_first_name': null,
        //      'coapplicant_last_name':  null,
        //     'street': '8208 132 Ave',
        //      'city':  'SAN FRANCISCO',
        //     'state': 'CA',
        //     'zipcode': 94105,
        //     'phone_number': '405-123-5678',
        //     'application_date' :'2020-01-05 12:01:01',
        //     'status': 3},
        //     {
        //         'application_number':  2,
        //         'applicant_first_name': 'Emma',
        //         'applicant_last_name':  'Li',
        //         'coapplicant_first_name': 'May',
        //          'coapplicant_last_name':  'Jones',
        //         'street': '782 12 st',
        //          'city':  'SEATTLE',
        //         'state': 'WA',
        //         'zipcode': 98105,
        //         'phone_number': '206-123-5678',
        //         'application_date' :'2019-02-05 12:01:01',
        //         'status': 1}
        //
        //
        // ]
        //volunteer:[]
        volunteer:[
          {
            "year": 2019,
            "month" : 12,
            "first_name": "Jack",
            "last_name": "Ma",
            "email_address": "a1@3e3.com",
            "hours": 20
          },
          {
            "year" : 2020,
            "month" : 2,
            "first_name": "Jack",
            "last_name": "Longdon",
            "email_address": "a1b@3e3.com",
            "hours": 15
          }
      ],
      volunteerback:[],
        selected_month:"",
        selected_year:"",
        spec: "",

          columns: [
          //   { title: 'Year',
          //   field: 'year',
          //   lookup:{2020:"2020",2019:"2019",2018:"2018"},
          //   filtering: true,
          //   editable: 'onAdd'},
          //   { title: 'Month',
          //   field: 'month',
          //   lookup:{12: "December", 11:"November", 3:"March",4:"April",
          //   2:"Feburary",1:"Janurary",5:"May",6:"June",7:"July",8:"August",
          // 9:"September",10:"October"},
          //   filtering: true,
          //   editable: 'onAdd'},

            { title: 'First Name', field: 'first_name' , filtering: false,
            editable: 'onAdd'//, render: rowData => <a href={'/AnimalDetail/' + rowData.id}> {rowData.pet_name} </a>
            },
            { title: 'Last Name',
            field: 'last_name',
            //lookup:{1: "female", 2:"male", 3:"Unknown"},
            filtering: false,
            editable: 'onAdd'},
            {
              title: 'Email',
              field: 'email_address',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Total Hours',
              field: 'total_hours',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            }

          ]

        };
    this.newstate = {
      volunteerback:[],
        // {
        //   "year": 2019,
        //   "month" : 12,
        //   "first_name": "Jack",
        //   "last_name": "Ma",
        //   "email_address": "a1@3e3.com",
        //   "hours": 20
        // }],
        columns: [
        //   { title: 'Year',
        //   field: 'year',
        //   lookup:{2020:"2020",2019:"2019",2018:"2018"},
        //   filtering: true,
        //   editable: 'onAdd'},
        //   { title: 'Month',
        //   field: 'month',
        //   lookup:{12: "December", 11:"November", 3:"March",4:"April",
        //   2:"Feburary",1:"Janurary",5:"May",6:"June",7:"July",8:"August",
        // 9:"September",10:"October"},
        //   filtering: true,
        //   editable: 'onAdd'},

          { title: 'First Name', field: 'first_name' , filtering: false,
          editable: 'onAdd'//, render: rowData => <a href={'/AnimalDetail/' + rowData.id}> {rowData.pet_name} </a>
          },
          { title: 'Last Name',
          field: 'last_name',
          //lookup:{1: "female", 2:"male", 3:"Unknown"},
          filtering: false,
          editable: 'onAdd'},
          {
            title: 'Email',
            field: 'email_address',
            //lookup: {1: 'not adopted', 2:'adopted'},
            filtering: false,
            editable: 'onAdd'
          },
          {
            title: 'Total Hours',
            field: 'total_hours',
            //lookup: {1: 'not adopted', 2:'adopted'},
            filtering: false,
            editable: 'onAdd'
          }

        ]
    }

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
                    selected_month: this.state.selected_month,
                    selected_year: this.state.selected_year,



                };
                console.log(adoption_record)
                //post request

                // axios.post('https://my-json-server.typicode.com/neojohny/demo/aa', {adoption_record})
                //     .then(res => {
                //         console.log(res)
                //         console.log(res.data);
                //     })
            // fetch('https://my-json-server.typicode.com/neojohny/demo/volunteerMonth')
            //          .then(response => response.json())
            //          .then(data => this.setState({volunteerback: data},() => console.log(this.newstate)))
            //          .catch( error => {
            //              console.log("login error", error)
            //          });
            fetch(
            'http://localhost:8080/volunteerOfMonth', {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(adoption_record),

          })
          .then(response => response.json() )
          .then(response => this.setState(
            { volunteerback: response },
            () => console.log(this.state)
          ))
          .catch( error => {
              console.log("login error", error)
          });

            }
    myChangeHandler = (event) => {
                    let nam = event.target.name;
                    let val = event.target.value;

                    this.setState({[nam]: val});
                  }
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
            required id="standard-select-currency-native"
            select
            label="Month"
            //value={rowData.application_number}
            onChange={this.myChangeHandler}

            name="selected_month"
            margin="dense"
            style = {{width: 150}}
            InputLabelProps={{
            shrink: true,
            }}

          >
          <MenuItem value= {12}> December </MenuItem>
          <MenuItem value= {11}> November </MenuItem>
          <MenuItem value= {10}> October </MenuItem>
          <MenuItem value= {9}> September </MenuItem>
          <MenuItem value= {8}> August </MenuItem>
          <MenuItem value= {7}> July </MenuItem>
          <MenuItem value= {6}> June </MenuItem>
          <MenuItem value= {5}> May </MenuItem>
          <MenuItem value= {4}> April </MenuItem>
          <MenuItem value= {3}> March </MenuItem>
          <MenuItem value= {2}> December </MenuItem>
          <MenuItem value= {1}> December </MenuItem>


          </TextField>
          <TextField
                  required id="standard-required"
                  id="filled-helperText"
                  label="Year"
                  defaultValue=""
                  //variant="filled"
                  name="selected_year"
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
                    title="Volunteer Of Month"
                    columns={this.state.columns}
                    data={this.state.volunteerback}
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




export default VolunteerOfMonth;
