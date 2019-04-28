import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AccountIcon from '@material-ui/icons/Person'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
	category: {
		display: 'inline-flex',
		backgroundColor: theme.palette.primary.main,
		width: 'auto',
		padding: '0 10px 0 8px',
		marginRight: 5,
		marginTop: 5
	},
	text: {
		fontSize: 14,
		fontWeight: 500,
		color: 'white',
		fontStyle: 'italic'
	},
	avatar: {
		color: 'white',
		marginRight: 2,
		fontSize: 16,
		fontWeight: 'bold'
	},
	removeIcon: {
		width: 15,
		height: 15,
		color: 'white',
		fontSize: 18
	}
})

const Category = ({ classes, name, onRemove, type, onClick }) => (
	<div className={classes.category} onClick={onClick}>
		{type === 'USER' ? (
			<Typography className={classes.avatar} style={{ fontSize: 10, padding: '4px 3px 0 0' }}>
				<AccountIcon className={classes.removeIcon} />
			</Typography>
		) : (
			<Typography className={classes.avatar}>#</Typography>
		)}
		<Typography className={classes.text}>{name}</Typography>
		{onRemove && (
			<IconButton onClick={onRemove} className={classes.removeIcon}>
				<CloseIcon />
			</IconButton>
		)}
	</div>
)

Category.propTypes = {
	name: PropTypes.string,
	onRemove: PropTypes.func,
	onClick: PropTypes.func
}

Category.defaultProps = {
	name: '',
	onRemove: null,
	onClick: () => {}
}

export default withStyles(styles)(Category)
