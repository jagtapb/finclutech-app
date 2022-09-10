import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 750,
    overflow: 'auto'
  },
});

export default function BasicTable({rows, editIndex, removeUser, onClickEditIcon}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">LastName</TableCell>
            <TableCell align="center">FirstName</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">StudentStatus</TableCell>
            <TableCell align="center">Major</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">SAT</TableCell>
            <TableCell align="center">Grade</TableCell>
            <TableCell align="center">Height</TableCell>
            <TableCell align="center">      </TableCell>
            <TableCell align="center">      </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{user.ID}</TableCell>
              <TableCell align="center">{user.LastName}</TableCell>
              <TableCell align="center">{user.FirstName}</TableCell>
              <TableCell align="center">{user.City}</TableCell>
              <TableCell align="center">{user.State}</TableCell>
              <TableCell align="center">{user.Gender}</TableCell>
              <TableCell align="center">{user.StudentStatus}</TableCell>
              <TableCell align="center">{user.Major}</TableCell>
              <TableCell align="center">{user.Country}</TableCell>
              <TableCell align="center">{user.Age}</TableCell>
              <TableCell align="center">{user.SAT}</TableCell>
              <TableCell align="center">{user.Grade}</TableCell>
              <TableCell align="center">{user.Height}</TableCell>
              <TableCell align="right">
                {editIndex !== index && (
                   <EditIcon style={{cursor: 'pointer'}} onClick={()=>{onClickEditIcon(user, index)}} fontSize={'small'} /> 
                )}
              </TableCell>
              <TableCell align="right">
                <CloseIcon style={{cursor: 'pointer'}} onClick={()=>{removeUser(index)}} fontSize={'small'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}