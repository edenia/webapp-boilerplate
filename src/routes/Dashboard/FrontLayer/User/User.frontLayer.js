import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import TitlePage from 'components/PageTitle'

import styles from './styles'

const useStyles = makeStyles(styles)

const UserFrontLayer = () => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  return (
    <Box className={classes.userBackLayerRoot}>
      <TitlePage title={t('htmlTitle')} />
      <Box className={classes.titleBox}>
        <Typography variant="h4">{t('users')}</Typography>
      </Box>
    </Box>
  )
}

export default UserFrontLayer
