import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Error extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  onClose() {
    this.setState({ open: false })
    this.props.onClose()
  }

  render() {
    const { open, graphQLErrors, error } = this.state
    console.log(this.state)
    return (
      <Dialog
        open={open}
        onClose={this.onClose.bind(this)}
        scroll="paper"
      >
        <DialogTitle>An error has ocurred</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error}
            {graphQLErrors.map ? graphQLErrors.map(gqlError => gqlError.message) : graphQLErrors.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose.bind(this)} color="primary">
            Close
      </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Error.propTypes = {
  open: PropTypes.bool,
  error: PropTypes.string,
  graphQLErrors: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func
}

Error.defaultProps = {
  open: true,
  error: null,
  graphQLErrors: [],
  onClose: () => { }
}

export default Error

