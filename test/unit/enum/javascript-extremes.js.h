typedef enum my_enum
{
  FIRST = 0,
  // NOTE: min/max as defined by javascript.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
  // NOTE: one step on the safe side.
  MIN_SAFE_INTEGER_PLUS_ONE = -9007199254740990,
  MAX_SAFE_INTEGER_MINUS_ONE = 9007199254740990,
  // NOTE: the javascript limit.
  MIN_SAFE_INTEGER = -9007199254740991,
  MAX_SAFE_INTEGER = 9007199254740991,
  // NOTE: one step on the dangerous side.
  MIN_SAFE_INTEGER_MINUS_ONE = -9007199254740992,
  MAX_SAFE_INTEGER_PLUS_ONE = 9007199254740992,

  // NOTE: min/max as defined by ref-napi.
  // https://github.com/node-ffi-napi/ref-napi/blob/b0809c25e5d9e4efa82ee6c323e1f961044b65e0/src/binding.cc#L66-L70
  // NOTE: is already one step on the dangerous side, as defined by javascript.
  // https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin
  // https://stackoverflow.com/questions/26380364/why-is-number-max-safe-integer-9-007-199-254-740-991-and-not-9-007-199-254-740-9
  JS_MIN_INT = -9007199254740992LL,
  JS_MAX_INT = +9007199254740992LL,
  // NOTE: one step on the dangerous side.
  JS_MIN_INT_MINUS_ONE = -9007199254740993LL,
  JS_MAX_INT_PLUS_ONE = +9007199254740993LL,
  // NOTE: two steps on the dangerous side.
  JS_MIN_INT_MINUS_TWO = -9007199254740994LL,
  JS_MAX_INT_PLUS_TWO = +9007199254740994LL,
} my_enum_t;

void do_stuff(my_enum_t stuff);
