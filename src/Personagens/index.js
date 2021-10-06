import React, {useEffect} from 'react';
//import './style.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import  Container  from '@material-ui/core/Container';
import  Box  from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import {useAuth} from '../context/AuthContext';
import {database} from '../firebase';
import { useHistory  } from 'react-router-dom';
import Header from '../componentes/Header'
import { TextField, Button, Menu, MenuItem, Modal, List, ListItem, ListItemIcon, 
  Dialog, DialogTitle , DialogContent, DialogContentText, DialogActions  
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookIcon from '@material-ui/icons/MenuBook';
  
function getModalStyle() {
  const top = 30;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    main:{
        display: 'flex',
    },
    toolbar:{
        minHeight: 30,
    },
    button:{
      marginLeft: 20,
      color: '#ff2400',
      borderColor: '#ff2400'
    },

    container: {
      display: 'flex',
      height: 'auto',
      marginBottom: '2vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'oldlace',
      width: '85%',
      minHeight: '100vh',

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
        marginBottom: 20,
        backgroundColor: 'snow'
    },
    classeText :{
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: 20,
        
    },
    containerHeader:{
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 'auto',
      width: '100%',
    },
    buttonHeader:{
      maxHeight: '50%'
    },
    containerBody: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '80%',
      backgroundColor: 'oldlace',
      marginTop: 40,
    },
    list:{
      backgroundColor: 'snow',
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

const Personagens = () =>{
    const {currentUser} = useAuth();
    const navigate = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [personagem, setPersonagem] = React.useState("");
    const [modal, setModal] = React.useState(null);
    const [raca, setRaca] = React.useState("Lista");
    const [imagem, setImagem] = React.useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickClose = () => {
      setOpen(false);
    };

    async function personagemFetch () {
      await database.ref(`/users/${currentUser.uid}/personagens/`)
      .on('value', (snapshot) => {
        let d = []; //Data temporaria
        snapshot.forEach(item => {
          const personagens = {
            id: item.key, //Indentificador 
            nome: item.val().nomePersonagem, //Nome
            classe: item.val().classe,
            img: item.val().img,
          };
          d.push(personagens);
        });
        setData(d);
        console.log(data)
      })
    }

   useEffect(() => {
    personagemFetch();

   }, [])

    const handlePersonagem = (event) => {
      setPersonagem(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (classe, img) => {
        setAnchorEl(null);
        setRaca(classe);  
        setImagem(img);
    };

    const modalClick = (event) => {
        setModal(event.currentTarget);
    };

    const modalClose = (classe) => {
        setModal(null);        
    };
    

    const handleSubmit = () => {
      if ( raca === "Lista" || null ){
        return alert("Selecione uma classe para seu personagem!");
      }
      if( personagem === ""){
        return alert("O nome do personagem está vazio!");
      }
      database.ref(`/users/${currentUser.uid}/personagens`).push({
        nomePersonagem: personagem,
        classe: raca,
        img: imagem
      }).then(()=>{
        alert("Personagem criado com sucesso");
        modalClose();
      })
    }

    const body =(
        <div style={modalStyle} className={classes.paper}> 
            <CssTextField 
                InputLabelProps={{className: classes.inputText}} 
                InputProps={{className: classes.inputText}} 
                className={classes.input} 
                onChange={handlePersonagem}
                size="small" id="standard-secondary" label="Nome" variant="standard"  
            />
            <p>Classe:</p>
            <Button className={classes.margin}  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {raca}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={()=>handleClose(raca)}
            >
                <MenuItem onClick={()=>handleClose("Barbaro", "https://i.imgur.com/B9PTPKr.png")}>Barbaro</MenuItem>
                <MenuItem onClick={()=>handleClose("Bardo","https://i.imgur.com/64r5QD2.png")}>Bardo</MenuItem>
                <MenuItem onClick={()=>handleClose("Bruxo","https://i.imgur.com/URVS4WK.png")}>Bruxo</MenuItem>
                <MenuItem onClick={()=>handleClose("Clerigo","https://i.imgur.com/JkKCBaH.png")}>Clerigo</MenuItem>
                <MenuItem onClick={()=>handleClose("Druida","https://i.imgur.com/16ikww2.png")}>Druida</MenuItem>
                <MenuItem onClick={()=>handleClose("Feiticeiro","https://i.imgur.com/2jZS4Va.png")}>Feiticeiro</MenuItem>
                <MenuItem onClick={()=>handleClose("Guerreiro","https://i.imgur.com/GEJYiMD.png")}>Guerreiro</MenuItem>
                <MenuItem onClick={()=>handleClose("Ladino","https://i.imgur.com/xLAcjG1.png")}>Ladino</MenuItem>
                <MenuItem onClick={()=>handleClose("Mago","https://i.imgur.com/gY0MWlX.png")}>Mago</MenuItem>
                <MenuItem onClick={()=>handleClose("Monge","https://i.imgur.com/wLb10sw.png")}>Monge</MenuItem>
                <MenuItem onClick={()=>handleClose("Paladino","https://i.imgur.com/rhkFDM8.png")}>Paladino</MenuItem>
                <MenuItem onClick={()=>handleClose("Ranger","https://i.imgur.com/IPa1hUh.png")}>Patrulheiro</MenuItem>
            </Menu>
            <Button onClick={handleSubmit} variant="contained" color="primary" >OK</Button>
        </div>
    )
    return(
        <div>
            <Header />
            <div className={classes.toolbar}></div>
            <main className = {classes.main}>
                <Container className={classes.container} maxWidth="lg">
                    <Box className={classes.containerHeader}>
                      <p className={classes.classeText}>Bem vindo: {currentUser.email}</p>
                      <Button className={classes.buttonHeader} color="primary" variant="contained" onClick={modalClick}>Criar novo personagem</Button>
                    </Box> 
                    <Divider />
                    <Box className={classes.containerBody}>
                      {
                        data.map((item) =>(
                          
                          <List component="nav" aria-label="main mailbox folders">
                            <ListItem className={classes.list}>
                            <ListItemIcon >
                              <Avatar src={item.img} />
                            </ListItemIcon>
                            <ListItemText primary={item.nome} secondary={item.classe}></ListItemText>
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<MenuBookIcon />}
                              onClick={()=>navigate.push(`/livro/${item.id}`)}
                            >SpellBook</Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              className={classes.button}
                              onClick={handleClickOpen}
                            >Deletar</Button>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">{"Deseja excluir este personagem?"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {`Ao excluir este personagem você perdera acesso as magias salvas para ele para sempre!
                                  Deseja continuar?`}
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClickClose} color="primary">
                                  Não
                                </Button>
                                <Button onClick={()=>{database.ref(`/users/${currentUser.uid}/personagens/${item.id}`).remove().then(handleClickClose)}} color="primary" autoFocus>
                                  Sim
                                </Button>
                              </DialogActions>
                            </Dialog>
                        </ListItem>
                        <Divider />
                        </List>
                        ))
                      }
                    </Box>    
                </Container>
                <Modal
                    open={modal}
                    onClose={modalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </main>
        </div>
    );

}

export default Personagens;