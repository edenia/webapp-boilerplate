import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import TitlePage from 'components/PageTitle'

const useStyles = makeStyles((theme) => ({
  productFrontLayerRoot: {
    padding: theme.spacing(3, 1, 0, 1),
    [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
      marginTop: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(3, 0)
    }
  },
  titleBox: {
    width: 225,
    paddingLeft: theme.spacing(2),
    '& h4': {
      fontSize: 33,
      letterSpacing: '-0.49px',
      color: '#000000',
      fontWeight: 'bold'
    },
    [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
      width: '70% !important',
      '& h4': {
        fontSize: '33px !important',
        letterSpacing: '-0.49px !important',
        color: '#000000',
        fontWeight: 'bold'
      }
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      paddingLeft: 0,
      '& h4': {
        letterSpacing: '-0.91px',
        fontSize: 59.2
      }
    }
  }
}))

const ProductFrontLayer = () => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  return (
    <Box className={classes.productFrontLayerRoot}>
      <TitlePage title={t('htmlTitle')} />
      <Box className={classes.titleBox}>
        <Typography variant="h4">{t('products')}</Typography>
      </Box>
    </Box>
  )
}

export default ProductFrontLayer
