import kafka from 'no-kafka'
import debug from 'debug'

const dbg = debug('app:group-consumer')

export default (async function () {
  const consumer = new kafka.GroupConsumer()

  const subscriptions = ['provider']

  const handler = (messageSet, topic, partition) => {
    messageSet.forEach(async m => {
      const value = JSON.parse(m.message.value)

      dbg(
        'topic=%o, partition=%o, offset=%o, key=%o, value=%o',
        topic, partition, m.offset, m.message.key.toString(), value
      )

      // do a bunch of (idempotent) stuff with the message here
      // when done, commit...
      const result = await consumer.commitOffset(
        {
          topic,
          partition,
          offset: m.offset
        }
      )
      dbg('commit: result=%o', result)
    })
  }

  try {
    const result = await consumer.init([{subscriptions, handler}])
    dbg('init: result=%o', result)
  } catch (err) {
    dbg('err=%o', err)
  }
})()
