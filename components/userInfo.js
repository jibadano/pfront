import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
  render() {
    const { email, firstName, lastName, avatar, onLogout, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardContent >
          <Grid container direction="row-reverse" alignItems='center' justify="center" spacing={40}>
            <Grid item sm={4} xs={12} >
              <Avatar className={classes.avatar} src={avatar}>
                {email.slice(0, 1).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item sm={8} xs={12} >
              <Typography align="center" variant="h6">
                {firstName} {lastName}
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary">
                {email}
              </Typography>
                <IconButton onClick={onLogout}>
                  <LogOutIcon />
                </IconButton>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    )
  }
}

UserInfo.propTypes = {

}

export default withStyles(styles)(UserInfo)