import path from 'path'
import _ from 'lodash'
import _debug from 'debug'

const dbg = _debug('app:shared:helper')

// eslint-disable-next-line import/prefer-default-export
export function debug(file, {endTok = 'src', suffix = '.js'} = {}) {
  const idx = file.lastIndexOf(suffix)
  const _file = idx ? file.substr(0, idx) : file
  const toks = _.takeRightWhile(_file.split(path.sep), e => (e !== endTok))
  const name = [endTok].concat(toks).join(':')
  dbg('file=%o, name=%o', file, name)
  return _debug(name)
}
