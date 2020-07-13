import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import { MainContainer } from '../../containers'

import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import EditBPJson from './EditBPJson'

const Dashboard = ({ ual }) => (
  <MainContainer
    topbarContent={
      <DashboardTopbar
        user={ual.activeUser}
        onLogout={() => ual.logout()}
        onLogin={() => ual.showModal()}
      />
    }
    sidebarContent={
      <DashboardSidebar
        user={ual.activeUser}
        onLogout={() => ual.logout()}
        onLogin={() => ual.showModal()}
      />
    }
  >
    <Grid container>
      <Switch>
        <Route exact path="/dashboard/bpjson-generator">
          <EditBPJson ual={ual} />
        </Route>
        <Redirect from="/dashboard" to="/dashboard/bpjson-generator" />
      </Switch>
    </Grid>
  </MainContainer>
)

Dashboard.propTypes = {
  ual: PropTypes.object
}

Dashboard.defaultProps = {
  ual: {}
}

export default Dashboard
