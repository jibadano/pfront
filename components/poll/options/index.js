import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Option from './option'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { PollContext } from '..'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

const SortableOption = SortableElement(Option)
const SortableList = SortableContainer(({ options, onChange, onRemove, edit }) => {
	return (
		<div>
			{options &&
				options.map((option, index) => (
					<div style={{ display: 'flex' }}>
						<SortableOption
							key={option._id}
							index={index}
							avatar={index + 1}
							text={option.text}
							onChange={text => onChange(index, text)}
							onRemove={onRemove}
							edit
						/>
						<IconButton
							style={{ width: 20, height: 20, position: 'absolute', right: 15, zIndex: 1 }}
							onClick={() => onRemove(index)}
						>
							<CloseIcon style={{ width: 20, height: 20 }} />
						</IconButton>
					</div>
				))}
		</div>
	)
})

class Options extends React.Component {
	handleChange(index, text) {
		let { options, onChange } = this.props
		options[index].text = text
		onChange(options)
	}

	addOption() {
		let { options, onChange } = this.props
		options.push({ text: '' })
		onChange(options)
	}

	removeOption(index) {
		let { options, onChange } = this.props
		options.splice(index, 1)
		onChange(options)
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		let { options, onChange } = this.props
		onChange(arrayMove(options, oldIndex, newIndex))
	}

	getOptionValue = option => {
		if (!option.votes) return null
		const { options } = this.props
		const total = options.reduce((acc, cur) => acc + cur.votes.length, 0)
		return Math.floor((option.votes.length * 1000) / total) / 10
	}

	render() {
		const { options, onSelectOption } = this.props
		return (
			<PollContext.Consumer>
				{edit => (
					<List>
						{edit ? (
							<div>
								<SortableList
									onChange={this.handleChange.bind(this)}
									onRemove={this.removeOption.bind(this)}
									edit={edit}
									options={options}
									onSortEnd={this.onSortEnd}
								/>
								<Option avatar="+" text="Add new option" onClick={() => this.addOption()} style={{ paddingLeft: 0 }} />
							</div>
						) : (
							options.map((option, i) => (
								<Option
									onClick={() => onSelectOption(option)}
									key={option._id}
									avatar={i + 1}
									text={option.text}
									value={option.votes}
									selected={option.selected}
								/>
							))
						)}
					</List>
				)}
			</PollContext.Consumer>
		)
	}
}

Options.propTypes = {
	options: PropTypes.array,
	onSelectOption: PropTypes.func
}

Options.defaultProps = {
	options: [],
	onSelectOptions: () => {}
}

export default Options
