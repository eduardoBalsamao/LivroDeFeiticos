import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {useAuth} from '../context/AuthContext'
import {database} from '../firebase';
import { useHistory  } from 'react-router-dom';

const useStyles = makeStyles({
    titulo2:{
        color: 'white',
        textDecoration: 'none'
    },
    grow:{
        flexGrow: 1
    },
    buttonC:{
        marginLeft: 20,
        color: '#ffff',
        borderColor: '#ff2400',
        backgroundColor: '#ff2400',
        '&:hover': {
            backgroundColor:'#AD0000',
        },
    },

})

function Header() {
const classes = useStyles();
const navigate = useHistory();
const {currentUser, logout} = useAuth();
const [adm, setAdm] = useState()

async function handleLogout() {
    await logout()
}


useEffect(() => {
    if(currentUser){
        database.ref(`/users/${currentUser.uid}/adm`).on('value', (snapshot) => {
            setAdm(snapshot.val());
        })
    }
}, [])

  return (
    <AppBar position="static" color="transparent">
        <Toolbar>
            <Link href="/"><h2 className={classes.titulo2}>Spells Book by Eduardo</h2></Link>
            <div className={classes.grow}></div>
            {adm && <Button onClick={()=>{navigate.push("/admInsertMagics")}} variant="contained" color="primary"> AdmPainel </Button>}
            {currentUser && <Button className={classes.buttonC} onClick={handleLogout} variant="contained" > Logout </Button>}
        </Toolbar>
    </AppBar>
  );
}

export default Header;
