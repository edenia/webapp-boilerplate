import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import { MainContainer } from '../../containers'
import config from '../../config'

import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import DashboardProducts from './DashboardProducts'
import DashboardUsers from './DashboardUsers'

const Dashboard = ({ ual }) => {
  const { appUseUAL } = config

  return (
    <MainContainer
      ual={ual}
      topbarContent={<DashboardTopbar ual={ual} appUseUAL={appUseUAL} />}
      sidebarContent={<DashboardSidebar ual={ual} appUseUAL={appUseUAL} />}
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
