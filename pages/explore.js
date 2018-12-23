import React from 'react'
import Poll from '../containers/poll'
import LoadingPoll from '../components/poll/loading'

import Grid from '@material-ui/core/Grid'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export const EXPLORE = gql`
  query explore($categories:[String], $users:[ID]) {
    explore(categories:$categories, users:$users) {
      _id
      question
      options{ _id text desc votes users}
      date
      user
      image
      voted
      privacy {
        poll
        results
      }
      comments{
        _id
        text
        user
      }
    }
  }
`

class Explore extends React.Component {

  static getInitialProps({ query }) {
    return { categories: query.categories ? query.categories.split(',') : null, users: query.users ? query.users.split(',') : null }
  }

  render() {
    const { categories, users } = this.props
    return (
      <Query  query={EXPLORE} variables={{ categories, users }}>
        {({ loading, error, data, refetch }) => (
          <Grid container direction='column' alignItems='center' >
            {loading && <>
              <Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
                <LoadingPoll />
              </Grid>
              <Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
                <LoadingPoll />
              </Grid>
            </>}
            {data && data.explore && data.explore.map(poll => (
              <Grid item key={poll._id} lg={6} style={{ width: '100%', marginBottom: 40 }}>
                <Poll poll={poll} />
              </Grid>
            ))}
          </Grid>
        )}
      </Query>
    )

  }
}

export default Explore
