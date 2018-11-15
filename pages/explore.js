import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export const EXPLORE = gql`
  query explore($categories:[String]) {
    explore(categories:$categories) {
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

class Index extends React.Component {
  state = { categories: [], question: '' }
  render() {
    const { question, categories } = this.state
    return (
      <Query query={EXPLORE}>
        {({ loading, error, data, refetch }) => (
          <Grid container direction='column' alignItems='center' spacing={40}>
            {data && data.explore && data.explore.map(poll => (
              <Grid item key={poll._id} lg={6} style={{ width: '100%' }} >
                <Poll poll={poll} />
              </Grid>
            ))}
          </Grid>
        )}
      </Query>
    )

  }
}

export default Index
