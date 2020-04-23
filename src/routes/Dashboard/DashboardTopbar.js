import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import InputIcon from '@material-ui/icons/Input'

const DashboardTopbar = ({ onLogout }) => (
  <IconButton color="inherit" onClick={onLogout}>
    <InputIcon />
  </IconButton>
)

DashboardTopbar.propTypes = {
  onLogout: PropTypes.func
}

export default DashboardTopbar
