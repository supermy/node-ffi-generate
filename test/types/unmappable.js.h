#include <stdint.h>
#include <stdbool.h>

typedef struct my_unmappable_types
{
  // NOTE: there's no mapping to ref.bool, since it's a typedef with boolean javascript logic on top.
  // https://tootallnate.github.io/ref/#types-bool
  bool my_bool;
  uint8_t my_uint8_t;
} my_unmappable_types_t;

void do_stuff(my_unmappable_types_t stuff);
