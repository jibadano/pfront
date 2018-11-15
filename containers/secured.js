import React from 'react';
import Authenticate from './authenticate'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'
export const SecuredContext = React.createContext();

const ME = gql`
  query me{
    me{
      token
      user{_id}
    }
  }
`

class Secured extends React.Component {
  state = { user: null }
  
  render() {
    let { children } = this.props

    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          const user = get(data, 'me.user') || this.state.user
          if (!user) 
            return (<Authenticate onSuccess={login => this.setState({ user:login.user })}></Authenticate>)

          return (
            <SecuredContext.Provider value={user}>
              {children}
            </SecuredContext.Provider>
          );
        }}
      </Query>
    )
  }
}

export default Secured
