import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import InputIcon from '@material-ui/icons/Input'

import CustomRouterLink from 'components/CustomRouterLink'

import styles from './styles'

const useStyles = makeStyles(styles)

const PAGES = [
  {
    title: 'products',
    href: '/dashboard/product',
    icon: <ShoppingBasketIcon />
  },
  {
    title: 'users',
    href: '/dashboard/user',
    icon: <PeopleIcon />
  }
]

const DashboardSidebarContent = ({
  user,
  onLogout,
  onLogin,
  setOpenSidebar
}) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  return (
    <>
      <List className={classes.nav}>
        {PAGES.map((page) => (
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
              onClick={() => setOpenSidebar(false)}
            >
              <div className={classes.icon}>{page.icon}</div>
              {t(page.title)}
            </Button>
          </ListItem>
        ))}
        {!user && (
          <ListItem className={classes.item} disableGutters>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                onLogin()
                setOpenSidebar(false)
              }}
            >
              <div className={classes.icon}>
                <FingerprintIcon />
              </div>
              {t('login')}
            </Button>
          </ListItem>
        )}
        {user && (
          <ListItem className={classes.item} disableGutters key="logoutOption">
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => {
                setOpenSidebar(false)
                onLogout()
              }}
            >
              <div className={classes.icon}>
                <InputIcon />
              </div>
              {t('logout')}
            </Button>
          </ListItem>
        )}
      </List>
    </>
  )
}

DashboardSidebarContent.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func,
  setOpenSidebar: PropTypes.func
}

export default DashboardSidebarContent
