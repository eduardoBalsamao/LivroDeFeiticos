import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from '../componentes/Header'
import { Box, Container, TextField, Button } from '@material-ui/core';
import {database} from '../firebase';
  

const useStyles = makeStyles((theme) => ({
    main:{
        height: 'auto',
        display: 'flex',
        
    },
    toolbar:{
        minHeight: 30,
    },
    container: {
        display: 'flex',
        height: 'auto',
        marginBottom: '5vh',
        flexDirection: 'column',
        backgroundColor: 'oldlace',
        width: '90%',

    },
    input: {
        width: '100%',
        backgroundColor:'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        margin: 15,
    },

  inputText:{
      color:'lightsalmon',
  },

  box:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  boxReverse:{
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginRight: 10,
  },
  buttonC:{
    marginBottom:'10px'
  }

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

function Adm() {
    const classes = useStyles();
    const [nomeMagic, setNomeMagic] = useState("");
    const [nivelMagic, setNivelMagic] = useState("");
    const [timeMagic, setTimeMagic] = useState("");
    const [alcanceMagic, setAlcanceMagic] = useState("");
    const [componentesMagic, setComponentesMagic] = useState("");
    const [duracaoMagic, setDuracaoMagic] = useState("");
    const [descMagic, setDescMagic] = useState("");

    const nomePicker = (event) => {
      setNomeMagic(event.target.value);
    };

    const nivelPicker = (event) => {
      setNivelMagic(event.target.value);
    };

    const timePicker = (event) => {
      setTimeMagic(event.target.value);
    };

    const alcancePicker = (event) => {
      setAlcanceMagic(event.target.value);
    };

    const componentesPicker = (event) => {
      setComponentesMagic(event.target.value);
    };

    const duracaoPicker = (event) => {
      setDuracaoMagic(event.target.value);
    };

    const descPicker = (event) => {
      setDescMagic(event.target.value);
    };

    function databaseRegister(){
      try {
        database.ref(`/Magias/${nomeMagic}`).set({
          nome: nomeMagic,
          nivel: nivelMagic,
          tempo: timeMagic,
          alcance: alcanceMagic,
          componentes: componentesMagic,
          duracao: duracaoMagic,
          desc: descMagic,
        }).then(()=>{
          alert("Magia adicionada com sucesso")
        })
      } catch(erro) {
        alert("Erro ao inserir os dados")
      }
    }
    return (
        <div>
            <Header />
            <div className={classes.toolbar}></div>
            <main className = {classes.main}>
                <Container className={classes.container} maxWidth="lg">
                    <h3>Adicionar novas magias:</h3>
                        <Box className={classes.box}>
                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={nomePicker}
                              size="small" id="magic_name" label="Nome" variant="outlined"  
                          />

                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={nivelPicker}
                              size="small" id="nivel_magic" label="Nivel" variant="outlined"  
                          />

                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={timePicker}
                              size="small" id="time_magic" label="Tempo de Conjuração" variant="outlined"  
                          />

                        </Box>
                        <Box className={classes.box}>

                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={alcancePicker}
                              size="small" id="alcance_magic" label="Alcance" variant="outlined"  
                          />

                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={componentesPicker}
                              size="small" id="componentes_magic" label="Componentes" variant="outlined"  
                          />

                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={duracaoPicker}
                              size="small" id="duracao_magic" label="Duração" variant="outlined"  
                          />

                        </Box>
                        <Box className={classes.box}>
                          <CssTextField 
                              InputLabelProps={{className: classes.inputText}} 
                              InputProps={{className: classes.inputText}} 
                              className={classes.input} 
                              onChange={descPicker}
                              multiline
                              rows={14}
                              id="desc_magic" label="Descrição" variant="outlined"  
                          />
                        </Box>
                        <Box className={classes.boxReverse}>
                          <Button onClick={databaseRegister} className={classes.buttonC} variant="contained" color="primary"> Registrar Magia </Button>
                        </Box>
                        
                </Container>
            </main>
        </div>
    )
}


export default Adm;