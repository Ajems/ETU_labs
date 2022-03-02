#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <locale.h>
#include <wchar.h>
#include <wctype.h>
#include "structs.h"
#include "print.h"
#define STEP 10
#define SIZE 50



//чтение предложения
wchar_t* read_sent(int *count_char, int *count_lat){
    int len = 0, lat = 0, size = SIZE;
    unsigned int c;
    wchar_t* text = malloc(size*sizeof(wchar_t));

    if(text == NULL){
        err(1);
    }

    while(1){
        c = getwchar();

        if (c == L'\n' && len == 0){
            text[0] = c;
            *count_char = 1;
            return text;
        }


        //непосредсвенно считывание в массив
        text[len] = c;

        //латинские
        if (((97 <= c) && (c<= 122)) || ((65 <= c) && (c <= 90))){
            lat++;
        }

        len++;
        if (len == size){
            size += STEP;
            text = (wchar_t*) realloc(text, size*sizeof (wchar_t));

            if(text == NULL){
                err(1);
            }
        }

        if (c == '.'){
            break;
        }
    }

    *count_char = len;
    *count_lat = lat;
    text[len] = '\0';
    return text;
}


void read_text (Text_s* text){

    int real_size_text_arr = SIZE;

    while (1){

        Sentence_s sentence;

        sentence.sentence_arr = read_sent(&sentence.count_char,  &sentence.count_lat);

        if (sentence.sentence_arr[0] == L'\n'){
            break;
        }

        //добавили в массив предложений нашу структуру предложения
        text->text_arr[text->count_sentence] = sentence;
        text->count_sentence ++;

        //расширение памяти для хранения структур предложений
        if (text->count_sentence == real_size_text_arr){
            text->text_arr = realloc(text->text_arr, real_size_text_arr+STEP);
            if(text->text_arr == NULL){
                err(1);
            }

            real_size_text_arr += STEP;
        }
    }
}
