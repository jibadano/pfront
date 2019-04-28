import Avatar from '@material-ui/core/Avatar'
import Link from 'next/link'

import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import { PollContext } from '.'

const styles = theme => ({
	avatar: {
		backgroundColor: theme.palette.primary.main,
		cursor: 'pointer'
	}
})

let Header = ({ username, avatar, date, classes }) => (
	<PollContext.Consumer>
		{edit => (
			<CardHeader
				avatar={
					<Link href={`/user?users=${username}`}>
						<Avatar className={classes.avatar} src={avatar}>
							{username.slice(0, 1).toUpperCase()}
						</Avatar>
					</Link>
				}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title={
					<Link href={`/user?users=${username}`}>
						<Typography style={{ cursor: 'pointer' }} variant="body1">
							{username}
						</Typography>
					</Link>
				}
				subheader={edit ? 'New poll' : date.toDateString()}
			/>
		)}
	</PollContext.Consumer>
)

Header.defaultProps = {
	username: 'unknown',
	edit: false,
	date: new Date()
}

Header.propTypes = {
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	edit: PropTypes.bool,
	date: PropTypes.object
}

export default withStyles(styles)(Header)
