import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import UserInfo from '../components/userInfo'

import { SecuredContext } from '../containers/secured'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const USER_POLLS = gql`
  query userPolls($user:ID) {
    userPolls(user:$user){
      _id
      question
      options{ _id text desc }
      date
      user
      image
      privacy {
        poll
        results
      }
      comments {
        _id
        text
        user 
      }
    }
  }
`


class User extends React.Component {

  static getInitialProps({ query }) {
    return { userId: query.id }
  }

  render() {
    const { userId } = this.props
    return (
      <SecuredContext.Consumer>
        {user => (
          <Query query={USER_POLLS} variables={{ user: userId }}>
            {({ loading, error, data }) => (
              <Grid container direction='column' alignItems='center' spacing={40}>
                <UserInfo email={userId || user._id} />
                {data && data.userPolls && data.userPolls.map(poll =>
                  <Grid item key={poll._id} lg={6} style={{ width: '100%' }} >
                    <Poll poll={poll} />
                  </Grid>
                )}
              </Grid>
            )}
          </Query>
        )}
      </SecuredContext.Consumer>
    )
  }
}

export default User
