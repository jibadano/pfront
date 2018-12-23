import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import get from 'lodash/get'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Header from './header'
import Config from './config'

import Media from './media'
import Question from './question'
import Options from './options'
import Comments from '../../containers/comments'
import Comment from './comments/comment'

export const PollContext = React.createContext();

const PollType = {
  _id: PropTypes.string,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
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
  constructor(props) {
    super(props)
    this.state = { ...pick(props, Object.keys(PollType)) }
  }

  componentDidUpdate({ options }) {
    if (!isEqual(options, this.props.options))
      this.setState({ options: this.props.options })
  }

  render() {
    const { showComments, username, avatar, date, image, question, options, comments, _id } = this.state
    const { edit, onVote, onSave, onCancel, voted } = this.props
    const first = get(comments, '0')
    return (
      <PollContext.Provider value={edit}>
        <Card>
          <Header username={username} avatar={avatar} date={date} />
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
            voted &&
            <ExpansionPanel onChange={() => showComments || this.setState({ showComments: true })} >
              <ExpansionPanelSummary style={{ margin: 0 }} expandIcon={<ExpandMoreIcon />}>
                {first ?
                  <Comment comment={first} /> :
                  <Typography>Comments</Typography>
                }
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ width: '100%' }}>
                  {showComments && <Comments _id={_id} />}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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