import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1)
  }
}))

const TransitionAlert = ({ data, setData }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Collapse in={data.show}>
        <Alert
          severity={data.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setData({ ...data, show: false })
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {data.message}
        </Alert>
      </Collapse>
    </Box>
  )
}

TransitionAlert.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func
}

TransitionAlert.defaultProps = {
  data: {
    show: false,
    isError: false,
    message: 'Error',
    severity: 'warning'
  },
  setData: () => {}
}

export default TransitionAlert
