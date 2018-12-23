import React from 'react'
import PropTypes from 'prop-types'
import UserInfoView from '../components/userInfo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

const USER = gql`
  query user($_id:ID!) {
    user(_id:$_id) {
      _id
      avatar
      firstName
      lastName
    }
  }
`

const UserInfo = ({ _id, user }) =>
  <Query query={USER}  variables={{ _id }}>
    {({ loading, data }) =>
      <UserInfoView
        email={_id}
        firstName={get(data, 'user.firstName')}
        lastName={get(data, 'user.lastName')}
        avatar={get(data, 'user.avatar')}
        onLogout={user.logout}
      />}
  </Query>


UserInfo.propTypes = {
  _id: PropTypes.string.isRequired
}

export default UserInfo
