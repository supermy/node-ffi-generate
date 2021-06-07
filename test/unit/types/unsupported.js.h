typedef struct my_unsupported_types
{
    __int128_t my___int128_t;
    __uint128_t my___uint128_t;
} my_unsupported_types_t;

void do_stuff(my_unsupported_types_t stuff);

void do_stuff__int128_t(__int128_t stuff);
void do_stuff__uint128_t(__uint128_t stuff);
