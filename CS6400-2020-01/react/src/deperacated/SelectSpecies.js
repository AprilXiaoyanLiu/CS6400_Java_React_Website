import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function SimpleSelect({rows},{specie}) {
  const classes = useStyles();
  const [sp, setSpecies] = React.useState('');
  

  const handleChange = (event) => {
    setSpecies(event.target.value);
  };

  const animalFilterBySpecies = {rows}.filter(function(result) {
    return result.species === sp;
  });

  return (
    <>
    <div>
        <p> test</p>
    </div>
    <div>
      
      <FormControl variant="outlined" className={classes.formControl}>
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
          {specie.map((spe,index) => (
          <MenuItem value= {spe.id} key={spe.id}> {spe.species} </MenuItem>))}
          
        </Select>
      </FormControl>
      
    </div>
    </>
  );
}



