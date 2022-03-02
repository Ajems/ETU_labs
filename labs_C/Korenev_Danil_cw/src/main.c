#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <locale.h>
#include <wchar.h>
#include <wctype.h>
#include "structs.h"
#include "print.h"
#include "change_sent.h"
#include "read.h"
#define STEP 10
#define SIZE 50



int cmp(const void *a, const void *b){
    Sentence_s sent_1 = *(Sentence_s*) a;
    Sentence_s sent_2 = *(Sentence_s*) b;
    if (sent_1.count_lat > sent_2.count_lat) return 1;
    if (sent_1.count_lat < sent_2.count_lat) return -1;
    return 0;
}


void work(Text_s* text){

    wprintf(L"\n\nТекст считан\n\n");
    wprintf(L"Программа может выполнить следующие функции:\n1) Распечатать каждое слово и количество его повторений в тексте.\n2)Заменить каждый символ, который не является буквой, на его код.\n3)Отсортировать предложения по количеству латинских букв в предложении.\n4)Уалить все предложения, которые содержат специальные символы и не содержат заглавные буквы.\n5)Вывести все предложения.\n0)Выход из программы\n");

    wchar_t way[SIZE];
    way[0] = L'5';
    while (way[0] != L'0'){
        wprintf(L"\nвыберете что делать: ");
        fgetws(way, SIZE, stdin);

        if (way[2] != L'\0'){
            err(2);
            continue;
        }


        switch ((long int)way[0]){
            case L'1':
                count_words_to_dict(text);
                break;
            case L'2':
                symbol_to_code(text);
                print_text(text);
                break;
            case L'3':
                qsort(text->text_arr, text->count_sentence, sizeof(Sentence_s), cmp);
                text_data(text);
                break;
            case L'4':
                del_some_sentence(text);
                break;
            case L'5':
                print_text(text);
                break;
            case L'0':
                wprintf(L"Программа закончилась\nСпасибо за использование!\n");

                for (int i = 0; i <= text->count_sentence; i++){
                    free(text->text_arr[i].sentence_arr);
                }

                free(text->text_arr);
                break;
            default:
                err(2);
                break;
        }
    }
}


int main(){
    setlocale(LC_ALL, "");
    Text_s text;
    text.count_sentence = 0;
    text.text_arr = malloc(SIZE*sizeof(Sentence_s));

    if (text.text_arr == NULL){
        err(1);
    }

    wprintf(L"\t\tВВЕДИТЕ ТЕКСТ\n");
    read_text(&text);
    del_equal_sentences(&text);
    work(&text);
    return 0;
}
