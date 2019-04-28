import React from 'react'
import Poll from '../containers/poll'
import Grid from '@material-ui/core/Grid'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import LoadingPoll from '../components/poll/loading'
import BottomScrollListener from 'react-bottom-scroll-listener'

export const POLLS = gql`
	query polls($categories: [String], $users: [ID], $offset: Int) {
		polls(categories: $categories, users: $users, offset: $offset) {
			_id
			question
			options {
				_id
				text
				desc
				votes
				selected
				users
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

class Index extends React.PureComponent {
	state = { hidden: false }
	static getInitialProps({ query }) {
		const props = {}

		if (query.categories) props.categories = query.categories.split(',')
		if (query.users) props.users = query.users.split(',')

		return props
	}

	render() {
		const { categories, users } = this.props
		return (
			<Query query={POLLS} variables={{ categories, users }}>
				{({ loading, data, fetchMore }) => (
					<BottomScrollListener
						offset={500}
						onBottom={() =>
							fetchMore({
								variables: { categories, users, offset: data.polls.length },
								updateQuery: (prev, { fetchMoreResult }) => {
									if (!fetchMoreResult) return prev
									return Object.assign({}, prev, {
										polls: [...prev.polls, ...fetchMoreResult.polls]
									})
								}
							})
						}
					>
						<Grid container direction="column" alignItems="center">
							{data &&
								data.polls &&
								data.polls.map(poll => (
									<Grid item key={poll._id} lg={6} style={{ width: '100%', marginBottom: 40 }}>
										<Poll poll={poll} />
									</Grid>
								))}
							{loading && (
								<>
									<Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
										<LoadingPoll />
									</Grid>
									<Grid item lg={6} style={{ width: '100%', marginBottom: 40 }}>
										<LoadingPoll />
									</Grid>
								</>
							)}
						</Grid>
					</BottomScrollListener>
				)}
			</Query>
		)
	}
}

export default Index
