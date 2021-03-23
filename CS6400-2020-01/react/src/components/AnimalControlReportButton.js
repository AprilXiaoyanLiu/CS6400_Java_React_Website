import React, {Component} from 'react';

import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableExample from '../deperacated/TableExample';
import { Grid, MuiThemeProvider, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
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

//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation, conditional editable information
//TO-DO Add link to name to Animal Detail page

class AnimalControlReportButton extends Component {
    constructor(props){

    super(props);

    this.state = {
        animal: [],
        available_sn: [
            {'species': 'Dog', 'left_num': 5},
            {'species': 'Cat', 'left_num': 10}

        ],

        spec: "",



          columns: [
            { title: 'Name', field: 'pet_name' , filtering: false,
            editable: 'onAdd'},
            { title: 'Sex', field: 'sex', filtering: false},
            { title: 'Age', field: 'age', type: 'numeric' , filtering:false,
            editable: 'onAdd'},
            {
              title: 'Species',
              field: 'species',
              lookup: {1: 'Dog', 2:'Cat'},
              editable: ( _ ,rowData ) => rowData && rowData.type !== 1

            },
            {
              title: 'Breed',
              field: 'breed',
              filtering: false
            },
            {
              title: 'Alteration Status',
              field: 'alteration_status',
              filtering: false,
              editable: 'onAdd'
            },
            {
              title: 'Descriptions',
              field: 'descriptions',
              filtering:false,
              editable: 'onAdd'
            },
            {
              title: 'Adoption Status',
              field: 'adoption_status',
              lookup: {1: 'not adopted', 2:'adopted'},
              filtering: 'true'
            }

          ],
        };


        };

        //componentDidMount() {
        //    fetch('http://localhost:8080/animal')
        //    .then(response => response.json())
        //    .then(data => this.setState({animal: data}))}
        componentDidMount(){
            axios.get('https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/animal')
                .then(res => {
                    this.setState({animal: res.data})

                })
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



        const filterDropdown = this.state.animal.filter(function(result) {

            //filtered_result = this.state.animal;
            console.log(spec)
            if(spec !== ""){
                return result;
            } else {
                return result;
            }

          });









        return (


                    <>


                        {this.renderRedirectAnimalControl()}

                            <Button onclick={this.setRedirect} variant="contained" color="primary" onClick={this.setRedirect}>
                                 Animal Control Report
                            </Button>




                    </>










        );
    }
}

export default AnimalControlReportButton;
