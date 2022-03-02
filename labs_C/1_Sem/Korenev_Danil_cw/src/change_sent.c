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


void del_equal_sentences(Text_s* text){
    getchar();

    for (int origin = 0; origin < text->count_sentence; origin++){
        for (int copy = origin+1; copy < text->count_sentence; copy++){

            // ускорения программы, предложения будут сравниваться только при одинаковом количестве символов
            if (text->text_arr[origin].count_char == text->text_arr[copy].count_char) {

                if (wcscasecmp(text->text_arr[origin].sentence_arr, text->text_arr[copy].sentence_arr) == 0){
                    // удалить copy смещением массива и, соответсвенно, удалением copy во всем text

                    memmove((text->text_arr)+copy, (text->text_arr)+copy+1, ((text->count_sentence)-copy)*sizeof(Sentence_s));

                    //стало меньше предложенй
                    text->count_sentence --;
                    //т.к. предложение удалено, курсор остается на том же индексе
                    copy --;

                }
            }
        }
    }
}

void del_some_sentence(Text_s* text){
    for(int sent =0; sent < text->count_sentence; sent++){
        int flag_s_s = 0;
        int flag_u_c = 0;



        for (int symbol = 0; symbol < text->text_arr[sent].count_char; symbol++){
            if (iswalpha(text->text_arr[sent].sentence_arr[symbol]) == 0){

                //ЕСЛИ НЕ БУКВЫ
                if ((7 <= text->text_arr[sent].sentence_arr[symbol]) && (text->text_arr[sent].sentence_arr[symbol] <= 13)){

                    flag_s_s = 1;
                }
            }
            else{
                if (iswupper(text->text_arr[sent].sentence_arr[symbol])){

                    //флаг для заглавных букв поднят
                    flag_u_c = 1;
                }
            }
        }


        if (flag_s_s == 1 && flag_u_c == 0){
            wprintf(L"DELETED ---> %ls\n", text->text_arr[sent].sentence_arr);
            memmove((text->text_arr)+sent, (text->text_arr)+sent+1, ((text->count_sentence)-sent)*sizeof(Sentence_s));
            text->count_sentence--;
            sent--;
        }
    }
    wprintf(L"<------------------------------->\n");
    wprintf(L"\t\tAFTER DELETE\n\n");
    for (int i = 0; i < text->count_sentence; i++) {
        wprintf(L"%ls\n", text->text_arr[i].sentence_arr);
    }
    wprintf(L"<------------------------------->\n");
}

void reverse(wchar_t *s)
{
    unsigned long i, j;
    wchar_t c;

    for (i = 0, j = wcslen(s)-1; i<j; i++, j--) {
        c = s[i];
        s[i] = s[j];
        s[j] = c;
    }
}


int itoa(long int n, wchar_t *s)
{
    int i;
    i = 0;

    do {
        s[i++] = n % 10 + L'0';
    } while ((n /= 10) > 0);

    s[i] = '\0';
    reverse(s);

    return i;
}


void symbol_to_code (Text_s* text){
    for (int sent = 0; sent < text->count_sentence; sent++){
        for(int symbol = 0; symbol < text->text_arr[sent].count_char; symbol++){
            if (iswalpha(text->text_arr[sent].sentence_arr[symbol]) == 0){

                //получили код символа
                int num = (int)text->text_arr[sent].sentence_arr[symbol];
                wchar_t* str_num = (wchar_t*)malloc(6 * sizeof(wchar_t));

                if(str_num == NULL){
                    err(1);
                }

                int len = itoa(num, str_num);


                //выделяем память, сдвигаем символы, вставляем слово, увеличиваем длину предложения
                text->text_arr[sent].sentence_arr = (wchar_t*)realloc(text->text_arr[sent].sentence_arr, (text->text_arr[sent].count_char+len)*sizeof(wchar_t));
                if(text->text_arr[sent].sentence_arr == NULL){
                    err(1);
                }

                memmove(text->text_arr[sent].sentence_arr+symbol+len-1, text->text_arr[sent].sentence_arr+symbol, (text->text_arr[sent].count_char-symbol+1)*sizeof(wchar_t));

                wcsncpy(text->text_arr[sent].sentence_arr + symbol, str_num, len);

                text->text_arr[sent].count_char+=len-1;
                symbol += len - 1;

            }
        }
    }
}



