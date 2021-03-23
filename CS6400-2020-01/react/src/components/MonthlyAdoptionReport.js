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

class MonthlyAdoptionReport extends Component {
    constructor(props){

    super(props);

    this.state = {

        //report:[]
        report:[
          {
            "month" : 12,
            "species": 1,
            "breed": "Afghan Hound",
            "surrender": 1,
            "adoption": 0
          },
          {
            "month" : 4,
            "species": 2,
            "breed": "Chihuahua,Dachshund",
            "surrender": 1,
            "adoption": 1
          }
      ],

        spec: "",

          columns: [
            { title: 'Month',
            field: 'month',
            lookup:{12: "December", 11:"November", 3:"March",4:"April",
            2:"Feburary",1:"Janurary",5:"May",6:"June",7:"July",8:"August",
          9:"September",10:"October"},
            filtering: true,
            editable: 'onAdd'},

            {
              title: 'Species',
              field: 'species',
              lookup: {1: 'Dog', 2:'Cat', 3:'Unknown'}

            },
            {
              title: 'Breed',
              field: 'breed',
              filtering: false
            },
            {
              title: 'Surrender Number',
              field: 'surrender',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Adoption Number',
              field: 'adoption',
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
        //             this.setState({report: res.data})
        //
        //         })
        // }
        componentDidMount(){
            //axios.get('https://my-json-server.typicode.com/neojohny/demo/adoption' )
            axios.get('http://localhost:8080/monthlyAdoptionReport' )
                .then(res => {
                    this.setState({report: res.data})

                })
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

            <div>






                <MaterialTable
                    icons={tableIcons}
                    title="Monthly Adoption Report"
                    columns={this.state.columns}
                    data={this.state.report}
                    options = {{
                        filtering:true
                    }}


                />

            </div>

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




export default MonthlyAdoptionReport;
