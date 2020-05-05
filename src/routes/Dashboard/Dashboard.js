import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect,
  Switch,
  useLocation,
  useHistory
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import { MainContainer } from '../../containers'
import { isAuthenticatedSelector } from '../../models/user'
import config from '../../config'

import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import DashboardProducts from './DashboardProducts'
import DashboardUsers from './DashboardUsers'

const Dashboard = ({ ual }) => {
  const dispatch = useDispatch()
  const { appUseUAL } = config
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const history = useHistory()

  const handleOnLogout = () => {
    dispatch.user.logout()
  }

  useEffect(() => {
    if (appUseUAL || isAuthenticated) {
      return
    }

    history.push('/login', { from: location.pathname })
  }, [isAuthenticated, location, history])

  return (
    <MainContainer
      ual={ual}
      topbarContent={
        <DashboardTopbar
          onLogout={handleOnLogout}
          ual={ual}
          appUseUAL={appUseUAL}
        />
      }
      sidebarContent={
        <DashboardSidebar
          user={user}
          onLogout={handleOnLogout}
          ual={ual}
          appUseUAL={appUseUAL}
        />
      }
    >
      <Grid container spacing={4}>
        <Switch>
          <Route
            exact
            path="/dashboard/products"
            component={DashboardProducts}
          />
          <Route exact path="/dashboard/users" component={DashboardUsers} />
          {(!appUseUAL || ual.activeUser) && (
            <Redirect from="/dashboard" to="/dashboard/products" />
          )}
        </Switch>
      </Grid>
    </MainContainer>
  )
}

Dashboard.propTypes = {
  ual: PropTypes.object
}

Dashboard.defaultProps = {
  ual: {}
}

export default Dashboard
