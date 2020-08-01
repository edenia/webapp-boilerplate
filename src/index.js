import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { ApolloProvider } from '@apollo/react-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import { ualConfig } from './config'
import App from './App'
import theme from './theme'
import { client } from './graphql'
import * as serviceWorker from './serviceWorker'

import './i18n'

const AppWithUAL = withUAL(App)

render(
  <UALProvider
    chains={[ualConfig.network]}
    authenticators={ualConfig.authenticators}
    appName={ualConfig.appName}
  >
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppWithUAL />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloProvider>
  </UALProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
