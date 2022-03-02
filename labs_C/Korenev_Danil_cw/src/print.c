#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <locale.h>
#include <wchar.h>
#include <wctype.h>
#include "structs.h"
#define STEP 10
#define SIZE 50

void err(int a){
    switch (a) {
        case 1:
            wprintf(L"Ошибка! Выделение памяти невозможно!\n");
            break;
        case 2:
            wprintf(L"Неверное значение! попробуйте еще раз\n");
            break;
        default:
            break;
    }
}

void print_text(Text_s* text){
    wprintf(L"<------------------------------->\n");
    wprintf(L"\t\tTEXT\n\n");
    for (int i = 0; i < text->count_sentence; i++) {
        wprintf(L"%ls\n", text->text_arr[i].sentence_arr, text->text_arr[i].count_char);
    }
    wprintf(L"\n<------------------------------->\n");
}

void text_data(Text_s* text){
    wprintf(L"<------------------------------->\n\t\tSORTED\n\n");
    for(int i = 0; i < text->count_sentence; i++){
        wprintf(L"латинских букв: <%ld>\tsentence <%ls>\n", text->text_arr[i].count_lat, text->text_arr[i].sentence_arr);
    }
    wprintf(L"<------------------------------->\n");
}

void count_words_to_dict(Text_s* text){
    //массив указателей на слова

    wchar_t** dict = (wchar_t**)malloc((SIZE)*sizeof(wchar_t*));

    if (dict == NULL){
        err(1);
    }


    int mem_size_dict = SIZE;
    int* count = (int*)calloc(SIZE, sizeof(int));
    int total_words = 0;


    //для каждого предлоежния
    for (int sent = 0; sent < text->count_sentence; sent++){

        //создаем копию предложения
        wchar_t* sent_copy = malloc((wcslen(text->text_arr[sent].sentence_arr)+1) * sizeof (wchar_t));
        if(sent_copy == NULL){
            err(1);
        }

        wcscpy(sent_copy, text->text_arr[sent].sentence_arr);
        wchar_t *pt;
        wchar_t* words = wcstok(sent_copy, L" ,.;:\n\t", &pt);


        while (words != NULL){

            unsigned long len_word = wcslen(words);

            if (words[len_word-1] == L','){
                words[len_word-1] = L'\0';
            }

            int flag = 0;
            //пробегаемся по словам в словаре
            for (int i = 0; i < total_words; i++){

                //нашлось такое слово в словаре
                if (wcscmp(dict[i], words) == 0) {

                    //увеличиить на 1 его кол-во встречаний(?)
                    count[i]++;
                    flag = 1;
                    break;
                }
            }

            //если слово не нашлось
            if (flag == 0){

                if (total_words == mem_size_dict){
                    mem_size_dict += STEP;
                    dict = (wchar_t**)realloc(dict, (mem_size_dict)*sizeof(wchar_t*));
                    if(dict == NULL){
                        err(1);

                    }

                    //выделитьдоп память для count
                    count = (int*)realloc(count, (mem_size_dict)*sizeof(int));
                    if(count == NULL){
                        err(1);
                    }
                }

                //создание области памяти для новго слова и указатель положить в словарь +1 для \0
                wchar_t* word_to_dict = malloc((wcslen(words)+1)*sizeof (wchar_t));

                if(word_to_dict == NULL){
                    err(1);
                }

                wcscpy(word_to_dict, words);

                //добавить его в массив и сделать кол-во встречаний = 1, на 1 слово стало больше (total_words)
                dict[total_words] = word_to_dict;

                count[total_words]++;
                total_words++;
            }

            //получить новое слово
            words = wcstok(NULL, L" ,.;:", &pt);
        }

        //предложение закончилось, память можно освободить
        free(sent_copy);

    }
    wprintf(L"<------------------------------->\n");
    wprintf(L"\t\tWORDS COUNTED\n\n");
    for (int i = 0; i < total_words; i++) {
        wprintf(L"%ls\t%d\n", dict[i], count[i]);
    }
    for (int i = 0; i < total_words; i++) {
        free(dict[i]);
    }
    free(count);
    free(dict);
    wprintf(L"<------------------------------->\n");
}
