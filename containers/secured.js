import React from 'react'
import Authenticate from './authenticate'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'
import Loading from '../components/loading'
import Error from '../components/error'

export const SecuredContext = React.createContext()

const ME = gql`
	query me {
		me {
			user {
				_id
				avatar
			}
		}
	}
`

export default ({ children, token }) => (
	<Query ssr={false} query={ME} variables={{ token }}>
		{({ loading, error, data, refetch }) => {
			if (loading) return <Loading />
			if (error) return <Error graphQLErrors={error} />

			const user = get(data, 'me.user')
			if (!user) return <Authenticate onSuccess={token => refetch({ token })} />

			const logout = () => {
				delete localStorage.token
				refetch({})
			}

			return <SecuredContext.Provider value={{ ...user, logout }}>{children}</SecuredContext.Provider>
		}}
	</Query>
)
