import React from 'react'
import List from '@material-ui/core/List'
import Comment from './comment'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Loading from './loading'

const Comments = ({ comments, children, onFetchMore, loading, hasMore }) => (
	<div style={{ width: '100%' }}>
		{loading ? (
			<>
				<Loading />
				<Loading />
			</>
		) : (
			hasMore && (
				<Typography variant="caption" onClick={onFetchMore} style={{ cursor: 'pointer' }}>
					load more
				</Typography>
			)
		)}
		<List disablePadding dense>
			{comments.map(comment => (
				<Comment key={comment._id} comment={comment} />
			))}
		</List>
		{children}
	</div>
)

Comments.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			username: PropTypes.string,
			body: PropTypes.string
		})
	),
	onAddComments: PropTypes.func,
	hasMore: PropTypes.bool
}

Comments.defaultProps = {
	comments: [],
	onAddComments: () => {},
	hasMore: false
}

export default Comments
