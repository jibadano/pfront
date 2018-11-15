
import App, { Container } from 'next/app'
import withApolloClient from '../lib/apollo'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import LinearProgress from '@material-ui/core/LinearProgress'
import Layout from '../components/layout'

import Secured from '../containers/secured'
//TODO reemplazar por nombre de la aplicación
class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>

        <ApolloProvider client={apolloClient}>
          <Secured>
            <Layout>
              <PageTransition
                timeout={500}
                classNames="page-transition"
              
              >
                <Component key={this.props.router.route} {...pageProps} />
              </PageTransition>
            </Layout>
          </Secured>
        </ApolloProvider>
        <style jsx global>
          {`body {
              margin: 0;
            }
            .page-transition-enter {
              opacity: 0;
              transform: translate3d(0, 20px, 0);
            }
            .page-transition-enter-active {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              transition: opacity 300ms, transform 300ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 300ms;
            }
            .loading-indicator-appear,
            .loading-indicator-enter {
              opacity: 0;
            }
            .loading-indicator-appear-active,
            .loading-indicator-enter-active {
              opacity: 1;
              transition: opacity 400ms;
            }`}
        </style>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
