typedef enum my_enum : unsigned long long
{
  FIRST = 0,
  SECOND = 1,
  LAST = 18446744073709551615
} my_enum_t;

void do_stuff(my_enum_t stuff);
