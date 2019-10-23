const GraphemeSplitter = require('grapheme-splitter')

module.exports = function createValidator(min, max) {
  min = min || Number.NEGATIVE_INFINITY
  max = max || Number.POSITIVE_INFINITY

  if (max < 1) {
    throw new RangeError('max must be >= 1')
  } else if (min > max) {
    throw new RangeError('max must be larger than min')
  }

  function textLengthValidator(key, keyDisplayName, object, cb) {
    const value = (object[key] && object[key]) || ''

    if (typeof value != 'string')
      throw new TypeError(`${[key]} must be a string`)

    const splitter = new GraphemeSplitter()

    if (
      splitter.countGraphemes(value) >= min &&
      splitter.countGraphemes(value) <= max
    )
      return cb(null)
    var message = `${keyDisplayName} must have `

    if (min === max) {
      message += `${max} characters`
    } else if (min === Number.NEGATIVE_INFINITY) {
      message += `no more than ${max} characters`
    } else if (max === Number.POSITIVE_INFINITY) {
      message += `no less than ${min} characters`
    } else {
      message += `between ${min} and ${max} characters`
    }

    cb(null, message)
  }
  return textLengthValidator
}
