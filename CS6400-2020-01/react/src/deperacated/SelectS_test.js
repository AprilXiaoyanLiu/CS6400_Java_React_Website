import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';





const S = (props) => {

const [sp, setSpecies] = React.useState('');
  

const handleChange = (event) => {
    setSpecies(event.target.value);
  };



  return (
    
    <div>
      
      <FormControl variant="outlined" >
        <InputLabel id="demo-simple-select-outlined-label">Species</InputLabel>
        
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sp}
          onChange={handleChange}
          label="Species"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          
          <MenuItem value= {props.species.id} key={props.species.id}> {props.species.species} </MenuItem>))}
          
        </Select>
      </FormControl>
      
    </div>
    
  );
}



