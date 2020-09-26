typedef void (*do_stuff_callback)(void *stuff);

typedef struct my_struct
{
    do_stuff_callback callback;
} my_struct_t;

void do_stuff(my_struct_t stuff);
