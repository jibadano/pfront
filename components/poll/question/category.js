import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  category: {
    display: 'inline-flex',
    backgroundColor: theme.palette.primary.main,
    width: 'auto',
    padding: '0 10px 0 8px',
    marginRight: 5
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    fontStyle: 'italic',
  },
  avatar: {
    color: 'white',
    marginRight: 2,
    fontSize: 16,
    fontWeight: 'bold'
  },
  removeIcon:{
    width:15,
    height:15,
    color:'white',
    fontSize:15
  }
})

const Category = ({ classes, name, onRemove }) => (
  <div className={classes.category}>
    <Typography className={classes.avatar}>#</Typography>
    <Typography className={classes.text}>{name}</Typography>
    {onRemove && <IconButton onClick={onRemove} className={classes.removeIcon}>X</IconButton>}
  </div>
)

Category.propTypes = {
  name: PropTypes.string,
  onRemove: PropTypes.func
}

Category.defaultProps = {
  name: '',
  onRemove: null
}

export default withStyles(styles)(Category)