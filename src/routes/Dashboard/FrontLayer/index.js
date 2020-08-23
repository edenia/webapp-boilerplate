import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

import ProductFrontLayer from './Product'
import UserFrontLayer from './User'

const useStyles = makeStyles((theme) => ({
  frontLayer: {
    height: '100%',
    overflowY: 'auto',
    padding: 16,
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(32),
      paddingLeft: theme.spacing(32)
    }
  }
}))

const FrontLayer = ({ ual }) => {
  const classes = useStyles()

  return (
    <Box className={classes.frontLayer}>
      <Switch>
        <Route exact path="/dashboard/product" component={ProductFrontLayer} />
        <Route exact path="/dashboard/user" component={UserFrontLayer} />
        <Redirect from="/dashboard" to="/dashboard/product" />
      </Switch>
    </Box>
  )
}

FrontLayer.propTypes = {
  ual: PropTypes.object
}

export default FrontLayer
