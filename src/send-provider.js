import assert from 'assert'
import _ from 'lodash'
// import {debug} from './shared/helper'
import {send} from './shared/producer'

// const dbg = debug(__filename)

export default async function ({topic = 'provider', value}) {
  assert(value.id, 'id required')
  return await send({topic, key: value.id, value})
}
