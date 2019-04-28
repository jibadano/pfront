import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import SendIcon from '@material-ui/icons/Send'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

import LinearProgress from '@material-ui/core/LinearProgress'

class AddComment extends React.Component {
	state = { comment: '' }

	render() {
		let { onAddComment, loading } = this.props
		const { comment } = this.state

		return (
			<div>
				<TextField
					label={comment ? 'But please, try not to be offensive' : 'New comment'}
					multiline
					rowsMax="2"
					disabled={loading}
					value={comment}
					onChange={event => this.setState({ comment: event.target.value })}
					margin="normal"
					style={{ width: '100%', marginBottom: 0 }}
					InputProps={{
						endAdornment: comment && (
							<InputAdornment position="end">
								<SendIcon
									onClick={() => {
										onAddComment(comment)
										this.setState({ comment: '' })
									}}
									style={{ cursor: 'pointer', width: 20, height: 20 }}
								/>
							</InputAdornment>
						)
					}}
				/>
				{loading && <LinearProgress style={{ height: 2 }} />}
			</div>
		)
	}
}

AddComment.propTypes = {
	loading: PropTypes.bool,
	onAddComment: PropTypes.func
}

AddComment.defaultProps = {
	loading: false,
	onAddComment: () => {}
}

export default AddComment
