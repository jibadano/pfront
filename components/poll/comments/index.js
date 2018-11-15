import React from 'react'
import List from '@material-ui/core/List';
import Comment from './comment';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import ClockIcon from '@material-ui/icons/Person'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Comments = ({ comments, first, children, onFetchMore, onFetch, loading }) =>

  <ExpansionPanel>
    <ExpansionPanelSummary style={{ margin: 0 }} onChange={expanded => expanded && onFetch} expandIcon={<ExpandMoreIcon />}>
      {first ?
        <Comment comment={first} /> :
        <Typography> Commentarios </Typography>
      }
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <div style={{ width: '100%' }}>
        {loading ? <LinearProgress /> :
          <Typography variant="caption" onClick={onFetchMore} style={{ cursor: 'pointer' }}>load more</Typography>}
        <List>
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment} />
          ))}
        </List>
        {children}
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    body: PropTypes.string
  })),
  onAddComments: PropTypes.func,
}

Comments.defaultProps = {
  comments: [],
  onAddComments: () => { }
}

export default Comments
