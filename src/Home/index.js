import React from 'react';
//import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import  { Grid }  from '@material-ui/core';


import Header from '../componentes/Header'
import Welcome from '../componentes/Welcome'
import Acesso from '../componentes/Acesso';


const useStyles = makeStyles({
    main:{
        display: 'flex', 
        flexDirection: 'row-reverse',
        minHeight: '95vh'
    },

})
const Home = () =>{
    const classes = useStyles();

    return(
        <div>
            <Header />
            <Grid container className={classes.main}>
                <Grid
                    item
                    container
                    md={7}
                    sm={11}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    >
                    <Acesso />
                </Grid>
                <Grid 
                    item
                    container
                    display="flex"
                    justify="center"
                    alignItems="center"
                    md={5}
                    sm={0}
                >
                    <Welcome />
                </Grid>
            </Grid>
        </div>
    );

}

export default Home;