import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames'
import PropTypes from 'prop-types';


const background = 'https://psmag.com/.image/t_share/MTUwODAxMDE2MDI2MDQ4MDM4/sebastian-unrau-47679.jpg'

const styles = theme => ({
  logo: {
    background: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.palette.primary.main
  },
  text: {
    margin:'auto',
    color: 'white'
  },
  black: {
    color: 'white',
    background: theme.palette.primary.main
  },
  textBlack: {
    color: theme.palette.primary.main,
  }
})

const Logo = ({ classes, black, type, title, size }) => (
  <div style={{ display: 'flex', width: size, height: size }}>
    <Avatar style={{ width: '100%', height: '100%' }} src={type === 'custom' ? background : null} className={classnames(classes.logo, { [classes.black]: black })}></Avatar>
    <Typography style={{ fontSize: size/2}} className={classnames(classes.text, { [classes.textBlack]: black })} variant="title"  >{title && 'Polls'}</Typography>
  </div>
)

Logo.PropTypes = {
  black: PropTypes.bool,
  title: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.string
}

Logo.defaultProps = {
  black: false,
  title: false,
  size: 45,
  type: null
}

export default withStyles(styles)(Logo)