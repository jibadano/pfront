import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
	progressBar: { background: '#eee' },
	progress: { margin: '10px 0', height: 5 },
	comment: {
		padding: 0,
		margin: '10px 0'
	},
	avatar: {
		width: 32,
		height: 32,
		fontSize: 14,
		fontWeight: 'bold'
	}
})

let LoadingText = ({ classes, ...props }) => (
	<LinearProgress {...props} classes={{ barColorPrimary: classes.progressBar }} className={classes.progress} />
)
LoadingText = withStyles(styles)(LoadingText)

const LoadingPoll = ({ classes }) => (
	<ListItem dense className={classes.comment}>
		<Avatar className={classes.avatar} />
		<ListItemText primary={<LoadingText style={{ width: '50%' }} />} secondary={<LoadingText style={{ width: '40%' }} />} />
	</ListItem>
)

export default withStyles(styles)(LoadingPoll)
