import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import { MainContainer } from '../../containers'
import { isAuthenticatedSelector } from '../../models/user'

import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import DashboardProducts from './DashboardProducts'
import DashboardUsers from './DashboardUsers'

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const user = useSelector((state) => state.user)
  const location = useLocation()

  const handleOnLogout = () => {
    dispatch.user.logout()
  }

  useEffect(() => {
    if (isAuthenticated) {
      return
    }

    history.push('/login', { from: location.pathname })
  }, [isAuthenticated, location, history])

  return (
    <MainContainer
      topbarContent={<DashboardTopbar onLogout={handleOnLogout} />}
      sidebarContent={
        <DashboardSidebar user={user} onLogout={handleOnLogout} />
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
          <Redirect from="/dashboard" to="/dashboard/products" />
        </Switch>
      </Grid>
    </MainContainer>
  )
}

Dashboard.propTypes = {
  history: PropTypes.any
}

export default Dashboard
