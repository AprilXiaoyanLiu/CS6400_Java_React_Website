import React, {Component} from 'react';

import '../App.css';

import {  Button } from '@material-ui/core';

import { forwardRef } from 'react';
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
import { Redirect} from 'react-router-dom';
import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//TO-DO  Figure out put, get, delete request according to editable, deletable action
//TO-DO Add Adoption, Available Species, Authentation, conditional editable information
//TO-DO Add Animal and check whether is going to add Dog or Cat?

class AddAnimalButton extends Component {
    constructor(props){

    super(props);

    this.state = {
        showForm: false,
        animal: [],
        available_sn: [],
        selected_spe: "",

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
        this.showMenu = this.showMenu.bind(this);


        };


        componentDidMount() {
          fetch('http://localhost:8080/leftSpace')
          .then(response => response.json())
          .then(data => this.setState({available_sn: data}))



          fetch('http://localhost:8080/leftSpace')
          .then(response => response.json())
          .then(data => this.setState({available_sn: data}))}







        submitForm(e) {
            e.preventDefault()
            alert("clicked!")
            //this.context.history.push('/AddAnimal')
        }




        showMenu(event) {
          event.preventDefault();

          this.setState({
            showMenu: true,
          });
        }


        myChangeHandler = (event) => {
          event.preventDefault()
          let nam = event.target.name;
          let val = event.target.value;
          this.setState({[nam]: val});
          this.setState({showMenu: true})


        }


        fetchUser(pet_id){
          let url = "http://localhost:8080/leftSpace/"+pet_id;
          this.fetchApi(url)
      };

        fetchApi(url){
            axios.get(url)
               .then(res => {
                   console.log(url)
                   this.setState({animal:res.data})
               })

            };



        componentDidMount(){
           let id = this.state.selected_spe
           this.fetchUser(id)

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
        const spec = this.state.spec;
        this.handleChange = (event) => {
            this.setState({ spec: event.target.value });
          };

        const species = this.props.species
        console.log(species)



        const filterDropdown = this.props.available_sn.filter(function(result) {

            //filtered_result = this.state.animal;

                return result;


          });


        this.goToAnimal = (event) => {
          event.preventDefault();
          this.props.history.push('/AddAnimal')
        }

        this.setRedirect = () => {
          let left_space
          console.log("check this", this.props.dogLeftNum)


          console.log(this.state.available_sn)

          console.log(this.state.available_sn[0])

       //    if (this.state.selected_spe === 'Dog'){
       //       left_space = this.props.dogLeftNum
       //    } else {
        //      left_space = this.props.CatLeftNum
         //  }

          // console.log(left_space)
        // //  console.log(left_space.left_num)
         this.setState(
             {redirect: true}
           )

          // if (left_space > 0){
          //  this.setState({
          //      redirect: true
          //  })} else (alert("We don't have any space!"))
        }

        this.renderRedirectAnimal = () => {

            console.log(this.state.selected_spe)

            if (this.state.redirect) {
                return <Redirect to ='/AddAnimal' />
            }
        }








        return (


                    <>




                            <Button  variant="contained" color="primary"  onClick={this.showMenu} >
                                Add Animal
                            </Button>

          {this.renderRedirectAnimal()}
                            {
          this.state.showMenu
            ? (

              <form onSubmit={this.setRedirect}>

                <div>
                <FormControl required >
                <InputLabel id="demo-simple-select-label">Species</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selected_spe"
                    onChange={this.myChangeHandler}
                    onClick={this.showMenu}
                    label="Species"
                >


                <MenuItem value='Dog'> Dog </MenuItem>
                <MenuItem value='Cat'> Cat </MenuItem>

                </Select>

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





                    </>










        );
    }
}

export default AddAnimalButton;
