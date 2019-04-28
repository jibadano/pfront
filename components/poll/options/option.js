import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import ParticleEffectButton from 'react-particle-effect-button'

const styles = theme => ({
	content: { width: '100%', display: 'flex', zIndex: 1 },
	text: { padding: '18px 10px 10px 10px', fontSize: 16 },
	icon: { textAlign: 'center', fontSize: 30, padding: '5px 20px', fontWeight: 'bold', borderRight: '1px solid #ccc' },
	particles: {
		position: 'absolute',
		zIndex: 2,
		width: '100%'
	},
	progress: {
		background: '#ddd',
		position: 'absolute',
		height: '100%',
		top: 0,
		zIndex: -1
	},
	selected: {
		background: theme.palette.secondary.light
	}
})

const OptionIcon = ({ index, value, classes }) => (
	<Typography className={classes.icon} variant="h6">
		{index}
	</Typography>
)

const isVoted = value => Boolean(value || value == 0)

const Option = ({ classes, value, edit, text, info, avatar, onChange, onRemove, onClick, selected }) => (
	<>
		<div style={{ width: '100%' }}>
			<ParticleEffectButton hidden={isVoted(value)} className={classes.particles}>
				<ListItem dense style={{ padding: 0, background: 'white' }} button={!edit && !isVoted(value)} onClick={onClick}>
					<div className={classes.content}>
						<ListItemAvatar>
							<OptionIcon classes={classes} index={avatar} value={value} />
						</ListItemAvatar>
						{edit ? (
							<TextField
								value={text}
								onChange={event => onChange(event.target.value)}
								margin="normal"
								style={{ width: '100%', marginTop: 0, padding: '8px 15px 0 15px' }}
							/>
						) : (
							<ListItemText className={classes.text} primary={text} secondary={info} />
						)}
					</div>
				</ListItem>
			</ParticleEffectButton>
		</div>
		<ListItem dense style={{ padding: 0 }}>
			<div className={classes.content}>
				<div
					style={{
						width: `${Math.round(value * 100)}%`
					}}
					className={classnames(classes.progress, { [classes.selected]: selected })}
				/>
				<ListItemAvatar>
					<OptionIcon classes={classes} index={avatar} value={value} />
				</ListItemAvatar>
				<ListItemText className={classes.text} primary={text} secondary={info} />
			</div>
		</ListItem>
	</>
)

export default withStyles(styles)(Option)
