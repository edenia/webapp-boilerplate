import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useLocation } from 'react-router-dom'
import { Backdrop } from '@eoscostarica/eoscr-components'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import BackLayer from '../BackLayer'
import FrontLayer from '../FrontLayer'

const STATIC_PAGES = ['/product']

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflowY: 'hidden',
    [theme.breakpoints.up('sm')]: {
      height: '100vh'
    }
  },
  backLayer: {
    overflowY: 'auto'
  },
  headerBox: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(32),
      paddingLeft: theme.spacing(32)
    }
  },
  menu: {
    flexGrow: 1,
    marginTop: 80
  },
  menuButton: {
    marginRight: 16
  },
  title: {
    flexGrow: 1
  },
  frontLayerRoot: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 0
  },
  root: {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    borderBottomWidth: 0,
    overflowX: 'hidden'
  },
  labelBackdrop: {
    fontSize: 20.2,
    fontWeight: 600,
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  headerBoxNone: {
    display: 'none'
  },
  alert: {
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: theme.palette.primary.contrastText,
    '& a': {
      color: theme.palette.primary.contrastText,
      lineBreak: 'anywhere'
    }
  }
}))

const MainPageBackdrop = ({ ual }) => {
  const { t, i18n } = useTranslation('translations')
  const theme = useTheme()
  const classes = useStyles()
  const location = useLocation()
  const [title, setTitle] = useState('headerTitle')
  const [layerHeightUp, setLayerHeightUp] = useState(51)
  const [isStaticPage, setIsStaticPage] = useState(false)
  const [message, setMessage] = useState()
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  })

  const height = window.innerHeight

  useEffect(() => {
    if (STATIC_PAGES.includes(location.pathname)) {
      setLayerHeightUp(isLandscape && height < 450 ? 150 : 270)
      setTitle('')
      setIsStaticPage(true)

      return
    }

    setIsStaticPage(false)

    if (isMobile) {
      setTitle('headerTitle')
      setLayerHeightUp(60)

      return
    }

    setLayerHeightUp(isLandscape && height < 450 ? 80 : 470)
    setTitle('headerTitle')
  }, [isMobile, location.pathname, isLandscape, height])

  useEffect(() => {
    if (STATIC_PAGES.includes(location.pathname)) {
      setTitle('')
    } else {
      setTitle('headerTitle')
    }
  }, [i18n.language, location.pathname])

  return (
    <Backdrop
      className={classes.backdrop}
      classes={{
        frontLayer: classes.frontLayerRoot,
        root: classes.root,
        backLayer: classes.backLayer,
        headerBox:
          isStaticPage || isMobile || (isLandscape && height < 450)
            ? classes.headerBox
            : classes.headerBoxNone
      }}
      backLayer={
        <>
          <BackLayer
            ual={ual}
            pathname={location.pathname}
            showMessage={setMessage}
          />
          <Snackbar
            open={!!message}
            autoHideDuration={30000}
            onClose={() => setMessage(null)}
          >
            <Alert
              onClose={() => setMessage(null)}
              severity={message?.type}
              className={classes?.alert}
            >
              {message?.content}
            </Alert>
          </Snackbar>
        </>
      }
      frontLayer={<FrontLayer />}
      headerText={
        <Typography className={classes.labelBackdrop}>{t(title)}</Typography>
      }
      layerHeightUp={layerHeightUp}
      isStaticPage={isStaticPage}
    />
  )
}

MainPageBackdrop.propTypes = {
  ual: PropTypes.object
}

MainPageBackdrop.defaultProps = {
  ual: {}
}

export default MainPageBackdrop
