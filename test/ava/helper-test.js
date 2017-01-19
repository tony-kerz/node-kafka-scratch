import test from 'ava'
import {debug} from '../../src/shared/helper'

test('debug', t => {
  t.is(debug(__filename, {endTok: 'test'}).namespace, 'test:ava:helper-test')
})
