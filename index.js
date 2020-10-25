function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(value)
}

function isArray(value) {
  return Array.isArray(value)
}
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}
function isNull(value) {
  return value === null
}
function isNumber(value) {
  return typeof value === 'number' ||
    (isObjectLike(value) && getTag(value) == '[object Number]')
}
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}
function isString(value) {
  var type = typeof value
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
}
function isUndefined(value) {
  return value === undefined
}
