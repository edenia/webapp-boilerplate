import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

import ProductBackLayer from './Product'
import UserBackLayer from './User'

const useStyles = makeStyles((theme) => ({
  backLayer: {
    height: '100%',
    overflowY: 'auto',
    padding: 16,
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(32),
      paddingLeft: theme.spacing(32)
    }
  }
}))

const BackLayer = ({ ual }) => {
  const classes = useStyles()

  return (
    <Box className={classes.backLayer}>
      <Switch>
        <Route exact path="/dashboard/product" component={ProductBackLayer} />
        <Route exact path="/dashboard/user" component={UserBackLayer} />
        <Redirect from="/dashboard" to="/dashboard/product" />
      </Switch>
    </Box>
  )
}

BackLayer.propTypes = {
  ual: PropTypes.object
}

export default BackLayer
