import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  logo: {
    background:'white',
    color:"#222",
    fontWeight:'bold',
    fontSize:30
  }
}

const Header = ({ classes, children }) => (
  <AppBar position="fixed">
    <Toolbar >
      <Avatar className={classes.logo}>P</Avatar>
      <Typography variant="h5" color="inherit" >OLLO</Typography>
      <div style={{ position: 'absolute', right: 0 }}>
        {children}
      </div>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)