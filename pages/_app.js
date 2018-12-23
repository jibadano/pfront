
import App, { Container } from 'next/app'
import withApolloClient from '../lib/apollo'
import { ApolloProvider } from 'react-apollo'
import Layout from '../components/layout'
import Secured from '../containers/secured'

//TODO reemplazar por nombre de la aplicación
class MyApp extends App {

  render() {
    const { Component, pageProps, apolloClient, router } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Secured token={router.query.token}>
            <Layout {...pageProps}>
              <Component key={this.props.router.route} {...pageProps} />
            </Layout>
          </Secured>
        </ApolloProvider>
        <style jsx global>
          {`body {
              margin: 0;
            }`}
        </style>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
