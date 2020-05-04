import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from './routes'
import config from './config'
import Snackbar from './components/Snackbar'

const App = ({ ual }) => {
  const snackbarState = useSelector((state) => state.snackbar)
  const { appUseUAL } = config
  const finalRoutes = appUseUAL
    ? routes.filter(({ name }) => name !== 'login')
    : routes

  return (
    <BrowserRouter>
      <Snackbar {...snackbarState} />
      <Switch>
        {finalRoutes.map(({ path, component: Component }) => (
          <Route key={`path-${path}`} path={path}>
            <Component ual={ual} />
          </Route>
        ))}
        <Redirect exact from="/" to="/dashboard" />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App
