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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation,
// conditional editable information: this is finished, now think whether need do breed

class Adoption extends Component {
    constructor(props){

    super(props);

    this.state = {

        application:[]
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
        ,
        page: window.location.href,
        animal:[],

          //application_number:"",
          //pet_id:"",
        adoption_date:"",
        adoption_fee:"",
        selected_application_number:""

        ,
        spec: "",



          columns: [
            { title: 'First Name', field: 'applicant_first_name' , filtering: false,
            editable: 'onAdd'//, render: rowData => <a href={'/AnimalDetail/' + rowData.id}> {rowData.pet_name} </a>
            },
            { title: 'Last Name',
            field: 'applicant_last_name',
            //lookup:{1: "female", 2:"male", 3:"Unknown"},
            filtering: false,
            editable: 'onAdd'},//( _ ,rowData ) => rowData && rowData.sex=== 3},
            { title: 'Co_FirstName', field: 'coapplicant_first_name',
            //type: 'numeric' ,
            filtering:false,
            editable: 'onAdd'},
            {
              title: 'Co_LastName',
              field: 'coapplicant_last_name',
              //lookup: {1: 'Dog', 2:'Cat', 3:'Unknown'},
              editable: 'onAdd',//( _ ,rowData ) => rowData && rowData.species=== 3
              filtering: false


            },
            {
              title: 'Street',
              field: 'street',
              filtering: false,
              editable: 'onAdd'//( _ ,rowData ) => rowData && (rowData.breed=== "Mixed" ||rowData.breed==="Unknown")
            },
            {
              title: 'City',
              field: 'city',
              //lookup:{1: 'neutered', 2:'unaltered'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'State',
              field: 'state',
              filtering:false,
              editable: 'onAdd'
            },
            {
              title: 'Zip',
              field: 'zipcode',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Phone',
              field: 'phone_number',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Email',
              field: 'email',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Application Date',
              field: 'application_date',
              //lookup: {1: 'not adopted', 2:'adopted'},
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Status',
              field: 'status',
              lookup: {1: 'Approved', 2:'Declined',3:'Pending'},
              filtering: false,
              editable: ( _ ,rowData ) => rowData && rowData.status=== 3
            }

          ],
        };



        };
        fetchUser(pet_id){
            let url = "http://localhost:8080/animal/"+pet_id;
            this.fetchApi(url)
        };

        fetchApi(url){
            axios.get(url)
               .then(res => {
                   console.log(url)
                   this.setState({animal:res.data})
               })
        }
        componentDidMount(){
           let id = this.state.page.split('/')[4]
           this.fetchUser(id)
       }

        //componentDidMount() {
        //    fetch('http://localhost:8080/animal')
        //    .then(response => response.json())
        //    .then(data => this.setState({animal: data}))}
        componentDidMount(){
            //axios.get('https://my-json-server.typicode.com/neojohny/demo/adoption' )
            axios.get('http://localhost:8080/applicantInformationWithEmail' )
                .then(res => {
                    this.setState({application: res.data})

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



    handleSubmit = event => {
            event.preventDefault();

            const adoption_record = {
                application_number: this.state.selected_application_number,
                pet_id: this.props.location.state.event,
                adoption_date: this.state.adoption_date,
                adoption_fee: this.state.adoption_fee,


            };
            console.log(adoption_record)
            //post request

            // axios.post('http://localhost:8080/adoptionInformation', {adoption_record})
            //     .then(res => {
            //         console.log(res)
            //         console.log(res.data);
            //     })

            fetch("http://localhost:8080/adoptionInformation", {
                                  method: "POST",
                                  headers: {
                                    "content-type": "application/json",
                                  },
                                  body: JSON.stringify(adoption_record)
                                })
                                .then(response => response.json())
                                .then(response => console.log(response))
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

        const filteredApp = this.state.application.filter(function(result) {
          return result.status === 1;
        });



        const filterDropdown = this.state.application.filter(function(result) {

            //filtered_result = this.state.animal;
            console.log(spec)
            if(spec !== ""){
                return result;
            } else {
                return result;
            }

          });






          const app = this.state.application;
          console.log(this.props.location.state.event)
          //console.log(this.props.match.params)
          console.log(this.state.adoption_date)

        return (



            <div>

                <MaterialTable
                    icons={tableIcons}
                    title="Available Adopters"
                    columns={this.state.columns}
                    data={filteredApp}
                    options = {{
                        filtering:true
                    }}
                    // editable={{
                    //     onRowAdd: newData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //         {
                    //             const data = filterDropdown;
                    //             data.push(newData);
                    //             this.setState({ data }, () => resolve());
                    //         }
                    //         resolve()
                    //         }, 1000)
                    //     }),
                    //     onRowUpdate: (newData, oldData) =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //         {
                    //             const data = filterDropdown;
                    //             const index = data.indexOf(oldData);
                    //             data[index] = newData;
                    //             axios.put("https://my-json-server.typicode.com/neojohny/demo/adoption/"+(index+1),
                    //                       newData
                    //                       ).then(res => console.log(res.data));
                    //             console.log({data});
                    //             this.setState({ data }, () => resolve());
                    //         }
                    //         resolve()
                    //         }, 1000)
                    //     }),
                    //     onRowDelete: oldData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //         {
                    //             let data = filterDropdown;
                    //             const index = data.indexOf(oldData);
                    //             data.splice(index, 1);
                    //             this.setState({ data }, () => resolve());
                    //         }
                    //         resolve()
                    //         }, 1000)
                    //     }),
                    // }}
                    detailPanel={rowData => {
                                  return (
                                    <form onSubmit={this.handleSubmit}>

                                    <div>

                                    <TextField
                                      id="standard-select-currency-native"
                                      select
                                      label="Application Number"
                                      //value={rowData.application_number}
                                      onChange={this.myChangeHandler}

                                      name="selected_application_number"
                                      margin="dense"
                                      style = {{width: 100}}
                                      InputLabelProps={{
                                      shrink: true,
                                      }}

                                    >
                                    <MenuItem value= {rowData.application_number}> {rowData.application_number} </MenuItem>

                                    </TextField>
                                    <TextField
                                            required id="standard-required"
                                            id="filled-helperText"
                                            label="Adoption Date"
                                            defaultValue=""
                                            //variant="filled"
                                            name="adoption_date"
                                            margin="dense"
                                            style = {{width: 100}}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            onChange={this.myChangeHandler}
                                    />

                                    <TextField
                                            required id="standard-required"
                                            id="filled-helperText"
                                            label="Adoption Fee"
                                            defaultValue=""
                                            //variant="filled"
                                            name="adoption_fee"
                                            margin="dense"
                                            style = {{width: 100}}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            onChange={this.myChangeHandler}
                                    />


              <button type="submit" class="block" width="100%">Submit</button>

                                    </div>
                                    </form>
                                  )
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
        width: '25ch'
      },
    },
  }));



export default Adoption;
