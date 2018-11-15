import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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

class Index extends React.Component {

  getInitialProps(props) {
    return { categories: props.query.categories.split(','), ...props }
  }

  render() {
    const { categories } = this.props
    return (
      <Query query={POLLS} variables={{ categories }}>
        {({ loading, error, data, refetch }) =>
          <Grid container direction='column' alignItems='center' spacing={40}>
            {data && data.polls && data.polls.map(poll => (
              <Grid item key={poll._id} lg={6} style={{ width: '100%' }} >
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
