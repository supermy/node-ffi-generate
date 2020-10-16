typedef enum my_enum
{
  FIRST = 0,
  SECOND = -1,
  // NOTE: test confirms that enum value redefinitions are hidden by libclang.
  FIRST = 1,
  LAST = 99
} my_enum_t;

void do_stuff(my_enum_t stuff);
