import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import classes from "./BasicModal.module.css";
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useState,useEffect} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import ImageIcon from '@mui/icons-material/Image';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 450,
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow:"scroll"
}
const inputs={
  marginTop:"5%"
}
const dropdown={
  width:"42%",
  marginTop:"5%"
}
const userRole = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'supplier',
    label: 'supplier',
  },
  {
    value: 'customer',
    label: 'customer',
  }
];

const btn ={
  width: '40%',
  marginTop:"10%",
  marginLeft:"1%",
  padding: "10px 30px",
}
const changebutton={
    marginTop:"65%"
}

const listitem = {
  height: "9vh",
  width:"94%",
  border: "1px solid #d3d3d3",
  borderRadius:"5px",
  marginTop:"5%",
  bgcolor: 'background.paper'
}
const listField={
  marginTop:"5%",
  width:"47%",
  borderBottom: "2px solid #d3d3d3"
}

const inputField={
  marginTop:"10%",
  borderBottom: "1px solid gainsboro",
  height:"8vh",
  width:"100%",
  paddingBottom:"5px"
}

export default function BasicModal({user,fetch,open,setOpen,setEditValue}) {
 
  const handleClose = () => setOpen(false);
  const[show,setShow]=useState(false);
  const [changecolor, setChangecolor] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [emailid, setEmailId] = useState("");
  const [userrole, setUserRole] = useState("");
  const [username, setUserName] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [gmail, setGmail] = useState("");
  const [Youtube, setYoutube] = useState("");
  const [opens, setOpens] = useState(false);
  const [opened, setOpened] = useState(false);


  //console.log("openuser",user);
  useEffect(() => {
    //console.log("effectuser",user);
    //console.log("editvalue_audi",props.editValue.audience);
    if(user){
    console.log("ifuser",user);
    setFirstName(user.FirstName);
    setLastName(user.LastName);
    setMobileNo(user.MobileNo);
    setEmailId(user.Emailid);
    setUserRole(user.UserRole);
    setUserName(user.UserName);
    }
    else{
      alert("refresh")
    }
}, [user]); // eslint-disable-line


 
  const handleClick = () => {
    setOpens(!opens);
  };
  const handleOpened = () => {
    setOpened(!opened);
  };
  const Check=()=>{
    setShow(!show);
    setChangecolor(!changecolor);
  }

  const fnameHandler = (event) =>{
    setFirstName(event.target.value);
  }
  const lnameHandler = (event) =>{
    setLastName(event.target.value);
  }
  const mbnoHandler = (event) =>{
    setMobileNo(event.target.value);
  }
  const emailHandler = (event) =>{
    setEmailId(event.target.value);
  }
  const uroleHandler = (event) =>{
    setUserRole(event.target.value);
  }
  const unameHandler = (event) =>{
    setUserName(event.target.value);
  }
  const FacebookHandler = (event) =>{
    setFacebook(event.target.value);
  }
  const LinkedinHandler = (event) =>{
    setLinkedin(event.target.value);
  }
  const TwitterHandler = (event) =>{
    setTwitter(event.target.value);
  }
  const gmailHandler = (event) =>{
    setGmail(event.target.value);
  }
  const YoutubeHandler = (event) =>{
    setYoutube(event.target.value);
  }


  const SubmitHandler=(event)=>{
    event.preventDefault();
    var Social = {
                  Facebook,
                  Linkedin,
                  Twitter,
                  gmail,
                  Youtube}

    var addData = {FirstName:firstname,
                   LastName:lastname,
                   MobileNo:mobileno,
                   Emailid:emailid,
                   UserRole:userrole,
                   UserName:username,
                   Social}

                  if(Object.keys(user).length){
                    console.log("booluser",user);
                    const id = user.id
                    alert("edit");
                    axios.put(`http://localhost:3000/data/${id}`,addData).then(() => fetch());
                    //updateMethod(user);
                 }
                else
                 {
                   alert("add")
                   axios.post('http://localhost:3000/data',addData).then(() => fetch());
                   console.log("ifadd",addData);
                 }

    setFirstName("");
    setLastName("");
    setMobileNo("");
    setEmailId("");
    setUserRole("");
    setUserName("");
    setFacebook("");
    setLinkedin("");
    setTwitter("");
    setGmail("");
    setYoutube("");
    setEditValue("");
  }

  return (

    <div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style} component={Paper}>

        <div className={classes.model}>
         
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Details
          </Typography>
          <DisabledByDefaultIcon style={{fontSize: "35px"}} onClick={handleClose} />

        </div>

        <form className={classes.modelInputs} onSubmit={SubmitHandler}>

                <TextField  label="FirstName"
                            type="text"
                            placeholder="Enter Firstname"
                            style={inputs}
                            value={firstname || ""}
                            onChange={fnameHandler}
                            required
                />
                <TextField  label="LastName"
                            type="text"
                            placeholder="Enter Lastname"
                            style={inputs}
                            value={lastname || ""}
                            onChange={lnameHandler}
                            required
                />
                <TextField  label="MobileNo"
                            type="tel"
                            placeholder="Enter Mobilenumber"
                            style={inputs}
                            value={mobileno || ""}
                            onChange={mbnoHandler}
                            required
                />
                <TextField  label="Emailid"
                            type="email"
                            placeholder="Enter Emailid"
                            style={inputs}
                            value={emailid || ""}
                            onChange={emailHandler}
                            required
                />
                <TextField
                            select
                            label="UserRole"
                            placeholder="Enter Userrole"
                            value={userrole || ""}
                            onChange={uroleHandler}
                            style={dropdown}
                            required
                          >
                            {userRole.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                </TextField>
                <TextField  label="UserName"
                            type="text"
                            placeholder="Enter Username"
                            style={inputs}
                            value={username || ""}
                            onChange={unameHandler}
                            required
                />

                <List       style={listitem}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                >
                <ListItemButton onClick={handleClick} fullwidth>
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Social" />
                                {opens ? <ExpandLess /> : <ExpandMore onClick={Check} />}
                </ListItemButton>

                <Collapse in={opens} timeout="auto" unmountOnExit>
               
                {show &&  <List component="div" disablePadding className={classes.flexList}>
                               
                          <TextField label="Facebook" 
                                     color="secondary" 
                                     style={listField}
                                     value={Facebook}
                                     onChange={FacebookHandler} 
                                     />

                          <TextField label="Linkedin" 
                                     color="secondary" 
                                     style={listField} 
                                     value={Linkedin}
                                     onChange={LinkedinHandler} 
                                     />

                          <TextField label="Twitter" 
                                     color="secondary" 
                                     style={listField} 
                                     value={Twitter}
                                     onChange={TwitterHandler} 
                                     />

                          <TextField label="gmail" 
                                     color="secondary" 
                                     style={listField} 
                                     value={gmail}
                                     onChange={gmailHandler} 
                                     />

                          <TextField label="Youtube" 
                                     color="secondary" 
                                     style={listField} 
                                     className={classes.youtube}
                                     value={Youtube}
                                     onChange={YoutubeHandler} 
                                     />


                  </List>}
     
                </Collapse>

                </List>

                <List       style={listitem}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                >
                <ListItemButton onClick={handleOpened}>
                            <ListItemIcon>
                                <ImageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Images" />
                                {opened ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={opened} onClick={Check} timeout="auto" unmountOnExit>
               
                  <List component="div" disablePadding>
                                     
                            <input
                            label="Choose your file"
                            type="file"
                            variant="standard"
                            style={inputField}
                            multiple />
                  </List>

                </Collapse>

                </List>
               

                <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          style={changecolor ? changebutton : btn}
                          className={classes.submit}
                >
                         {Object.keys(user).length ? 'Update' : 'Submit' }
                </Button>
           
          </form>
        </Box>
      </Modal>
    </div>
  );
}