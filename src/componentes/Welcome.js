import React from 'react';
import { Box, Paper ,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        padding: 8,
        width: 325,
        backgroundColor: 'rgba(35, 27, 27, 0.6)',
        justifyContent:'center',
        padding: 30

    },
    tittleBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',   
        color: 'white',
        textJustify: 'auto'
    },
    purple:{
        color: '#3f50b5'
    }
})

function Welcome() {
    const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
        <Box className={classes.tittleBox}>
            <Typography variant="h6">Bem vindo ao SpellBook</Typography>
            <p>
                Bem vindo conjuradores ao seu SpellBook. Aqui vocês poderam registrar os truques, magias e habilidades dos seus personagens.
            </p>
            <p>Criado por Eduardo Augusto Balsamão.</p> 
            <a className={classes.purple} href="https://www.instagram.com/edubalsamao/">Contato</a>
        </Box>
        <Box>

        </Box>
    </Paper>
  );
}

export default Welcome;
