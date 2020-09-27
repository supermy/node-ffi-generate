#include <stddef.h>
#include <stdint.h>

typedef struct my_types
{
  void *my_void;
  size_t my_size_t;

  unsigned char my_uchar;
  unsigned short my_ushort;
  unsigned int my_uint32;
  unsigned long my_ulong;
  unsigned long long my_ulonglong;

  char my_char;
  short my_short;
  int my_int32;
  long my_long;
  long long my_longlong;
  float my_float;
  double my_double;

  unsigned long int my_unsigned_long_int;
  unsigned short int my_unsigned_short_int;
  unsigned int my_unsigned_int;

  int8_t my_int8_t;
  int16_t my_int16_t;
  int32_t my_int32_t;
  int64_t my_int64_t;

  uint8_t my_uint8_t;
  uint16_t my_uint16_t;
  uint32_t my_uint32_t;
  uint64_t my_uint64_t;
} my_types_t;

void do_stuff(my_types_t stuff);
