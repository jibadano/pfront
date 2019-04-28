import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Category from './category'
import { PollContext } from '..'
import Router from 'next/router'

const styles = {
	question: {
		fontSize: 18,
		fontWeight: 200,
		padding: 15
	},
	edit: {
		padding: '0 15px'
	}
}

const Categories = ({ question, onSelect }) => {
	let categories = question
		? question
				.split(/[ \n\t]/)
				.filter(c => c.includes('#') && !c.endsWith('#'))
				.map(c => c.split('#')[1])
		: []

	return categories.map(value => (
		<Category onClick={() => onSelect(value)} key={value} id={value.slice(0, 1).toUpperCase()} name={value} />
	))
}

const Question = ({ classes, question, onChange, edit: propsEdit }) => (
	<PollContext.Consumer>
		{edit => (
			<div>
				<Categories
					question={question}
					onSelect={category => {
						!edit && Router.push({ pathname: Router.route, query: { categories: [category] } })
					}}
				/>
				<div className={classes.edit}>
					{edit || propsEdit ? (
						<TextField
							label="ask something"
							multiline
							rowsMax="4"
							value={question}
							onChange={event => onChange(event.target.value)}
							margin="normal"
							fullWidth
						/>
					) : (
						<Typography variant="body1" align="center" gutterBottom className={classes.question}>
							{question}
						</Typography>
					)}
				</div>
			</div>
		)}
	</PollContext.Consumer>
)

Categories.propTypes = {
	question: PropTypes.string,
	onChange: PropTypes.func
}

Categories.defaultProps = {
	question: '',
	onChange: () => {}
}

export default withStyles(styles)(Question)
