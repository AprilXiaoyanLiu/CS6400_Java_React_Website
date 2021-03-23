import React, { Component } from 'react';
import axios from 'axios';
import AddVaccination from './AddVaccination';
import {withRouter, Redirect} from 'react-router-dom';
import {  Button } from '@material-ui/core';


//TO-DO

//Show Vaccination

class AnimalDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        animal: [],
        animalvac: [],
        available_vaccine: [],


        page: window.location.href

    }}

    fetchUser(pet_id){
      let url = ["http://localhost:8080/animalAllInfo/"+pet_id, "http://localhost:8080/available_vaccine/"+pet_id]
      
      this.fetchApi(url)
  };

    fetchApi(url){
        axios.get(url[0])
           .then(res => {
               console.log(url[0])
               this.setState({animal:res.data})
           })

        axios.get(url[1])
           .then(res => {
             console.log(url[1])
             this.setState({available_vaccine: res.data})
           })

        axios.get('http://localhost:8080/animalVaccine')
        .then(res => {
          console.log(res.data)
          this.setState({animalvac:res.data})
      })};


//       fetchUser(pet_id){
//     let url = "https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/animalAllinfo/"+pet_id;
//     this.fetchApi(url)
// };
//
// fetchApi(url){
//     axios.get(url)
//        .then(res => {
//            console.log(url)
//            this.setState({animal:res.data})
//        })
// }





    componentDidMount(){
       let id = this.state.page.split('/')[4]
       this.fetchUser(id)

    };









    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
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

    handleSubmit(event) {
        alert("added")
    }

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




    setRedirect = () => {
      this.setState({
          redirect: true
      })
  }


    renderRedirectAdoption = () => {
      if (this.state.redirect) {
          return <Redirect to ={{
            pathname:'/Adoption',
            state:{ event :this.state.animal.pet_id}
          }}
                />
      }
  }

  // renderComp(){
  //   if(isAdopted==='Not Adopted'){
  //       return(
  //           this.renderRedirectAdoption()
  //
  //           )
  // }
  // else{
  //  return(<div></div>)
  // }
  // }

    render() {


      //const animal = this.state.animal
      const animalvacinfo = this.state.animalvac;
      const pet_id_va = this.state.animal.pet_id;
      const animal = this.state.animal;
      const pet_spe = this.state.animal.species;
      
     // const exc = this.state.animalexcludevac.vaccine;


      const AniVacById = this.state.animalvac.filter(function(result) {

        //filtered_result = this.state.animal;
 //       console.log(pet_id_va)
 //       console.log(animal)
       // console.log(exc)
       return result.pet_id === pet_id_va;

      });

  


     // const VaccById = this.state.animalexcludevac.filter(function(result) {
     //     return result.pet_id === pet_id_va;
     // });

      //const AniEL = VaccById.vaccine;

      let button;

      const isAdopted = this.state.animal.adoption_status;

      if (isAdopted ==='not_adopted'){
        console.log(pet_id_va)
        console.log(animal)
        console.log(isAdopted)
     //   console.log(exc)
      //  console.log(this.state.animalexcludevac.pet_id)


          button = <AddVaccination pet_spe = {pet_spe} ani_for_vac = {pet_id_va}  />;

      } else {

         console.log("this should not happen")
          console.log(isAdopted)
          button = <p></p>;
      }



      return (
    <>
        <div style={{"background-color": 'lightgreen', margin: 'auto', boarder: '3px solid #73AD21', width: '25%', padding:'10px'}}>
            <h1>My Name is: {this.state.animal.pet_name}</h1>
        </div>


            <h2> Some Facts About Me!</h2>
            <div>

            {this.renderRedirectAdoption()}
            {isAdopted ==='not_adopted'&&
            //{isAdopted ==='Not Adopted'&&
            <Button onclick={this.setRedirect} variant="contained" color="primary" onClick={this.setRedirect}>
                                Add Adoption
             </Button>
              }
              </div>

            <div style={{"background-color": 'lightblue', margin: 'auto', boarder: '3px solid #73AD21', width: '25%', padding:'10px'}}>

            <ul align='left' >
            <li><b>Name:</b>  {this.state.animal.pet_name}</li>
            <li><b>Species:</b>  {this.state.animal.species}</li>
            <li><b>Breed:</b>  {this.state.animal.breed}</li>
            <li><b>Sex:</b>  {this.state.animal.sex}</li>
            <li><b>Alteration Status:</b>  {this.state.animal.alteration_status}</li>
            <li><b>Age:</b>  {this.state.animal.age}</li>
            <li><b>Description</b>  {this.state.animal.descriptions}</li>
            <li><b>Microchip ID</b>:  {this.state.animal.microchipId}</li>
            <li><b>Surrender Date</b>:  {this.state.animal.surrender_date}</li>
            <li><b>Surrender Reason</b>: {this.state.animal.surrender_reason}</li>
            <li><b>Surrender by animal control</b>:  {this.state.animal.surrender_by_animal_control}</li>
            <li><b>Adoption Status:</b> {this.state.animal.adoption_status}</li>
            </ul>
            </div>



        <div>
            <h2>Vaccination Information</h2>
            <div style={{ margin: 'auto', boarder: '3px solid #73AD21', width: '25%'}}>


            <table style={{'text-align':'left', 'border': '1'}} >
                <tr>
                    <th>Vaccine_Type</th>
                    <th>Data_Adminstered</th>
                    <th>Expriation_Date</th>
                    <th>Vaccination_Number</th>
                    <th>Adoption_Required</th>
                </tr>
                {AniVacById.map(v => (
                  <tr>
                  <td text-align='left'>{v.vaccine_type}</td>
                  <td text-align='left'>{v.date_administered}</td>
                  <td text-align='left'>{v.expiration_date}</td>
                  <td text-align='left'>{v.vaccination_number}</td>
                  <td text-align='left'>{v.required}</td>


              </tr>
                ))}

            </table>
            </div>

            <div>
                {button}
            </div>


        </div>
    </>

      );
    }



}







  export default AnimalDetail;
