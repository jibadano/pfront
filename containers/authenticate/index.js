import gql from 'graphql-tag'
import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import withMaterial from '../../lib/material'

import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import Error from '../../components/error'
import { ApolloConsumer, Mutation, Query } from 'react-apollo';

import { withStyles } from '@material-ui/core';
import get from 'lodash/get'

import Login from './login'
import Signup from './signup'
import Forgot from './forgot'
import Logo from '../../components/logo'

const styles = theme => ({
  container: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
  },
  leftSection: {
    backgroundImage:'url(https://lh3.googleusercontent.com/faXjOL66vNdY6NJRySdzGkmu0sQROm8nR_2eziJ4BI7ED8SBPTRXIwH2nrT892dUzdoLPygULK2oZEKgWhRSzRe6=w1440-h810-p)',
    width: '100%',
    background: theme.palette.primary.main
  },
  block: {
    padding: 15
  },
  button: {
    margin: '15px 0'
  },
  linkButton: {
    cursor: 'pointer'
  }
})

class Authenticate extends React.Component {
  state = { nav: 'login' }

  navigate(nav) {
    this.setState({ nav })
  }

  render() {
    let { onSuccess, classes } = this.props
    let { nav } = this.state
    return (
      <Grid container className={classes.container} direction="row-reverse" >
        <Grid container xs={12} sm={7} style={{ height: '100%' }} justify="center" alignItems="center" direction="column"  >
          <Logo className={classes.backgroundLogo} black minimal />
          <div style={{ margin: '0 25%' }}>
            {nav === 'login' && (
              <>
                <Login classes={classes} onSuccess={onSuccess} />
                <Typography>I think i need to <b onClick={() => this.navigate('create')} className={classes.linkButton} > Create an account</b>. I'm afraid <b onClick={() => this.navigate('forgot')} className={classes.linkButton} >I forgot my password</b></Typography>
              </>
            )}
            {nav === 'create' && (
              <>
                <Signup classes={classes} onSuccess={onSuccess} />
                <Typography>Actually I've just remember that <b onClick={() => this.navigate('login')} className={classes.linkButton} > I have an account</b></Typography>
              </>
            )}
            {nav === 'forgot' && (
              <>
                <Forgot classes={classes} />
                <Typography>Actually I've just remember my account<b onClick={() => this.navigate('login')} className={classes.linkButton} > take me to the login</b></Typography>
              </>
            )}
          </div>
        </Grid>
        <Grid container className={classes.leftSection} xs={12} sm={5} style={{ height: '100%' }} justify="center" alignItems="center" direction="column" >
          <Logo size={120} title />
        </Grid>
      </Grid >
    )
  }
}

export default withMaterial(withStyles(styles)(Authenticate))