import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import * as colors from '@material-ui/core/colors'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import InputIcon from '@material-ui/icons/Input'

import Profile from '../../components/Profile'
import CustomRouterLink from '../../components/CustomRouterLink'

const useStyles = makeStyles((theme) => ({
  nav: {
    marginBottom: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}))

const DashboardSidebarContent = ({ user, onLogout }) => {
  const classes = useStyles()

  const pages = [
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Users',
      href: '/dashboard/users',
      icon: <PeopleIcon />
    }
  ]

  return (
    <>
      <Profile user={user} />
      <Divider className={classes.divider} />
      <List className={classes.nav}>
        {pages.map((page) => (
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        ))}
        <ListItem className={classes.item} disableGutters key="logoutOption">
          <Button className={classes.button} color="inherit" onClick={onLogout}>
            <div className={classes.icon}>
              <InputIcon />
            </div>
            Logout
          </Button>
        </ListItem>
      </List>
    </>
  )
}

DashboardSidebarContent.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default DashboardSidebarContent
