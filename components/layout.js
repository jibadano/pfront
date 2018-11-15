import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import withMaterial from '../lib/material'
import Link from 'next/link'
import Router from 'next/router'
import Header from './header'
import NewPoll from '../containers/newPoll'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UserIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import Search from '../containers/search'

const styles = {
  menu: {
    width: '100%',
    display: 'flex',
    padding: '10px 20px'
  },
  menuItem: {
    marginRight: 10
  }
}


class Layout extends React.Component {
  state = { showNewPoll: false }


  render() {

    const { children, classes } = this.props
    const { showNewPoll, loading } = this.state
    return (
      <div>
        <Header>
          <Link prefetch href={'/'} >
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link prefetch href={'/explore'} >
            <IconButton color="inherit">
              <ExploreIcon />
            </IconButton>
          </Link>
          <Link prefetch href={'/user'}>
            <IconButton color="inherit">
              <UserIcon />
            </IconButton>
          </Link>
        </Header>
        <div style={{ paddingTop: '80px' }}>
          <Grid container direction='column' spacing={40} alignItems='center' >
            <Grid item lg={6} className={classes.menu} >
              <Button variant="fab" mini className={classes.menuItem} color="secondary" onClick={() => this.setState({ showNewPoll: !showNewPoll })}>
                {showNewPoll ? <RemoveIcon /> : <AddIcon />}
              </Button>
              <Search onSearch={categories => Router.push(`/?categories=${categories.toString()}`)} />
            </Grid>
            {showNewPoll &&
              <Grid style={{ width: '100%' }} item lg={6}>
                <NewPoll onCancel={() => this.setState({ showNewPoll: false })} />
              </Grid>}
          </Grid>
          {loading ? <div>LOADINGGGGG</div> : children}
      
        </div>
      </div>
    )
  }
}

export default withMaterial(withStyles(styles)(Layout))