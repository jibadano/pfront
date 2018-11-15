import React from 'react'
import PropTypes from 'prop-types'
import SearchView from '../components/search'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const SEARCH = gql`
  query search($term:String) {
    categories(term:$term) 
  }
`

const Search = ({ onSearch }) =>
  <Query query={SEARCH}>
    {({ data: { categories }, loading, error, refetch }) =>
      <SearchView
        suggestions={categories ? categories.map(category => ({ label: category, value: category })) : []}
        onSubmit={values => values && values.length ? onSearch(values.map(category => category.value)) : onSearch()}
        onChange={term => {refetch({ term })}}
      />}
  </Query>

Search.propTypes = {
  onSearch: PropTypes.func
}

Search.defaultProps = {
  onSearch: () => { }
}

export default Search
