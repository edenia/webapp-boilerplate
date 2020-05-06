import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from './routes'
import Snackbar from './components/Snackbar'

const App = ({ ual }) => {
  const snackbarState = useSelector((state) => state.snackbar)

  return (
    <BrowserRouter>
      <Snackbar {...snackbarState} />
      <Switch>
        {routes.map(({ path, component: Component }) => (
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
