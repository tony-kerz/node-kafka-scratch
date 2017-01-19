import _ from 'lodash'
import debug from 'debug'
import sendProvider from './send-provider'

const dbg = debug('app:producer')

export default (async function () {
  dbg('starting...')

  try {
    const value = {
      name: {
        first: 'fred',
        last: 'smith'
      },
      id: {
        oid: 'npi',
        extension: '123'
      }
    }
    await sendProvider({value})
    // producer.end()
  } catch (err) {
    dbg('send: err=%o', err)
  }
})()
