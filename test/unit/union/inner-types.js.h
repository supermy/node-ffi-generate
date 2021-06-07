typedef union my_union
{
  void *my_void;
  union my_inner_union
  {
    void *my_a;
    void *my_b;
  };
  struct my_inner_struct
  {
    void *my_c;
    void *my_d;
  };
} my_union_t;

void do_stuff(my_union_t stuff);
