import React from 'react'
import CommentsView from '../components/poll/comments'
import AddCommentView from '../components/poll/comments/addComment'

import get from 'lodash/get'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const GET_COMMENTS = gql`
  query comments($_id:ID!, $page:Int) {
    comments(_id:$_id, page:$page){
      page 
      list {
        user
        text
        _id
      }
    }
  }
`
const ADD_COMMENT = gql`
  mutation addComment($_id: ID!, $comment: String!) {
    addComment(_id: $_id, comment: $comment){
      _id
      text
      user
    }
  }
`

const onAddingSuccess = _id => (cache, { data: { addComment } }) => {
  const { comments } = cache.readQuery({ query: GET_COMMENTS, variables: { _id } })

  cache.writeQuery({
    query: GET_COMMENTS,
    variables: { _id },
    data: { comments: { ...comments, list: comments.list.concat([addComment]) } }
  })
}


const Comments = ({ _id, first }) =>

  <Query query={GET_COMMENTS} variables={{ _id }}>
    {({ data, error, loading, fetchMore }) => {

      const comments = get(data, 'comments.list') || []
      const page = get(data, 'comments.page')

      return (
        <CommentsView
          comments={comments}
          loading={loading}
          first={first}
          onFetchMore={() => fetchMore({
            variables: { _id, page: page + 1 },
            updateQuery: (prev, { fetchMoreResult: more }) => {
              console.log({prev, more});
              if (!more) return prev
              return more
            }
          })}
        >
          <Mutation mutation={ADD_COMMENT} update={onAddingSuccess(_id)}>
            {(addComment, { loading }) =>
              <AddCommentView
                loading={loading}
                onAddComment={comment => addComment({ variables: { comment, _id } })}
              />
            }
          </Mutation>
        </CommentsView>
      )
    }}
  </Query >


export default Comments
