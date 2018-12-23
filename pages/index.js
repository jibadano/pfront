import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import LoadingPoll from '../components/poll/loading'

export const POLLS = gql`
  query polls($categories:[String]) {
    polls(categories:$categories) {
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

class Index extends React.PureComponent {

  static getInitialProps({ query }) {
    return { categories: query.categories ? query.categories.split(',') : null, users: query.users ? query.users.split(',') : null }
  }

  render() {
    const { categories } = this.props
    return (
      <Query query={POLLS} variables={{ categories }}>
        {({ loading, error, data, refetch }) =>
          <Grid container direction='column' alignItems='center'>
            {loading && <>
              <Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
                <LoadingPoll />
              </Grid>
              <Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
                <LoadingPoll />
              </Grid>
            </>}
            {data && data.polls && data.polls.map(poll => (
              <Grid item key={poll._id} lg={6} style={{ width: '100%', marginBottom: 40 }} >
                <Poll poll={poll} />
              </Grid>
            ))}
          </Grid>
        }
      </Query>
    )
  }
}

export default Index
