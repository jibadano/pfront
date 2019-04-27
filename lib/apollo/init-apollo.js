import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'

import fetch from 'isomorphic-unfetch'

let apolloClient = null
let httpLink = new HttpLink({
	fetch: !process.browser && fetch,
	uri: process.env.NODE_ENV === 'production' ? 'https://pback01.herokuapp.com/graphql' : 'http://localhost:4000/graphql', // Server URL (must be absolute)
	credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})

let authLink = setContext(({ variables }, { headers }) => {
	if (variables.token) localStorage.token = variables.token
	// get the authentication token from local storage if it exists
	let token = localStorage.token
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch
}

function create(initialState) {
	return new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link: authLink.concat(httpLink),
		cache: new InMemoryCache().restore(initialState || {})
	})
}

export default function initApollo(initialState) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState)
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState)
	}

	return apolloClient
}
