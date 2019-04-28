import React from 'react'
import PropTypes from 'prop-types'
import SendIcon from '@material-ui/icons/Send'
import SettingsIcon from '@material-ui/icons/Settings'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'

const styles = theme => ({
	expand: {
		float: 'left',
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			marginRight: -8
		}
	},
	icon: {
		marginLeft: 10
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	actions: {
		background: theme.palette.primary.main,
		width: '100%'
	}
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

		return (
			<div>
				<Collapse in={expanded} timeout="auto">
					<Grid container spacing={8} style={{ width: '100%', padding: 20 }}>
						<Grid item xs={12} sm={6}>
							<Tooltip title="Poll will be visible for anyone">
								<FormControlLabel
									control={<Switch checked={privacy.poll} onChange={this.tooglePrivacy} color="secondary" />}
									label={<Typography>Public poll</Typography>}
								/>
							</Tooltip>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tooltip title="Results will be visible">
								<FormControlLabel
									control={<Switch checked={privacy.results} onChange={this.toogleResultsPrivacy} color="secondary" />}
									label={<Typography>Public results</Typography>}
								/>
							</Tooltip>
						</Grid>
					</Grid>
				</Collapse>

				<CardActions className={classes.actions}>
					<Button onClick={() => this.setState({ expanded: !expanded })}>
						Config
						<SettingsIcon
							className={classnames(classes.icon, classes.expand, {
								[classes.expandOpen]: expanded
							})}
						/>
					</Button>
					<Button variant="contained" color="primary" onClick={() => onSave({ privacy })}>
						Done
						<SendIcon className={classes.icon} />
					</Button>
				</CardActions>
			</div>
		)
	}
}

Config.defaultProps = {
	onSave: () => {},
	onChange: () => {}
}

Config.propTypes = {
	onSave: PropTypes.func,
	onChange: PropTypes.func
}

export default withStyles(styles)(Config)
