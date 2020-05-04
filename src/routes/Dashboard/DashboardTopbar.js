import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import InputIcon from '@material-ui/icons/Input'
import { Link } from '@reach/router'
import { useLocation, useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  sessionText: {
    marginLeft: 5,
    color: theme.palette.primary.contrastText,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}))

const DashboardTopbar = ({ onLogout, ual, appUseUAL }) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  if (!appUseUAL)
    return (
      <IconButton color="inherit" onClick={onLogout}>
        <InputIcon />
      </IconButton>
    )

  return (
    <>
      {ual.activeUser ? (
        <Box>
          <Link to="/account" className={classes.link}>
            <IconButton color="inherit">
              <AccountCircleIcon />
              <Typography className={classes.sessionText} variant="subtitle1">
                {ual.activeUser.accountName}
              </Typography>
            </IconButton>
          </Link>
          <IconButton
            color="inherit"
            onClick={() => {
              ual.logout()
              history.push('/dashboard', { from: location.pathname })
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <IconButton color="inherit" onClick={() => ual.showModal()}>
            {ual.loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <>
                <FingerprintIcon />
                <Typography className={classes.sessionText} variant="subtitle1">
                  Login
                </Typography>
              </>
            )}
          </IconButton>
        </>
      )}
    </>
  )
}

DashboardTopbar.propTypes = {
  onLogout: PropTypes.func,
  ual: PropTypes.object,
  appUseUAL: PropTypes.bool
}

export default DashboardTopbar
