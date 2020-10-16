typedef struct my_struct
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
} my_struct_t;

void do_stuff(my_struct_t stuff);
