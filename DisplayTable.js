import React, {useRef, useState, useEffect} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import TableFooter from '@mui/material/TableFooter';
import classes from "./Table.module.css";
import BasicModal from './BasicModal';
import { HiOutlineDownload } from "react-icons/hi";
import TablePagination from '@mui/material/TablePagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import axios from 'axios';



const table={
  height:"350px",
  overflow:"scroll"
}
const cell = {
  width:"10%"
}
const paperStyle = {
  height : "85vh",
  width : "95%",
  margin:"5% 5%",
  padding:"2%",
  textAlign:"center",
}

//  const tableFoot = {
//   marginTop:"2%",
//   width: "100% "
// }


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DisplayTable({users,fetch}) {

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [editValue, setEditValue] = React.useState({});
  const [customer, setCustomer] = useState(false);
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'Users table',
      sheet: 'Users'
  })

  {/*const handleChangePage = ( newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };*/}

  useEffect (() => {
  let usertype = localStorage.getItem('UserRole')
  if (usertype === "admin") {
    setCustomer(!customer)
  } 
}, []); // eslint-disable-line

  //const dataLength = users.length;

  const onSave =  (user) => {
    console.log("user",user);
    setEditValue(user);
    setOpen(true);
   
  }
  const onDelete = (id) =>{
    axios.delete(`http://localhost:3000/data/${id}`).then(fetch);
  }
 
    return (

      <div className={classes.nobg}>

      <Paper elevation={10} style={paperStyle}>

      <div className={classes.model}>
         
         <Button variant="text"
                  type="submit"
                  color="primary"
                  style={{color:"black",fontSize:"20px",fontWeight:"700"}}
                  onClick={onDownload}>

               Export <HiOutlineDownload style={{color:"black",fontSize:"20px",fontWeight:"700"}} />

          </Button> 
          { customer && <Button onClick={handleOpen}><AddCircleIcon style={{fontSize: "40px",color:"black"}} /></Button> }
         
      </div>
     
      <BasicModal open={open} setOpen={setOpen} fetch={fetch} user={editValue} setEditValue={setEditValue} onDelete={onDelete}/>
     
      <div style={table}>

      <TableContainer component={Paper} >
        <Table aria-label="customized table" ref={tableRef} >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={cell}>First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Mobile No</StyledTableCell>
              <StyledTableCell align="center">Email id</StyledTableCell>
              <StyledTableCell align="center">User Role</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              { customer &&<StyledTableCell align="center">Delete</StyledTableCell> }
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user,id) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.FirstName}</StyledTableCell>
                <StyledTableCell align="center">{user.LastName}</StyledTableCell>
                <StyledTableCell align="center">{user.MobileNo}</StyledTableCell>
                <StyledTableCell align="center">{user.Emailid}</StyledTableCell>
                <StyledTableCell align="center">{user.UserRole}</StyledTableCell>
                <StyledTableCell align="center">{user.UserName}</StyledTableCell>
                <StyledTableCell align="center" onClick={()=>onSave(user)}><FaEdit/></StyledTableCell>
                { customer && <StyledTableCell align="center" onClick={()=>onDelete(user.id)}><FaTrash/></StyledTableCell> }
              </StyledTableRow>
            ))}
         
          </TableBody>
        </Table>
      </TableContainer>

      </div>

      {/*<div style={tableFoot}>

      <TableFooter style={footer}>

      <TablePagination  component="div"
                        count={dataLength}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage} 
            />

      </TableFooter>

    </div>*/}

      </Paper>

    </div>
    );
}