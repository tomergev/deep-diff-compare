function determineType(value) {
  if (isNull(value)) return 'null'
  if (isObjectLike(value)) {
    if (isArray(value)) return 'array'
    if (isMap(value)) return 'map'
    if (isObjectStrict(value)) return 'object'
    if (isSet(value)) return 'set'
    if (isSymbol(value)) return 'symbol'
  }
  // check primitive types (exculding symbol and bigint)
  if (isBoolean(value)) return 'boolean'
  if (isNumber(value)) return 'number'
  if (isString(value)) return 'string'
  if (isUndefined(value)) return 'undefined'
}

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
function isMap(value) {
  return isObjectLike(value) && getTag(value) == '[object Map]'
}
function isNull(value) {
  return value === null
}
function isNumber(value) {
  return typeof value === 'number' ||
    (isObjectLike(value) && getTag(value) == '[object Number]')
}
function isObjectLike(value) {
  return typeof value === 'object' && !isNull(value)
}
function isObjectStrict(value) {
  return value != null
    && value instanceof Object
    && value.constructor === Object
}
function isSet(value) {
  return isObjectLike(value) && getTag(value) == '[object Set]'
}
function isString(value) {
  var type = typeof value
  return type === 'string' || (type === 'object' && value != null && !isArray(value) && getTag(value) == '[object String]')
}
function isSymbol(value) {
  var type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
function isUndefined(value) {
  return value === undefined
}

function test() {
  class Foo {
    constructor() {}
  }

  [
    {},
    [],
    0,
    1,
    NaN,
    Infinity,
    new Foo(),
    new Map([]),
    new Set([]),
    // new Symbol([]),
    'Hello',
    '',
    undefined,
    null,
    true,
    false,
  ].forEach(function (val) {
    console.log(determineType(val))
  })
}
test()
