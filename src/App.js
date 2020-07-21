import  React, { useState }from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';


import './App.css';
import data from './test.json';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, name, tz, activity_periods) {
  return { id, name, tz, activity_periods};
}
const rows = data.members.map(({ id, real_name, tz, activity_periods })  => createData(
  id, real_name, tz, activity_periods));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper:{
    width: '70%',
  },
  paperModal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header:{
    fontWeight: '800',
  },
  headerEnd:{
    fontWeight: '800',
    marginLeft: 'auto'
  },
  formatEndTime:{
    marginLeft: 'auto'
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  // const [startTime, setStartTime] = useState([]);
  // const [endTime, setEndTime] = useState([]);
  const [modalContent, setModalContent ] = useState([]);

  const handleOpen = (userName, modalContent) => {
    setUserName(userName);
    setOpen(true);
    setModalContent(modalContent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paperModal}>
      <h3 id="title">{userName}</h3>
      <Grid container>
          <Grid item className={classes.header} >
          Start Time
        </Grid>
        <Grid item className={classes.headerEnd}>
        End Time
          </Grid>
          </Grid>
      {modalContent.map(((item, index) => {
        return( 
        <Grid container key = {index}>
          <Grid item >
          {item.start_time}
        </Grid>
        <Grid item className={classes.formatEndTime}>
        {item.end_time}
          </Grid>
          </Grid>)
      }))}
        <Button onClick={handleClose}>Cancel</Button>    
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Activity</h1>
      </header>
      <TableContainer component={Paper} className = {classes.paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">TimeZone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({id, name, tz, activity_periods}) => (
            <StyledTableRow key={id} onClick={() => handleOpen(name, activity_periods)}>
              <StyledTableCell component="th" scope="row">
                {id}
              </StyledTableCell>
              <StyledTableCell align="left">{name}</StyledTableCell>
              <StyledTableCell align="left">{tz}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default App;
