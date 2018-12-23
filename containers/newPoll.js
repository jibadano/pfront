import React from 'react'
import get from 'lodash/get'
import Poll from '../components/poll'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { SecuredContext } from '../containers/secured'
import { POLLS } from '../pages'
import { USER_POLLS } from '../pages/user'

const ADD_POLL = gql`
  mutation addPoll($question: String!, $options: [InputOption], $image: String, $privacy: InputPrivacy) {
    addPoll(question:$question, options:$options, image:$image, privacy:$privacy) {
      _id
      question
      options{ _id text desc votes users}
      voted
      date
      user
      image
      privacy { poll results }
      comments{
        _id
        text
        user
      }
    }
  }
`

const NewPoll = ({ onCancel }) =>
  <SecuredContext.Consumer>
    {user =>
      <Mutation mutation={ADD_POLL}
        update={(cache, { data: { addPoll } }) => {
          try{
            const { polls } = cache.readQuery({ query: POLLS })
            cache.writeQuery({
              query: POLLS,
              data: { polls: [addPoll, ...polls] }
            })
          } catch(e){}
          
          try {
            const { userPolls } = cache.readQuery({ query: USER_POLLS })

            cache.writeQuery({
              query: USER_POLLS,
              data: { userPolls: [addPoll, ...userPolls] }
            })
          } catch(e){}

          onCancel()
        }}>
        {(addPoll, { data }) => {
          return <Poll
            username={user._id}
            avatar={user.avatar}
            edit
            onSave={newPoll => addPoll({ variables: newPoll })}
            onCancel={onCancel}
          />
        }}
      </Mutation>}
  </SecuredContext.Consumer>


export default NewPoll
