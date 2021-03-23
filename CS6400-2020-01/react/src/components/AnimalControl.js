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
import AddAnimalButton from './AddAnimalButton';
import AddAdoptionButton from './AddAdoptionButton';
import {Link} from 'react-router';
import TextField from '@material-ui/core/TextField';


//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation,
// conditional editable information: this is finished, now think whether need do breed

class AnimalControl extends Component {
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
        adoption:[
          {
    "pet_id": 5,
    "species": 1,
    "sex": 1,
    "alteration_status": "neutered",
    "microchipId": "4015575521",
    "surrender_date": "2018-07-06 00:00:00.0",
    "breed": "Cane Corso",
    "year": 118,
    "month": 6,
    "day": 5,
    "rescue_days": 564
},
        ],
          surrender:[]
            // {
            //   "surrender_month": 12,
            //   "id": 3,
            //   "species": 1,
            //   "breed": "Afghan Hound",
            //   "sex": "Female",
            //   "alteration_status": "neutered",
            //   "microchipId": "0012314",
            //   "surrender_date": "2019-12-02",
            //   "surrender_by_animal_control": "Yes",
            //   "number_of_days_inrescue":'100'
            // }]
        ,

        spec: "",

          columns: [
            { title: 'Adoption Month',
            field: 'month',
            lookup:{12: "December", 11:"November", 3:"March",4:"April",
            2:"Feburary",1:"Janurary"},
            filtering: true,
            editable: 'onAdd'},
            { title: 'Pet ID', field: 'pet_id' , filtering: false,
            editable: 'onAdd'//, render: rowData => <a href={'/AnimalDetail/' + rowData.id}> {rowData.pet_name} </a>
            },
            {
              title: 'Species',
              field: 'species',
              lookup: {1: 'Dog', 0:'Cat', 2:'Unknown'},
              filtering: true,
              editable: 'onAdd'


            },
            { title: 'Breed', field: 'breed',
            //type: 'numeric' ,
            filtering:false,
            editable: 'onAdd'},
            {
              title: 'Sex',
              field: 'sex',
              lookup: {0: 'Femail', 1:'Male', 2:'Unknown'},
              editable: 'onAdd',//( _ ,rowData ) => rowData && rowData.species=== 3
              filtering: false


            },
            {
              title: 'Alteration Status',
              field: 'alteration_status',
              filtering: false,
              editable: 'onAdd'//( _ ,rowData ) => rowData && (rowData.breed=== "Mixed" ||rowData.breed==="Unknown")
            },
            {
              title: 'MicrochipId',
              field: 'microchipId',
              //lookup:{1: 'neutered', 2:'unaltered'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Surrender Date',
              field: 'surrender_date',
              filtering:false,
              editable: 'onAdd'
            },
            {
              title: 'Days in Rescud',
              field: 'rescue_days',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            }

          ],
          columns_surrender: [
            { title: 'Surrender Month',
            field: 'month',
            lookup:{12: "December", 11:"November", 3:"March",4:"April",
            2:"Feburary",1:"Janurary"},
            filtering: true,
            editable: 'onAdd'},
            { title: 'Pet ID', field: 'pet_id' , filtering: false,
            editable: 'onAdd'//, render: rowData => <a href={'/AnimalDetail/' + rowData.id}> {rowData.pet_name} </a>
            },
            {
              title: 'Species',
              field: 'species',
              lookup: {1: 'Dog', 0:'Cat', 2:'Unknown'},
              filtering: true,
              editable: 'onAdd'


            },
            { title: 'Breed', field: 'breed',
            //type: 'numeric' ,
            filtering:false,
            editable: 'onAdd'},
            {
              title: 'Sex',
              field: 'sex',
              lookup: {0: 'Femail', 1:'Male', 2:'Unknown'},
              editable: 'onAdd',//( _ ,rowData ) => rowData && rowData.species=== 3
              filtering: false


            },
            {
              title: 'Alteration Status',
              field: 'alteration_status',
              filtering: false,
              editable: 'onAdd'//( _ ,rowData ) => rowData && (rowData.breed=== "Mixed" ||rowData.breed==="Unknown")
            },
            {
              title: 'MicrochipId',
              field: 'microchipId',
              //lookup:{1: 'neutered', 2:'unaltered'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Surrender Date',
              field: 'surrender_date',
              filtering:false,
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
        //             this.setState({application: res.data})
        //
        //         })
        // }

        componentDidMount(){
            //axios.get('https://my-json-server.typicode.com/neojohny/demo/adoption' )
            //axios.get('http://localhost:8080/adoptedLongRescueAnimal/3')
            axios.get('http://localhost:8080/adoptedLongRescueAnimal')
                .then(res => {
                    this.setState({adoption: res.data})

                })
        }

        componentDidMount(){
            //axios.get('https://my-json-server.typicode.com/neojohny/demo/adoption' )
            //axios.get('http://localhost:8080/surrender' )
            //axios.get('http://localhost:8080/animalControl/3' )
            axios.get('http://localhost:8080/animalControl' )
                .then(res => {
                    this.setState({surrender: res.data})

                })
        }

        myChangeHandler = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({[nam]: val});
          }


        submitForm(e) {
            e.preventDefault()
            alert("clicked!")
            //this.context.history.push('/AddAnimal')
        }

        setRedirect = () => {
            this.setState({
                redirect: true
            })
        }

        renderRedirectAnimal = () => {
            if (this.state.redirect) {
                return <Redirect to ='/AddAnimal' />
            }
        }

        renderRedirectAnimalControl = () => {
            if (this.state.redirect) {
                return <Redirect to ='/AnimalControl' />
            }
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
        const spec = this.state.spec;
        this.handleChange = (event) => {
            this.setState({ spec: event.target.value });
          };

        const species = this.props.species



        const filterDropdown = this.state.adoption.filter(function(result) {

            //filtered_result = this.state.animal;
            console.log(spec)
            if(spec !== ""){
                return result;
            } else {
                return result;
            }

          });









        return (

            <div>






                <MaterialTable
                    icons={tableIcons}
                    title="Surrender Report"
                    columns={this.state.columns_surrender}
                    data={this.state.surrender}
                    options = {{
                        filtering:true
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                const data = filterDropdown;
                                data.push(newData);
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                const data = filterDropdown;
                                const index = data.indexOf(oldData);
                                data[index] = newData;
                                axios.put("https://my-json-server.typicode.com/neojohny/demo/AnimalControl/"+(index+1),
                                          newData
                                          ).then(res => console.log(res.data));
                                console.log({data});
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                let data = filterDropdown;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
                    }}

                />

                <MaterialTable
                    icons={tableIcons}
                    title="Adoption Report"
                    columns={this.state.columns}
                    data={this.state.adoption}
                    options = {{
                        filtering:true
                    }}
                    editable={{
                        onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                const data = filterDropdown;
                                data.push(newData);
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                const data = filterDropdown;
                                const index = data.indexOf(oldData);
                                data[index] = newData;
                                axios.put("https://my-json-server.typicode.com/neojohny/demo/AnimalControl/"+(index+1),
                                          newData
                                          ).then(res => console.log(res.data));
                                console.log({data});
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            {
                                let data = filterDropdown;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve());
                            }
                            resolve()
                            }, 1000)
                        }),
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




export default AnimalControl;
