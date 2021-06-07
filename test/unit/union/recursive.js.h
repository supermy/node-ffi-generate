typedef union my_union
{
  union my_union *my_recursive_union;
} my_union_t;

void do_stuff(my_union_t stuff);
