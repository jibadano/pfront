import React from 'react'
import Option from '../components/poll/options/option'

export default class Test extends React.Component {
	state = { value: null }
	render() {
		return (
			<Option
				text="Hola estoy probando"
				avatar="1"
				value={this.state.value}
				onClick={() => this.setState({ value: this.state.value ? null : 0.76 })}
			/>
		)
	}
}
