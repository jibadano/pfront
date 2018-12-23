import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

class AddComment extends React.Component {
  state = { comment: '' }

  render() {
    let { onAddComment, loading } = this.props
    const { comment } = this.state

    if (loading) return <LinearProgress />

    return (
      <div style={{ display: 'flex' }}>
        <TextField
          label={comment ? 'But please, try not to be offensive' : 'Add a comment'}
          multiline
          rowsMax="2"
          disabled={false}
          value={comment}
          onChange={event => this.setState({ comment: event.target.value })}
          margin="normal"
          style={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button style={{ width: 20, height: 20 }} onClick={() => {
                  onAddComment(comment)
                  this.setState({ comment: '' })
                }} >
                  <SendIcon style={{ width: 20, height: 20 }} />
                </Button>
              </InputAdornment>
            )
          }}
        />
      </div>)
  }
}

AddComment.propTypes = {
  loading: PropTypes.bool,
  onAddComment: PropTypes.func,
}

AddComment.defaultProps = {
  loading: false,
  onAddComment: () => { }
}

export default AddComment
