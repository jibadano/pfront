import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import withMaterial from '../lib/material'
import Link from 'next/link'
import Router from 'next/router'
import Header from './header'
import NewPoll from '../containers/newPoll'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import UserIcon from '@material-ui/icons/Person'
import ExploreIcon from '@material-ui/icons/Explore'
import HomeIcon from '@material-ui/icons/Home'
import Search from '../containers/search'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import { SecuredContext } from '../containers/secured'
import get from 'lodash/get'

const styles = {
	menu: {
		width: '100%',
		display: 'flex',
		padding: '10px 20px'
	},
	menuItem: {
		marginRight: 10,
		marginLeft: 5
	},
	avatar: {
		width: 30,
		height: 30
	}
}

class Layout extends React.Component {
	state = { showNewPoll: false }

	onSearch = searchResult => {
		let categories = [],
			users = []

		searchResult.forEach(({ value, type }) => {
			switch (type) {
				case 'CATEGORY':
					return categories.push(value)
				case 'USER':
					return users.push(value)
			}
		})

		Router.push({ pathname: Router.route, query: { categories, users } })
	}

	searchValues = (categories, users) => {
		let values = []
		if (categories && categories.length)
			values = values.concat(categories.map(value => ({ value, label: value, type: 'CATEGORY' })))

		if (users && users.length) values = values.concat(users.map(value => ({ value, label: value, type: 'USER' })))

		return values
	}

	render() {
		const { children, classes, categories, users } = this.props
		const { showNewPoll } = this.state
		return (
			<SecuredContext.Consumer>
				{user => (
					<div>
						<Header>
							<Link href="/test">
								<IconButton color="inherit">T</IconButton>
							</Link>
							<Link href="/">
								<IconButton color="inherit">
									<HomeIcon />
								</IconButton>
							</Link>
							<Link href="/explore">
								<IconButton color="inherit">
									<ExploreIcon />
								</IconButton>
							</Link>
							<Link href="/user">
								<IconButton color="inherit">
									{get(user, 'avatar') ? <Avatar src={user.avatar} className={classes.avatar} /> : <UserIcon />}
								</IconButton>
							</Link>
						</Header>
						<div style={{ paddingTop: '80px' }}>
							<Grid container direction="column" alignItems="center" style={{ marginBottom: 20 }}>
								<Grid item lg={6} className={classes.menu} style={{ padding: 0 }}>
									<Fab
										size="small"
										className={classes.menuItem}
										color="secondary"
										onClick={() => this.setState({ showNewPoll: !showNewPoll })}
									>
										{showNewPoll ? <RemoveIcon /> : <AddIcon />}
									</Fab>
									<Search initialValues={this.searchValues(categories, users)} onSearch={this.onSearch} />
								</Grid>
								<Grid style={{ width: '100%', padding: 0 }} item lg={6}>
									<Collapse in={showNewPoll} unmountOnExit>
										<div style={{ width: '100%', paddingTop: 20 }}>
											<NewPoll onCancel={() => this.setState({ showNewPoll: false })} />
										</div>
									</Collapse>
								</Grid>
							</Grid>

							{children}
						</div>
					</div>
				)}
			</SecuredContext.Consumer>
		)
	}
}

export default withMaterial(withStyles(styles)(Layout))
