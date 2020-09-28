typedef enum my_enum : long long
{
  FIRST = 0,
  SECOND = 9223372036854775807,
  // NOTE: -9223372036854775808 is out of range.
  LAST = -9223372036854775807
} my_enum_t;

void do_stuff(my_enum_t stuff);
