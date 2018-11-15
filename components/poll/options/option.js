import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: { width: '100%', display: 'flex', zIndex: 1 },
  text: { padding: 10, fontSize: 16 },
  iconPercentage: { fontSize: 20, color: 'white', padding: '10px 20px', fontWeight: 'bold' },
  icon: { fontSize: 30, padding: '5px 20px', fontWeight: 'bold', borderRight: '1px solid #ccc' }
}

let OptionIcon = ({ classes, index, value }) => value || value == 0 ?
  <Typography className={classes.iconPercentage} style={{ color: value === 0 ? '#222' : '#fff' }} variant="title">{value * 100}</Typography> :
  <Typography className={classes.icon} variant="title">{index}</Typography>


const Option = ({ classes, value, edit, text, info, avatar, onChange, onRemove, onClick }) => (
  <ListItem dense style={{ padding: 0 }} button={!edit} onClick={onClick} >
    <LinearProgress color="secondary" style={{ width: '100%', position: 'absolute', height: '100%', background: 'white' }} variant="determinate" value={value ? value * 100 : 0} />

    <div className={classes.content}>
      <ListItemAvatar>
        <OptionIcon classes={classes} index={avatar} value={value} />
      </ListItemAvatar>
      {edit ?
        <TextField
          value={text}
          onChange={event => onChange(event.target.value)}
          margin="normal"
          style={{ width: '100%', marginTop: 0, padding: '0px 15px' }}
        /> : <ListItemText className={classes.text} primary={text} secondary={info} />
      }
    </div>
  </ListItem>
)

export default withStyles(styles)(Option)