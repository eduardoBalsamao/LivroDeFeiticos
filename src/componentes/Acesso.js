import React, { useState } from 'react';
import { Paper, Box, TextField, Button, Modal } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Register from './Register';
import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { useHistory  } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
        padding: 8,
        backgroundColor: 'rgba(35, 27, 27, 0.6)',
        width: 700,
        marginBottom: 30,
        justifyContent:'center'
    },

    tittleBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',   
        color: 'white',
    },

    loginBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center', 
    },

    input: {
        width: '70%',
        backgroundColor:'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        color:'white',
        marginTop: 20,
        marginBottom: 20,
      },

    inputText:{
        color:'white',
    },
    margin:{
        margin: theme.spacing(1),
    }
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'lightsalmon',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'darkslateblue',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'primary',
        },
        '&:hover fieldset': {
          borderColor: 'lightsalmon',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'lightsalmon',
        },
      },
    },
  })(TextField);

function Acesso() {
    const classes = useStyles();
    const navigate = useHistory();
    const [errorLogin, setErrorLogin] = useState("");
    const [emailLogin, setEmailLogin] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");
    const { login } = useAuth()
    const [modal, setModal] = React.useState(null);
    const modalClick = (event) => {
        setModal(event.currentTarget);
    };
    const modalClose = (classe) => {
        setModal(null); 
    }; 
    const handleEmailLoginChange = (event) => {
      setEmailLogin(event.target.value);
    };
    const handleSenhaLoginChange = (event) => {
      setSenhaLogin(event.target.value);
    };
     
    async function fazerLogin(){
      if(emailLogin === ""){
        return setErrorLogin("Campos não podem ser vazios")
      }
      if(senhaLogin === ""){
        return setErrorLogin("Campos não podem ser vazios")
      }
      try {
        setErrorLogin('')
        await login(emailLogin, senhaLogin)
        alert("Bem vindo ao SpellBook");
        navigate.push('/')
      } catch (error) {
        setErrorLogin("Erro ao realizar Login");
      }

    }

  return (
    <Paper className={classes.root}>
        <Box className={classes.tittleBox}>
            <h1>Faça login ou crie sua conta.</h1>
            {errorLogin && <Alert severity="error">{errorLogin}</Alert>}
        </Box>
        <Box className={classes.loginBox}>
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handleEmailLoginChange}
                size="small" id="emailLogin" label="Email" variant="outlined"  
            />
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handleSenhaLoginChange}
                type="password" size="small" id="passwordLogin" label="Senha" variant="outlined"  
            />
            <Button className={classes.margin} onClick={fazerLogin} variant="contained" color="primary">Login</Button>
            <Button onClick={modalClick} className={classes.margin} variant="contained" color="secondary">Criar Conta</Button>
            <p className={classes.inputText}>Copyright © <a href="https://github.com/eduardoBalsamao">Eduardo</a></p>
        </Box>
        <Modal
            open={modal}
            onClose={modalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Register />
          </Modal>
    </Paper>
    
  );
}

export default Acesso;
