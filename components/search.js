import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import Category from './poll/question/category'

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	input: {
		display: 'flex',
		padding: 0
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center'
	},
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
	},
	chipFocused: {
		backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		fontSize: 16
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing.unit * 2
	}
})

function NoOptionsMessage(props) {
	return (
		<Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
			{props.children}
		</Typography>
	)
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />
}

function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	)
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 800 : 400
			}}
			{...props.innerProps}
		>
			<Category name={props.children} type={props.data.type} />
		</MenuItem>
	)
}

function Placeholder(props) {
	return (
		<Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
			{props.children}
		</Typography>
	)
}

function ValueContainer(props) {
	return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props) {
	return <Category name={props.children} type={props.data.type} /* onRemove={props.removeProps.onClick} */ />
}

function Menu(props) {
	return (
		<Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
			{props.children}
		</Paper>
	)
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	ValueContainer
}

class IntegrationReactSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = { multi: props.initialValues }
	}

	handleChange = name => value => {
		this.setState({
			[name]: value
		})
	}

	render() {
		const { classes, theme, onChange, onSubmit, suggestions } = this.props
		const selectStyles = {
			input: base => ({
				...base,
				color: theme.palette.text.primary,
				'& input': {
					font: 'inherit'
				}
			})
		}

		return (
			<div className={classes.root}>
				<Select
					onInputChange={value => onChange(value)}
					classes={classes}
					styles={selectStyles}
					options={suggestions}
					components={components}
					value={this.state.multi}
					onChange={value => {
						this.handleChange('multi')(value)
						onSubmit(value)
					}}
					placeholder="Search categories or users"
					isMulti
				/>
			</div>
		)
	}
}

IntegrationReactSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	suggestions: PropTypes.array
}

IntegrationReactSelect.defaultProps = {
	onChange: () => {},
	onSubmit: () => {},
	suggestions: []
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect)
