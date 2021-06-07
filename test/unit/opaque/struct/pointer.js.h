typedef enum my_result {
    SUCCESS = 0,
} my_result_t;

struct my_struct;
typedef struct my_struct my_struct_t;

my_result_t do_stuff(my_struct_t **stuff);
my_result_t do_more_stuff(my_struct_t *stuff);
