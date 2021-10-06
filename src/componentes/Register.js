import React, { useState } from 'react';
import { TextField, Button} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { useHistory  } from 'react-router-dom';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    main:{
        height: '90vh',
        display: 'flex',
        
    },
    toolbar:{
        minHeight: 30,
    },
    container: {
        display: 'flex',
        height: '80vh',
        marginTop: '5vh',
        flexDirection: 'column',
        backgroundColor: 'oldlace',

    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 400,
        backgroundColor: 'oldlace',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

      margin:{
        marginTop: 10,
    },
    classeText :{
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: 20,
        
    },
    input: {
        backgroundColor:'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
      },

}));
const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'lightsalmon',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'lightsalmon',
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

const Register = () => {
    const classes = useStyles();
    const navigate = useHistory();
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConf, setSenhaConf] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth()

    async function registerNew(){
      if(senha !== senhaConf){
        return setError("Senhas não batem")
      }
      try {
        setError('')
        await register(email, senha)
        navigate.push('/')
      } catch (error) {
        setError("Erro ao realizar registro")
      }

    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    const handleSenhaChange = (event) => {
      setSenha(event.target.value);
    };
    const handlesenhaConfChange = (event) => {
      setSenhaConf(event.target.value);
    };

    return(
        <div style={modalStyle} className={classes.paper}> 
            <h3>Crie sua conta</h3>
            {error && <Alert severity="error">{error}</Alert>}
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handleEmailChange}
                size="small" id="emailRegister" label="Email" variant="outlined" type="email" 
            />
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handleSenhaChange}
                type="password" size="small" id="password" label="Senha" variant="outlined"  
            />
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handlesenhaConfChange}
                type="password" size="small" id="passwordConfirm" label="Confirme Senha" variant="outlined"  
            />
            

            <Button className={classes.margin} onClick={registerNew} variant="contained" color="primary"> Criar Conta </Button>
    </div>
    );
}
export default Register;