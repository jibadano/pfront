import React from 'react'
import PropTypes from 'prop-types'
import SearchView from '../components/search'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const SEARCH = gql`
  query search($term:String) {
    search(term:$term) {
      value
      label
      type
    }
  }
`

const Search = ({onSearch, initialValues}) =>
  <Query query={SEARCH}>
    {({ data: { search }, loading, error, refetch }) =>
      <SearchView
        onSubmit={onSearch}
        initialValues={initialValues}
        suggestions={search}
        onChange={term => { refetch({ term }) }}
      />}
  </Query>

Search.propTypes = {
  onSearch: PropTypes.func,
  initialValues: PropTypes.array
}

Search.defaultProps = {
  initialValues: null,
  onSearch: () => { }
}

export default Search
