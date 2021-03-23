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
import AnimalControlReportButton from './AnimalControlReportButton';
import VolunteerMonthButton from './VolunteerMonthButton';
import MonthlyAdoptionReportButton from './MonthlyAdoptionReportButton';
import VolunteerLookupButton from './VolunteerLookupButton'
import VaccineReminderButton from './VaccineReminderButton'
import AdoptionAppReviewButton from './AdoptionAppReviewButton'



import {Link} from 'react-router';

//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation,
// conditional editable information: this is finished, now think whether need do breed

class AnimalDashboard extends Component {
    constructor(props){

    super(props);

    this.state = {
        animal: [],
        available_sn: [],

        spec: "",



          columns: [
            { title: 'Name', field: 'pet_name' , filtering: false,
            editable: 'onAdd', render: rowData => <a href={'/AnimalDetail/' + rowData.pet_id}> {rowData.pet_name} </a>},
            { title: 'Sex',
            field: 'sex',
            lookup:{0: "female", 1:"male", 2:"Unknown"},
            filtering: false,
            editable: ( _ ,rowData ) => rowData && rowData.sex=== 2},
            { title: 'Age', field: 'age', type: 'numeric' , filtering:false,
            editable: 'onAdd'},
            {
              title: 'Species',
              field: 'species',
              lookup: {0: 'Dog', 1:'Cat', 2:'Unknown'},
              editable: ( _ ,rowData ) => rowData && rowData.species=== 2


            },
            {
              title: 'Breed',
              field: 'breed',
              filtering: false,
              editable: ( _ ,rowData ) => rowData && (rowData.breed=== "Mixed" ||rowData.breed==="Unknown")
            },
            {
              title: 'Alteration Status',
              field: 'alteration_status',
              lookup:{0: 'neutered', 1:'unaltered'},
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
              lookup: {0: 'not adopted', 1:'adopted'},
              filtering: 'true',
              editable: 'onAdd'
            }

          ],
        };


        };

        componentDidMount() {
            fetch('http://localhost:8080/animal')
            .then(response => response.json())
            .then(data => this.setState({animal: data}))



            fetch('http://localhost:8080/leftSpace')
            .then(response => response.json())
            .then(data => this.setState({available_sn: data}))}

        // componentDidMount(){
        //     //axios.get('https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/animal' )
        //
        //     axios.get('https://my-json-server.typicode.com/neojohny/demo/animal')
        //
        //         .then(res => {
        //             this.setState({animal: res.data})
        //
        //         })
        // }

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

        renderRedirectAdoption = () => {
            if (this.state.redirect) {
                return <Redirect to ='/Adoption' />
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



        const filterDropdown = this.state.animal.filter(function(result) {

            //filtered_result = this.state.animal;
            console.log(spec)
            if(spec !== ""){
                return result;
            } else {
                return result;
            }

          });



          const dogLeftNum = this.state.available_sn.filter(function(result) {

            //filtered_result = this.state.animal;
           return (result.species === 'Dog')

          });


          const CatLeftNum = this.state.available_sn.filter(function(result) {

            //filtered_result = this.state.animal;
           return (result.species === 'Cat')

          });




          console.log(dogLeftNum)
          console.log(CatLeftNum)
          console.log(dogLeftNum[0])
         // console.log(dogLeftNum[0]['left_space'])
          console.log((JSON.stringify(CatLeftNum[0])))
         // console.log(CatLeftNum[0][0])

          //console.log(JSON.parse(CatLeftNum[0]))
          console.log(typeof CatLeftNum[0])
        //  console.log(Object.values(CatLeftNum[0]))
          //console.log(JSON.stringify(CatLeftNum[0]))


          const UserType = this.props.usertype;
          console.log("check this " , UserType)



        return (

            <div>

                <h4>Available Space:</h4>
                <ul>
                    {this.state.available_sn.map(n => <p>{n.species} : {n.left_space}</p>)}
                </ul>


                <div >


                        <AddAnimalButton available_sn = {this.state.available_sn} CatLeftNum = {this.state.CatLeftNum} dogLeftNum = {this.state.dogLeftNum} />

                      |

                        <AddAdoptionButton />


                      |
                        <AnimalControlReportButton />

                      |
                        <VolunteerMonthButton />
                      |
                        <MonthlyAdoptionReportButton />
                      |
                     
                   <VolunteerLookupButton />
              
                       
                      |
                       <VaccineReminderButton/>
                       |
                       <AdoptionAppReviewButton/>
                </div>




                <MaterialTable
                    icons={tableIcons}
                    title="Animal Dashboard"
                    columns={this.state.columns}
                    data={filterDropdown}
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
                                console.log(newData)
                                fetch("http://localhost:8080/animal", {
                                  method: "POST",
                                  headers: {
                                    "content-type": "application/json",
                                  },
                                  body: JSON.stringify(newData)
                                })
                                .then(response => response.json())
                                .then(response => console.log(response))
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


const AddButton = () => {
    const classes = useStyles();
    return <div classname={classes.root}>


        <AddAnimalButton />


        <AddAdoptionButton />

        <AnimalControlReportButton />

        <VolunteerMonthButton />

        <MonthlyAdoptionReportButton />

        <VolunteerLookupButton />
        <AdoptionAppReviewButton />


 </div>;
 }

export default AnimalDashboard;
