import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

import LinearProgress from '@material-ui/core/LinearProgress';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  card: { width: '100%' },
  content: { padding: 10 },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 200,
    height: 200,
    margin: 'auto',
    fontSize: 120
  }
});

class UserInfo extends React.Component {
  state = { interest: true }
  constructor(props) {
    super(props)
    this.toggleInterest()
  }
  toggleInterest() {
    setTimeout(() => {
      this.setState(state => ({ interest: !state.interest }))
      this.toggleInterest()
    }, 7500)
  }
  render() {
    const { email, firstName, lastName, avatar, onLogout, classes, contrast } = this.props
    const { interest } = this.state
    return (
      <Card className={classes.card}>
        <CardContent >
          <Grid container direction="row-reverse" alignItems='center' justify="center" spacing={40}>
            <Grid item sm={4} xs={12} >
              <Avatar className={classes.avatar} src={avatar}>
                {email.slice(0, 1).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item sm={8} xs={12}>
              <Typography align="center" variant="h6" >
                {firstName} {lastName}
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary">
                {email}
              </Typography>
              {contrast &&
                <>
                  <div style={{ display: 'flex', padding: 20 }}>
                    <Typography style={{ width: '33.33%' }} variant="title" align="center" color="textSecondary">
                      {contrast.polls} polls
                </Typography>
                    <Typography style={{ width: '33.33%' }} variant="title" align="center" color="textSecondary">
                      {contrast.voted} votes
                </Typography>
                    <Typography style={{ width: '33.33%' }} variant="title" align="center" color="textSecondary">
                      100 votes
                </Typography>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Fade in={interest} timeout={300} style={{ position: 'absolute', top: 0 }}>
                      <div style={{ width: '50%' }}>
                        <Typography variant="subtitle1" color="textSecondary">
                          Interests
                </Typography>
                        {contrast.interests.map(category =>
                          <>
                            <Typography variant="body1" color="textSecondary">
                              {category.name}
                            </Typography>
                            <LinearProgress variant="determinate" value={category.interest * 100} />
                          </>
                        )}
                      </div>
                    </Fade>
                    <Fade in={!interest} timeout={300}>
                      <div style={{ width: '50%' }}>
                        <Typography variant="subtitle1" color="textSecondary">
                          Common
                </Typography>
                        {contrast.common.map(category =>
                          <>
                            <Typography variant="body1" color="textSecondary">
                              {category.name}
                            </Typography>
                          </>
                        )}
                      </div>
                    </Fade>
                  </div>
                </>}
            </Grid>

          </Grid>
        </CardContent>
        <CardActions>
          <IconButton onClick={onLogout}>
            <LogOutIcon />
          </IconButton>
          <Button onClick={onLogout}>
            Send a message
          </Button>
        </CardActions>
      </Card >
    )
  }
}

UserInfo.propTypes = {

}

export default withStyles(styles)(UserInfo)