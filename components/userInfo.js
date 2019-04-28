import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import LogOutIcon from '@material-ui/icons/PowerSettingsNew'

import LinearProgress from '@material-ui/core/LinearProgress'

import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Category from './poll/question/category'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const styles = theme => ({
	card: { width: '100%' },
	content: { padding: 10 },
	avatar: {
		backgroundColor: theme.palette.primary.main,
		width: 200,
		height: 200,
		margin: 'auto',
		fontSize: 120
	},
	actions: {
		background: theme.palette.primary.main
	}
})

class UserInfo extends React.Component {
	state = { interest: true }
	constructor(props) {
		super(props)
	}

	render() {
		const { email, firstName, lastName, avatar, onLogout, classes, contrast } = this.props
		return (
			<Card className={classes.card}>
				<CardActions className={classes.actions}>
					<Button variant="contained" color="primary">
						Hand shake
					</Button>
					<Button variant="contained" color="primary">
						Report
					</Button>
					<Button variant="contained" color="primary">
						Edit profile
					</Button>
					<Button variant="contained" color="primary" onClick={onLogout}>
						Log out
						<LogOutIcon style={{ marginLeft: 10 }} />
					</Button>
				</CardActions>
				<CardContent>
					<Grid container direction="row-reverse" justify="center" spacing={40}>
						<Grid item sm={4} xs={12}>
							<Avatar className={classes.avatar} src={avatar}>
								{email.slice(0, 1).toUpperCase()}
							</Avatar>
						</Grid>
						<Grid item sm={8} xs={8}>
							<Grid container justify="center" spacing={16}>
								<Grid item xs={12}>
									<Typography variant="h6" align="center">
										{firstName} {lastName}
										<Typography variant="caption" color="textSecondary">
											{email}
										</Typography>
									</Typography>
								</Grid>

								{contrast && (
									<>
										<Grid item xs={12} style={{ display: 'flex' }}>
											<Typography style={{ width: '33.33%' }} variant="h6" align="center" color="textSecondary">
												{contrast.polls} polls
											</Typography>
											<Typography style={{ width: '33.33%' }} variant="h6" align="center" color="textSecondary">
												{contrast.voted} votes
											</Typography>
											<Typography style={{ width: '33.33%' }} variant="h6" align="center" color="textSecondary">
												100 votes
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6} style={{ padding: '30px 0', textAlign: 'center' }}>
											{contrast.interests.map(category => (
												<Category name={category.name} />
											))}
										</Grid>
									</>
								)}
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		)
	}
}

UserInfo.propTypes = {}

export default withStyles(styles)(UserInfo)
