import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { PollContext } from '.'

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
})

let Header = ({ username, date, classes }) => (
  <PollContext.Consumer>
    {edit => (
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} >
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={edit ? 'New poll' : date.toDateString()}
      />)
    }
  </PollContext.Consumer>
)

Header.defaultProps = {
  username: 'unknown',
  edit: false,
  date: new Date()
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  date: PropTypes.object
}

export default withStyles(styles)(Header)

