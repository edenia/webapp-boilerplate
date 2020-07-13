import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import BPJsonForm from '../../components/BPJsonForm'
import TransitionAlert from '../../components/TransitionAlert'

const contractName = process.env.BPJSON_CONTRACT || 'producerjson'

const EditBPJson = ({ ual }) => {
  const [bpJson, setBpJson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isNotABP, setIsNotABP] = useState(false)
  const [error, setError] = useState({
    isError: false,
    message: null,
    severity: 'warning',
    show: false
  })

  const onSaveBpJson = async (owner, json) => {
    try {
      if (!ual.activeUser) return

      setLoading(true)

      const transaction = {
        actions: [
          {
            account: contractName,
            name: 'set',
            authorization: [
              {
                actor: ual.activeUser.accountName,
                permission: 'active'
              }
            ],
            data: {
              owner,
              json
            }
          }
        ]
      }

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setLoading(false)
    } catch (err) {
      setError({
        isError: true,
        message: err.cause ? err.cause.message : err,
        severity: 'error',
        show: true
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        if (ual.activeUser) {
          setLoading(true)

          const { rows } = await ual.activeUser.rpc.get_table_rows({
            json: true,
            scope: 'eosio',
            code: 'eosio',
            table: 'producers',
            limit: 1,
            lower_bound: 'junglemorpho' // ual.activeUser.accountName
          })

          if (!rows.length || rows[0].owner !== 'junglemorpho') {
            // ual.activeUser.accountName) {
            setIsNotABP(true)
            setLoading(false)

            return
          }

          if (!rows[0].url) {
            setBpJson(null)
            setLoading(false)

            return
          }

          const result = await axios(`${rows[0].url}/bp.json`)

          setBpJson(result.data || null)
          setLoading(false)
        }
      } catch (error) {
        console.log({ message: error.message })
        setLoading(false)
      }
    }

    getData()
  }, [ual.activeUser])

  if (loading && ual.activeUser)
    return (
      <Box mt={5} width="100%">
        <Typography variant="h5" align="center">
          {'Loading BP Json...'.toUpperCase()}
        </Typography>
        <LinearProgress color="secondary" />
      </Box>
    )

  if (isNotABP)
    return (
      <Box mt={5} width="100%">
        <Typography variant="h5" align="center">
          {'You need to register as Block Producer!'.toUpperCase()}
        </Typography>
      </Box>
    )

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <TransitionAlert data={error} setData={setError} />
          <BPJsonForm
            accountName={ual.activeUser ? ual.activeUser.accountName : ''}
            bpJson={bpJson}
            onSubmit={onSaveBpJson}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}

EditBPJson.propTypes = {
  ual: PropTypes.object
}

export default EditBPJson
