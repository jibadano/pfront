import React from 'react'
import PropTypes from 'prop-types'
import PollView from '../components/poll'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

const VOTE = gql`
	mutation vote($_id: ID!, $option: ID!) {
		vote(_id: $_id, option: $option) {
			options {
				_id
				text
				desc
				votes
				selected
			}
		}
	}
`

const Poll = ({ poll: { _id, user, voted, date, image, categories, question, options, comments } }) => (
	<Mutation mutation={VOTE}>
		{(vote, { data }) => (
			<PollView
				_id={_id}
				username={user}
				date={new Date(date)}
				voted={voted || get(data, 'vote.options')}
				image={image}
				question={question}
				comments={comments}
				options={get(data, 'vote.options') || options}
				onVote={option => vote({ variables: { _id, option } })}
			/>
		)}
	</Mutation>
)

Poll.propTypes = {
	poll: PropTypes.object
}

Poll.defaultProps = {
	poll: {}
}

export default Poll
