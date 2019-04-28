import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import UserInfo from '../containers/userInfo'
import LoadingPoll from '../components/poll/loading'
import Fade from '@material-ui/core/Fade'

import { SecuredContext } from '../containers/secured'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const USER_POLLS = gql`
	query polls($users: [ID], $categories: [String]) {
		polls(users: $users, categories: $categories) {
			_id
			question
			options {
				_id
				text
				desc
				votes
				users
				selected
			}
			date
			user
			image
			voted
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
		return {
			userId: query.id,
			categories: query.categories ? query.categories.split(',') : null,
			users: query.users ? query.users.split(',') : null
		}
	}

	render() {
		const { userId, categories, users } = this.props
		return (
			<SecuredContext.Consumer>
				{user => (
					<Fade in>
						<Grid container direction="column" alignItems="center">
							<Grid item lg={6} sm={8} style={{ width: '100%', marginBottom: 40 }}>
								<UserInfo user={user} _id={users && users.length ? users[0] : user._id} />
							</Grid>
							<Query query={USER_POLLS} variables={{ users: users || [user._id], categories }}>
								{({ loading, error, data }) => {
									if (loading)
										return (
											<>
												<Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
													<LoadingPoll />
												</Grid>
												<Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
													<LoadingPoll />
												</Grid>
											</>
										)

									if (!data || !data.polls || error) return <div>Error</div>
									return data.polls.map(poll => (
										<Grid item key={poll._id} lg={6} sm={8} style={{ width: '100%', marginBottom: 40 }}>
											<Poll poll={poll} />
										</Grid>
									))
								}}
							</Query>
						</Grid>
					</Fade>
				)}
			</SecuredContext.Consumer>
		)
	}
}

export default User
