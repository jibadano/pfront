import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import get from 'lodash/get'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Header from './header'
import Config from './config'

import Media from './media'
import Question from './question'
import Options from './options'
import Comments from '../../containers/comments'

export const PollContext = React.createContext();

const PollType = {
  _id: PropTypes.string,
  username: PropTypes.string.isRequired,
  voted: PropTypes.bool,
  date: PropTypes.object,
  image: PropTypes.string,
  question: PropTypes.string,
  comments: PropTypes.array,
  options: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    votes: PropTypes.number,
    users: PropTypes.array
  }))
}

const styles = theme => ({

});

class Poll extends React.Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = { ...pick(props, Object.keys(PollType)) }
  }

  componentDidUpdate({ options }) {
    if (!isEqual(options, this.props.options))
      this.setState({ options: this.props.options })
  }

  render() {
    const { username, voted, date, image, question, options, comments, _id } = this.state
    const { edit, onVote, onSave, onCancel } = this.props

    return (
      <PollContext.Provider value={edit}>
        <Card>
          <Header username={username} date={date} />
          <Media image={image} onChange={image => this.setState({ image })} />
          <CardContent style={{ padding: '10px 0' }}>
            <Question
              question={question}
              onChange={question => this.setState({ question })} />
            <Options
              options={options}
              onSelectOption={option => !voted && onVote(option._id)}
              onChange={options => this.setState({ options })} />
          </CardContent>
          {edit ?
            <Config onCancel={onCancel} onSave={config => onSave({ _id, image, question, options, ...config })} /> :
            voted && <Comments _id={_id} first={get(comments, '0')} />
          }
        </Card>
      </PollContext.Provider>
    );
  }
}

Poll.propTypes = {
  ...PollType,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onVote: PropTypes.func,
  onCancel: PropTypes.func,
  edit: PropTypes.bool
}

Poll.defaultProps = {
  _id: null,
  date: new Date(),
  image: null,
  voted: false,
  question: '',
  options: [],
  comments: [],
  onSubmit: () => { },
  onCancel: () => { },
  onVote: () => { },
  edit: false
}

export default withStyles(styles)(Poll);