#include <wchar.h>

typedef struct Sentence{
    wchar_t* sentence_arr;
    int count_char;
    int count_lat;
}Sentence_s;


typedef struct Text{
    Sentence_s *text_arr;
    int count_sentence;
}Text_s;
