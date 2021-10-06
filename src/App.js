import React from 'react';
import Home from './Home'
import Personagens from './Personagens'
import Spellbook from './Spellbook'
import Adm from './Adm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './componentes/PrivateRoute'

const useStyles = makeStyles({
  root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${"https://i.imgur.com/NQk6uON.jpg"})`,
      backgroundRepeat: 'repeat',
  },

})

function App() {
  const classes = useStyles();
  return (
    
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Personagens}></PrivateRoute>
                <Route path="/login" component={Home}></Route>
                <Route path="/livro/:currentId" component={Spellbook}></Route>
                <PrivateRoute path="/admInsertMagics" component={Adm}></PrivateRoute>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </ThemeProvider>
  );
}

export default App;
