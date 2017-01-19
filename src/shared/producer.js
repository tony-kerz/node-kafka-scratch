import assert from 'assert'
import _ from 'lodash'
import kafka from 'no-kafka'
import debug from 'debug'

process.on('unhandledRejection', reason => {
  // eslint-disable-next-line no-console
  console.log('unhandled-rejection: reason=%o', reason)
  process.exit(1)
})

const dbg = debug('app:shared:producer')
let _producer

async function getProducer() {
  dbg('get-producer')
  if (!_producer) {
    dbg('get-producer: initializing...')
    _producer = new kafka.Producer()
    await _producer.init()
  }
  return _producer
}

function stringify(val) {
  return _.isObject(val) ? JSON.stringify(val) : val
}

export async function send({topic, key, value}) {
  dbg('send')
  try {
    const producer = await getProducer()
    assert(producer, 'producer required')
    dbg('send: obtained producer')
    const result = await producer.send(
      {
        topic,
        message: {
          key: stringify(key),
          value: stringify(value)
        }
      }
    )
    dbg('send: result=%o', result)
    if (Array.isArray(result)) {
      // eslint-disable-next-line array-callback-return
      result.map(elt => {
        if (elt.error) {
          throw new Error(elt.error)
        }
      })
    }
  } catch (err) {
    dbg('send: err=%o', err)
  }
}

export function close() {
  return _producer && _producer.end()
}
