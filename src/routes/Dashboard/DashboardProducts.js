import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { KeyboardDatePicker } from '@material-ui/pickers'
import * as colors from '@material-ui/core/colors'
import MUIDataTable, { TableToolbar, TableFooter } from 'mui-datatables'
import ReactJson from 'react-json-view'
import moment from 'moment'

import { NOTIFICATION_SUBSCRIPTION } from '../../gql'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  dateRange: {
    display: 'flex',
    '& div:first-child': {
      marginRight: theme.spacing(3)
    }
  },
  userIcon: {
    padding: 12,
    color: colors.blueGrey[600]
  },
  arrowIcon: {
    right: 10,
    color: colors.blueGrey[600]
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  table: {
    '@media print': {
      margin: theme.spacing(4)
    }
  },
  tableToolbar: {
    '@media print': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  tableTitle: {
    display: 'none',
    padding: theme.spacing(0, 2),
    '@media print': {
      display: 'block'
    }
  },
  tableLogo: {
    display: 'none',
    maxWidth: 80,
    padding: theme.spacing(1, 2),
    '@media print': {
      display: 'block'
    }
  },
  tableFooter: {
    '@media print': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  tableNote: {
    display: 'none',
    padding: theme.spacing(0, 2),
    '@media print': {
      display: 'block'
    }
  }
}))

const Products = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const { data: { record_tracking: recordTracking } = {} } = useSubscription(
    NOTIFICATION_SUBSCRIPTION
  )

  const columns = [
    {
      label: 'Datos',
      name: 'json_data',
      options: {
        searchable: false,
        filter: false,
        customBodyRender: (value) => (
          <ReactJson
            src={value}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            collapsed={false}
            name="="
          />
        )
      }
    },
    {
      label: 'Hash',
      name: 'hash_result',
      options: {
        filter: true,
        filterType: 'custom',
        searchable: true,
        customBodyRender: (rowData) => (
          <span>
            {rowData ? (
              <Link
                href={`https://jungle.bloks.io/transaction/${rowData}`}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                {rowData}
              </Link>
            ) : (
              'N/A'
            )}
          </span>
        ),
        customFilterListOptions: {
          render: (filters) => {
            if (!filters[0]) {
              return []
            }

            return [`Estado en el blockchain: ${filters[0]}`]
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === -1) {
              filterList[index] = []
            } else {
              filterList[index].splice(filterPos, 1, '')
            }

            return filterList
          }
        },
        filterOptions: {
          logic: (location, filters) => {
            if (filters[0] === 'Pendiente') {
              return !!location
            }

            if (filters[0] === 'Sincronizado') {
              return !location
            }

            return false
          },
          display: (filterList, onChange, index, column) => (
            <Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="blockchainStatusLabel">
                  Estado en el blockchain
                </InputLabel>
                <Select
                  labelId="blockchainStatusLabel"
                  id="blockchainStatus"
                  value={filterList[index][0] || ''}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value
                    onChange(filterList[index], index, column)
                  }}
                  classes={{ icon: classes.arrowIcon }}
                >
                  <MenuItem value={'Sincronizado'}>Sincronizado</MenuItem>
                  <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )
        }
      }
    },
    {
      label: t('userReference'),
      name: 'user_reference',
      options: {
        filter: true,
        filterType: 'custom',
        searchable: false,
        customFilterListOptions: {
          render: (filters) => {
            if (!filters[0]) {
              return []
            }

            return [`${t('userReference')}: ${filters[0]}`]
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === -1) {
              filterList[index] = []
            } else {
              filterList[index].splice(filterPos, 1, '')
            }

            return filterList
          }
        },
        filterOptions: {
          logic: (location, filters) => {
            if (filters[0]) {
              const regex = new RegExp(filters[0], 'i')
              return !regex.test(location)
            }

            return false
          },
          display: (filterList, onChange, index, column) => (
            <TextField
              className={classes.formControl}
              id="userReference"
              label={t('userReference')}
              value={filterList[index][0] || ''}
              onChange={(event) => {
                filterList[index][0] = event.target.value
                onChange(filterList[index], index, column)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className={classes.userIcon}>
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          )
        }
      }
    },
    {
      label: t('identificationId'),
      name: 'json_data',
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (rowData) => <span>{rowData.identificationId}</span>
      }
    },
    {
      label: 'Fecha de creación',
      name: 'created_at',
      options: {
        filter: true,
        filterType: 'custom',
        searchable: true,
        customBodyRender: (rowData) => (
          <span>{moment(rowData).format('hh:mm:ss A DD/MM/yyyy')}</span>
        ),
        customFilterListOptions: {
          render: (filters) => {
            const chips = []

            if (filters[0]) {
              chips.push(
                `Fecha de creación desde: ${moment(filters[0]).format(
                  'DD/MM/yyyy'
                )}`
              )
            }

            if (filters[1]) {
              chips.push(
                `Fecha de creación hasta: ${moment(filters[1]).format(
                  'DD/MM/yyyy'
                )}`
              )
            }

            return chips
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === -1) {
              filterList[index] = []
            } else {
              filterList[index].splice(filterPos, 1, '')
            }

            return filterList
          }
        },
        filterOptions: {
          fullWidth: true,
          logic: (location, filters) => {
            const baseDate = moment(location)
            const fromDate = moment(filters[0] || '-')
            const toDate = moment(filters[1] || '-')

            if (fromDate.isValid() && toDate.isValid()) {
              return baseDate.isBefore(fromDate) || baseDate.isAfter(toDate)
            }

            if (fromDate.isValid()) {
              return baseDate.isBefore(fromDate)
            }

            if (toDate.isValid()) {
              return baseDate.isAfter(toDate)
            }

            return false
          },
          display: (filterList, onChange, index, column) => (
            <Box className={classes.dateRange}>
              <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                placeholder="11/08/2020"
                margin="none"
                id="createdFrom"
                label="Fecha de creación desde"
                value={filterList[index][0] || null}
                onChange={(value) => {
                  if (!moment(value).isValid()) return

                  filterList[index][0] = value.toString()
                  onChange(filterList[index], index, column)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                placeholder="11/08/2020"
                margin="none"
                id="createdTo"
                label="Fecha de creación hasta"
                value={filterList[index][1] || null}
                onChange={(value) => {
                  if (!moment(value).isValid()) return

                  filterList[index][1] = value.toString()
                  onChange(filterList[index], index, column)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Box>
          )
        }
      }
    },
    {
      label: 'Fecha de actualización',
      name: 'updated_at',
      options: {
        filter: true,
        filterType: 'custom',
        searchable: true,
        customBodyRender: (rowData) => (
          <span>{moment(rowData).format('hh:mm:ss A DD/MM/yyyy')}</span>
        ),
        customFilterListOptions: {
          render: (filters) => {
            const chips = []

            if (filters[0]) {
              chips.push(
                `Fecha de actualización desde: ${moment(filters[0]).format(
                  'DD/MM/yyyy'
                )}`
              )
            }

            if (filters[1]) {
              chips.push(
                `Fecha de actualización hasta: ${moment(filters[1]).format(
                  'DD/MM/yyyy'
                )}`
              )
            }

            return chips
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === -1) {
              filterList[index] = []
            } else {
              filterList[index].splice(filterPos, 1, '')
            }

            return filterList
          }
        },
        filterOptions: {
          fullWidth: true,
          logic: (location, filters) => {
            const baseDate = moment(location)
            const fromDate = moment(filters[0] || '-')
            const toDate = moment(filters[1] || '-')

            if (fromDate.isValid() && toDate.isValid()) {
              return baseDate.isBefore(fromDate) || baseDate.isAfter(toDate)
            }

            if (fromDate.isValid()) {
              return baseDate.isBefore(fromDate)
            }

            if (toDate.isValid()) {
              return baseDate.isAfter(toDate)
            }

            return false
          },
          display: (filterList, onChange, index, column) => (
            <Box className={classes.dateRange}>
              <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                placeholder="11/08/2020"
                margin="none"
                id="updatedFrom"
                label="Fecha de actualización desde"
                value={filterList[index][0] || null}
                onChange={(value) => {
                  if (!moment(value).isValid()) return

                  filterList[index][0] = value.toString()
                  onChange(filterList[index], index, column)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                placeholder="11/08/2020"
                margin="none"
                id="updatedTo"
                label="Fecha de actualización hasta"
                value={filterList[index][1] || null}
                onChange={(value) => {
                  if (!moment(value).isValid()) return

                  filterList[index][1] = value.toString()
                  onChange(filterList[index], index, column)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Box>
          )
        }
      }
    }
  ]

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h1" className={classes.title}>
            {t('pageTitle')}
          </Typography>
          <MUIDataTable
            className={classes.table}
            columns={columns}
            data={recordTracking}
            options={{
              print: true,
              download: false,
              selectableRows: 'none',
              downloadOptions: {
                filename: 'record-tracking'
              }
            }}
            components={{
              TableToolbar: ({ ...args }) => (
                <div className={classes.tableToolbar}>
                  <Typography variant="h2" className={classes.tableTitle}>
                    {t('tableTitle')}
                  </Typography>
                  <img
                    src="/logo-msp.png"
                    className={classes.tableLogo}
                    alt="logo msp"
                  />
                  <TableToolbar {...args} />
                </div>
              ),
              TableFooter: ({ ...args }) => (
                <div className={classes.tableFooter}>
                  <Typography variant="body1" className={classes.tableNote}>
                    {t('lastUpdatedAt')}:{' '}
                    {moment().format('hh:mm:ss A DD/MM/yyyy')}
                  </Typography>
                  <TableFooter {...args} />
                </div>
              )
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
