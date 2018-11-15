import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import SettingsIcon from '@material-ui/icons/Settings'

import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'


const styles = theme => ({

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class Config extends React.Component {
  state = { expanded: false, privacy: { poll: true, results: false, users: [] } }

  tooglePrivacy = () => {
    this.setState(state => {
      state.privacy.poll = !state.privacy.poll
      return state
    })
  }

  toogleResultsPrivacy = () => {
    this.setState(state => {
      state.privacy.results = !state.privacy.results
      return state
    })
  }

  render() {
    const { classes, onSave, onChange, onCancel } = this.props
    const { expanded, privacy } = this.state

    return <div>
      <Collapse in={expanded} timeout="auto" >
        <Button variant="raised" color={!privacy.poll ? 'secondary' : null} onClick={this.tooglePrivacy}>Public poll</Button>
        <Button variant="raised" color={!privacy.results ? 'secondary' : null} onClick={this.toogleResultsPrivacy}>Public results</Button>
      </Collapse>
      <CardActions disableActionSpacing>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => this.setState({ expanded: !expanded })}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => onSave({ privacy })}><SendIcon /></IconButton>
      </CardActions>

    </div>
  }

}


Config.defaultProps = {
  onSave: () => { },
  onChange: () => { }
}

Config.propTypes = {
  onSave: PropTypes.func,
  onChange: PropTypes.func
}

export default withStyles(styles)(Config)
