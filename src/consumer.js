import kafka from 'no-kafka'
import debug from 'debug'

const dbg = debug('app:consumer')

export default (async function () {
  const consumer = new kafka.SimpleConsumer()

  const result = await consumer.init()
  dbg('init=%o', result)
  consumer.subscribe(
    'topic-1',
    [0, 1],
    (messageSet, topic, partition) => {
      messageSet.forEach(m => {
        dbg(
          'topic=%o, partition=%o, offset=%o, key=%o, value=%o',
          topic, partition, m.offset, m.message.key.toString(), m.message.value.toString()
        )
      })
    }
  )
})()
