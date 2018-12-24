import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';

import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import color1 from '@material-ui/core/colors/amber';
import color2 from '@material-ui/core/colors/indigo';
import color3 from '@material-ui/core/colors/blue';
import color4 from '@material-ui/core/colors/green';
import color5 from '@material-ui/core/colors/red';


const styles = {
  content: { width: '100%', display: 'flex', zIndex: 1 },
  text: { padding: '18px 10px 10px 10px', fontSize: 16 },
  iconPercentage: {
    position: 'relative',
    fontSize: 12,
    width: 12,
    top: 18
  },
  icon: { textAlign: 'center', fontSize: 30, padding: '5px 20px', fontWeight: 'bold', borderRight: '1px solid #ccc' },
  bar: {  width: '100%', position: 'absolute', bottom: 0, background: 'white' },
  progressBar: { background: '#222' },
  progress: { background: 'transparent' },
  1: { background: color1[300] },
  2: { background: color2[300] },
  3: { background: color3[300] },
  4: { background: color4[300] },
  5: { background: color5[300] },
}


const OptionIcon = ({ classes, index, value }) => <Typography className={classes.icon} variant="h6">{index}</Typography>

const Option = ({ classes, value, edit, text, info, avatar, onChange, onRemove, onClick }) => (
  <ListItem dense style={{ padding: 0 }} button={!edit} onClick={onClick} >
    <LinearProgress classes={{ barColorPrimary: classes[avatar], colorPrimary: classes.progress }} className={classes.bar} variant="determinate" value={value ? value * 100 : 0} />


    <Fade in={value || value == 0} timeout={1000}>
      <Typography
        className={classes.iconPercentage}
        style={{ left: `calc(${Math.round(value * 100)}% - 30px)` }}
        variant="body1">
        {Math.round(value * 10000) / 100}%
      </Typography>
    </Fade>
    <div className={classes.content}>
      <ListItemAvatar >
        <OptionIcon classes={classes} index={avatar} value={value} />
      </ListItemAvatar>
      {edit ?
        <TextField
          value={text}
          onChange={event => onChange(event.target.value)}
          margin="normal"
          style={{ width: '100%', marginTop: 0, padding: '8px 15px 0 15px' }}
        /> : <ListItemText className={classes.text} primary={text} secondary={info} />
      }
    </div>

  </ListItem>
)

export default withStyles(styles)(Option)