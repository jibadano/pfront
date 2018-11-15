import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  comment: {
    padding:0,
    margin:'10px 0'
  },
  avatar: {
    width:32,
    height:32,
    fontSize:14,
    fontWeight:'bold'
  }
})


const Comment = ({ classes, comment: { user, text } }) => (
  <ListItem dense className={classes.comment}>
    <Avatar className={classes.avatar}>{user[0]}</Avatar>
    <ListItemText primary={user} secondary={text} />
  </ListItem>
)

export default withStyles(styles)(Comment)