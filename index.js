function determineType(value) {
  if (isNull(value)) return 'null'

  if (isObjectLike(value)) {
    if (isArguments(value)) return 'arguments'
    if (isArray(value)) return 'array'
    if (isDate(value)) return 'date'
    if (isMap(value)) return 'map'
    if (isObjectStrict(value)) return 'object-strict'
    if (isSet(value)) return 'set'
  }
  // check primitive types (exculding bigint)
  if (isBoolean(value)) return 'boolean'
  if (isClass(value)) return 'class'
  if (isFunction(value)) return 'function'
  if (_isNaN(value)) return 'NaN'
  if (isNumber(value)) return 'number'
  if (isRegExp(value)) return 'RegExp'
  if (isString(value)) return 'string'
  if (isSymbol(value)) return 'symbol'
  if (isUndefined(value)) return 'undefined'

  if (isObjectLike(value)) return 'object-like'
}

function determineTypeLite(value) {
  if (isNull(value)) return 'null'

  if (isObjectLike(value)) {
    if (isArray(value)) return 'array'
    if (isDate(value)) return 'date'
    if (isObjectStrict(value)) return 'object-strict'
  }
  // check primitive types (exculding bigint)
  if (isBoolean(value)) return 'boolean'
  if (isFunction(value)) return 'function'
  if (isNumber(value)) return 'number'
  if (isString(value)) return 'string'
  if (isSymbol(value)) return 'symbol'
  if (isUndefined(value)) return 'undefined'

  if (isObjectLike(value)) return 'object-like'
}

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(value)
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}
function isArray(value) {
  return Array.isArray(value)
}
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}
function isClass(value) {
  return typeof value === 'function' && /^\s*class\s+/.test(value.toString())
}
function isDate(value) {
  return isObjectLike(value) && getTag(value) == '[object Date]'
}
function isFunction(value) {
  return typeof value === 'function'
}
function isMap(value) {
  return isObjectLike(value) && getTag(value) == '[object Map]'
}
function _isNaN(value) {
  return isNumber(value) && value !== value
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
function isRegExp(value) {
  return isObjectLike(value) && getTag(value) == '[object RegExp]'
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

  const arr = [
    {},
    Object({}),
    new Object({}),
    [],
    new Array(2),
    0,
    1,
    NaN,
    Infinity,
    new Number(1),
    Foo,
    new Foo(),
    new Map([]),
    new Set([]),
    Symbol('foo'),
    'Hello',
    '',
    new String('Hello World'),
    undefined,
    null,
    true,
    false,
    new Boolean(true),
    () => {},
    function () {},
    arguments,
    new Date(),
    /abc/,
    /\.(gif|jpg|jpeg|tiff|png)$/i,
    /^.{8,20}$/,
  ]

  const arrDetermineType = arr.map(determineType)
  const arrDetermineTypeLite = arr.map(determineTypeLite)
  console.log(arrDetermineType, arrDetermineTypeLite)
}
test()
