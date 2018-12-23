import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import LinearProgress from '@material-ui/core/LinearProgress';



const styles = theme => ({
  avatar: { background: '#eee' },
  progressBar: { background: '#eee' },
  progress: { margin: '10px 0', height: 10 },
  card: {
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.07), 0px 2px 1px -1px rgba(0, 0, 0, 0.06)'
  }
});

let LoadingText = ({ classes, ...props }) => <LinearProgress {...props} classes={{ barColorPrimary: classes.progressBar }} className={classes.progress} />
LoadingText = withStyles(styles)(LoadingText)

const LoadingPoll = ({ classes }) =>
  <Card className={classes.card}>
    <CardHeader
      avatar={<Avatar className={classes.avatar} />}
      title={<LoadingText style={{ width: '50%' }} />}
      subheader={<LoadingText style={{ width: '40%' }} />}
    />
    <div style={{ margin: 'auto' }}>
      <LoadingText style={{ width: '60%', height: 20, margin: '10px auto' }} />
      <LoadingText style={{ width: '30%', height: 20, margin: '10px auto' }} />
      <LoadingText style={{ width: '40%', height: 20, margin: '10px auto' }} />
    </div>
    <CardContent style={{ padding: '10px 0' }}>
      <LoadingText variant="determinate" value={0} style={{ height: 100, margin: '5px auto' }} />
    </CardContent>
    <CardActions style={{ padding: '10px 0' }}>
      <LoadingText style={{ height: 10, margin: '5px auto' }} />
    </CardActions>
  </Card>

export default withStyles(styles)(LoadingPoll);