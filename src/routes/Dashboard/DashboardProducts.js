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
import MUIDataTable from 'mui-datatables'
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
      label: 'Data',
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
            collapsed
            name="ISTMO"
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

            return [`Blockchain status: ${filters[0]}`]
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
            if (filters[0] === 'Pending') {
              return !!location
            }

            if (filters[0] === 'Synchronized') {
              return !location
            }

            return false
          },
          display: (filterList, onChange, index, column) => (
            <Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="blockchainStatusLabel">
                  Blockchain status
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
                  <MenuItem value={'Synchronized'}>Synchronized</MenuItem>
                  <MenuItem value={'Pending'}>Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )
        }
      }
    },
    {
      label: 'User Reference',
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

            return [`User reference: ${filters[0]}`]
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
              label="User reference"
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
      label: 'Created At',
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
                `Created from: ${moment(filters[0]).format('DD/MM/yyyy')}`
              )
            }

            if (filters[1]) {
              chips.push(
                `Created to: ${moment(filters[1]).format('DD/MM/yyyy')}`
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
                label="Created from"
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
                label="Created to"
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
      label: 'Updated At',
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
                `Updated from: ${moment(filters[0]).format('DD/MM/yyyy')}`
              )
            }

            if (filters[1]) {
              chips.push(
                `Updated to: ${moment(filters[1]).format('DD/MM/yyyy')}`
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
                label="Updated from"
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
                label="Updated to"
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
          <Typography variant="h1">{t('recordTracking')}</Typography>
          <MUIDataTable
            columns={columns}
            data={recordTracking}
            options={{
              print: false,
              selectableRows: 'none',
              downloadOptions: {
                filename: 'record-tracking'
              }
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
