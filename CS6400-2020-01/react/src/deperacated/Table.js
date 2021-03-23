import React from "react";
import {
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import UpArrow from "material-ui/svg-icons/navigation/arrow-drop-up";
import TextField from "@material-ui/core/TextField";

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={y.prop}
              onChange={e => handleChange(e, y.prop, i)}
              value={x[y.prop]}
            />
          ) : (
            x[y.prop]
          )}
        </TableRowColumn>
      ))}
      <TableRowColumn>
        {currentlyEditing ? (
          <CheckIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}
      </TableRowColumn>
      <TableRowColumn>
        <TrashIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
};

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
  handleSort,
  sortDirection,
  columnToSort
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => handleSort(x.prop)}
            >
              <span>{x.name}</span>
              {columnToSort === x.prop ? (
                sortDirection === "asc" ? (
                  <UpArrow />
                ) : (
                  <DownArrow />
                )
              ) : null}
            </div>
          </TableHeaderColumn>
        ))}
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);


<div>
      
      <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Species</InputLabel>
          
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={spec}
          onChange={this.handleChange}
          label="Species"
          >
          <MenuItem value="">
              <em>All</em>
          </MenuItem>
          {this.state.species.map(spe => (
          <MenuItem value= {spe.species} key={spe.id}> {spe.species} </MenuItem>))}
          
          </Select>
      </FormControl>
      
  </div>