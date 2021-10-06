import React, { Fragment, useEffect } from 'react';
//import './style.css'
import { makeStyles, } from '@material-ui/core/styles';
import  {
    Container, Box, Divider,  
    List, ListItem, ListItemIcon, Avatar, ListItemText,
    Button, Dialog, DialogTitle, DialogContent, IconButton
}  from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Header from '../componentes/Header'
import Collapse from '@material-ui/core/Collapse';
import {useAuth} from '../context/AuthContext';
import {database} from '../firebase';
import { useParams  } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import CancelIcon from '@material-ui/icons/Cancel';


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
        display: 'flex',
        minHeight: '90vh'
    },
    grow:{
        flexGrow: 1
    },
    toolbar:{
        minHeight: 30,
    },
    margin:{
        marginBottom: 10,
        justifySelf: 'end'
    },
    pagination:{
        marginTop: 15,
        marginBottom: 10,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '90%',
        backgroundColor: 'oldlace',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    container: {
        display: 'flex',
        height: 'auto',
        marginBottom: '2vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'oldlace',
        width: '85%'
    },

    containerHeader:{
        display: 'flex',
        flexDirection: 'row',
        height: '8%',
        //backgroundColor: 'red',
        width: '100%',
    },

    containerMagic:{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        //backgroundColor: 'green',
        width: '95%',
        marginBottom: 10,

    },

    containerDivider:{
        display: 'flex',
        height: 0.5,
        backgroundColor: 'gray',
        width: '100%',
    },

    marginText: {
        marginRight: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },

    marginText2:{
        marginRight: 10,
        fontWeight: 'bold',
    },

    text:{
        marginRight: 20,
    },
    orange: {
        color: 'white',
        backgroundColor: 'orange',
    },
    list:{
        backgroundColor: 'snow',
        marginTop: 5,
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedRight: {
        justifyContent: 'flex-end',
    },

    button:{
        marginBottom: 10,
    },

    desc:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },

    textDesc:{
        whiteSpace: 'pre-line',
        color: 'red'
    },
    btnClose:{
        color: 'red',
        position: 'absolute',
         right: theme.spacing(3),
        top: theme.spacing(3),
    }

}));

const Spellbook = () =>{
    let { currentId } = useParams();
    const {currentUser} = useAuth();
    const classes = useStyles();
    const [openTricks, setOpenTricks] = React.useState();
    const [habs, setHabs] = React.useState([]);
    const [openHabs, setOpenHabs] = React.useState();
    const [personagem, setPersonagem] = React.useState([]);
    const [magias, setMagias] = React.useState([]);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
     
    const [currentPage, setCurrentPage] = React.useState(1);
    const [magiasPorPage, setMagiasPorPage] = React.useState(5);

    //Calculos para paginação das magias
    const lastMagic = currentPage * magiasPorPage; //Index da primeira magia
    const firstMagic = lastMagic - magiasPorPage; //Index da ultima magia
    const currentMagic = magias.slice(firstMagic, lastMagic); //Pagina com as magias atuais

    async function personagemFetch () {
        await database.ref(`/users/${currentUser.uid}/personagens/${currentId}`)
        .on('value', (snapshot) => {
            const personagens = {
              id: snapshot.key, //Indentificador 
              nome: snapshot.val().nomePersonagem, //Nome
              classe: snapshot.val().classe, //Classe
            };
            setPersonagem(personagens);
        })
    }

    async function magiasFetch() {
        await database.ref(`/Magias/`)
        .on('value', (snapshot) => {
          let m = []; //Data temporaria
          snapshot.forEach(item => {
            const magiasList = {
                id: item.key,
                nome: item.val().nome,
                alcance: item.val().alcance,
                componentes: item.val().componentes,
                desc: item.val().desc,
                duracao: item.val().duracao,
                nivel: item.val().nivel,
                tempo: item.val().tempo,
            };
            m.push(magiasList);
          });
          m.sort(compare)
          setMagias(m)
          
        })
      }

      async function habsFetch() {
        await database.ref(`/users/${currentUser.uid}/personagens/${currentId}/habilidadesSalvas`)
        .on('value', (snapshot) => {
          let m = []; //Data temporaria
          snapshot.forEach(item => {
            const habsList = {
                id: item.key,
                nome: item.val().nome,
                alcance: item.val().alcance,
                componentes: item.val().componentes,
                desc: item.val().desc,
                duracao: item.val().duracao,
                nivel: item.val().nivel,
                tempo: item.val().tempo,
            };
            m.push(habsList);
          });
          m.sort(compare)
          setHabs(m)
        })
      }

      function compare( a, b ) {
        if ( a.nivel < b.nivel ){
          return -1;
        }
        if ( a.nivel > b.nivel ){
          return 1;
        }
        return 0;
      }

    useEffect(() => {
        personagemFetch();
        magiasFetch();
        habsFetch();

    }, [])

    const handleClickTricks = (itemID1) => {
        if(itemID1 !== openTricks){
            setOpenTricks(itemID1);
        }else{
            setOpenTricks(null);
        }   
    };

    const handleClickHabs = (itemID3) => {
        if(itemID3 !== openHabs){
            setOpenHabs(itemID3);
        }else{
            setOpenHabs(null);
        }
    };

    function editedString(string) {

        string.split("~").map((i,key) => {
            return <p key={key}>{i}</p>;
        })
      }

    return(
        <div>
            <Header />
            <div className={classes.toolbar}></div>
            <main className = {classes.main}>
                <Container disableGutters={true} className={classes.container} maxWidth="lg">
                    <Box className={classes.containerHeader}>
                      <p className={classes.marginText}>Nome: </p>
                      <p className={classes.text}>{personagem.nome} </p>
                      <Divider orientation="vertical" />

                      <p className={classes.marginText}>Classe: </p>
                      <p className={classes.text}>{personagem.classe} </p>
                    </Box> 

                    <Box className={classes.containerDivider} />
                    {/* Container de Truques */}
                    <Box className={classes.containerMagic}>
                        {/* <Button className={classes.margin} variant="contained" color="primary"  onClick={handleClick}>teste</Button> */}
                        <h3>Magias</h3>
                        <List component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            {habs.map((item) => (
                                <Fragment key={item.id}>
                                    <ListItem className={classes.list} button key={item.id} onClick={() => handleClickHabs(item.id)}>
                                        <ListItemIcon >
                                            <Avatar className={classes.orange}>{item.nivel.substr(0, 1)}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={item.nome} secondary={item.nivel}></ListItemText>
                                        {openHabs === item.id ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItem>
                                    <Divider />
                                    <Collapse in={openHabs === item.id} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary="Tempo de Conjuração: " secondary={item.tempo} />
                                        </ListItem>
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary="Alcance: " secondary={item.alcance} />
                                        </ListItem>
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary="Componentes: " secondary={item.componentes} />
                                        </ListItem>
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary="Duração: " secondary={item.duracao} />
                                        </ListItem>
                                        <ListItem className={classes.nested}>
                                            <ListItemText primary="Descrição: " secondary={ <div style={{whiteSpace: 'pre-line'}}>{item.desc}</div> } />
                                        </ListItem>
                                        <ListItem className={classes.nestedRight}>
                                                <Button className={classes.margin} variant="contained" color="primary"  
                                                onClick={()=>{
                                                         database.ref(`/users/${currentUser.uid}/personagens/${currentId}/habilidadesSalvas/${item.id}`).remove()
                                                }}>
                                                    Remover</Button>
                                            </ListItem>
                                    </List>
                                    </Collapse>
                                </Fragment>
                            ))}
                        </List>
                    </Box>
                    <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Button>

                    
                    {/* Fim Container de Truqes */}


                </Container>                
            </main>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    <p>Seleção de magias</p>
                    <IconButton aria-label="close" className={classes.btnClose} onClick={handleClose}>
                        <CancelIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Container>
                        <List 
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            >
                                {currentMagic.map((item) => (
                                    <Fragment key={item.id}>
                                        <ListItem className={classes.list} button key={item.id} onClick={() => handleClickTricks(item.id)}>
                                            <ListItemIcon >
                                                <Avatar className={classes.orange}>{item.nivel.substr(0, 1)}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText primary={item.nome} secondary={item.nivel}></ListItemText>
                                            {openTricks === item.id ? <ExpandLess/> : <ExpandMore/>}
                                        </ListItem>
                                        <Divider />
                                        <Collapse in={openTricks === item.id} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem className={classes.nested}>
                                                <ListItemText primary="Tempo de Conjuração: " secondary={item.tempo} />
                                            </ListItem>
                                            <ListItem className={classes.nested}>
                                                <ListItemText primary="Alcance: " secondary={item.alcance} />
                                            </ListItem>
                                            <ListItem className={classes.nested}>
                                                <ListItemText primary="Componentes: " secondary={item.componentes} />
                                            </ListItem>
                                            <ListItem className={classes.nested}>
                                                <ListItemText primary="Duração: " secondary={item.duracao} />
                                            </ListItem>
                                            <ListItem className={classes.nested}>
                                                <ListItemText primary="Descrição: " secondary={<div style={{whiteSpace: 'pre-line'}}>{item.desc}</div>} />
                                            </ListItem>
                                            <ListItem className={classes.nestedRight}>
                                                <Button className={classes.margin} variant="contained" color="primary"  
                                                onClick={()=>{
                                                         database.ref(`/users/${currentUser.uid}/personagens/${currentId}/habilidadesSalvas`).push({
                                                            nome: item.nome,
                                                            nivel: item.nivel,
                                                            tempo: item.tempo,
                                                            alcance: item.alcance,
                                                            componentes: item.componentes,
                                                            duracao: item.duracao,
                                                            desc: item.desc,
                                                          }).then(()=>{
                                                            alert("Magia adicionada com sucesso")
                                                          })
                                                }}>
                                                    Adicionar Magia</Button>
                                            </ListItem>
                                            

                                        </List>
                                        </Collapse>
                                    </Fragment>
                                ))}
                            </List>
                            <Pagination className={classes.pagination} onChange={(event, value)=> setCurrentPage(value)} count={Math.ceil(magias.length / magiasPorPage)} color="secondary" />
                    </Container>
                
                </DialogContent>
            </Dialog>
        </div>
    );

}

export default Spellbook;