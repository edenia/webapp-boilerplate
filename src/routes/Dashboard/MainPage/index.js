import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

import FrontLayer from '../FrontLayer'
import MainPageBackdrop from './MainPage.backdrop'

const useStyles = makeStyles((theme) => ({
  rootMainPage: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    marginTop: theme.spacing(3)
  }
}))

const MainPage = ({ useBackdrop, ual }) => {
  const classes = useStyles()

  return useBackdrop ? (
    <MainPageBackdrop ual={ual} />
  ) : (
    <Box className={classes.rootMainPage}>
      <FrontLayer ual={ual} />
    </Box>
  )
}

MainPage.propTypes = {
  ual: PropTypes.object,
  useBackdrop: PropTypes.bool
}

export default MainPage
