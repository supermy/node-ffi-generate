#include <stdarg.h>

typedef struct my_types
{
  va_list my_va_list;
} my_types_t;

void do_stuff(my_types_t stuff);
void do_stuff_va_list(va_list stuff);
