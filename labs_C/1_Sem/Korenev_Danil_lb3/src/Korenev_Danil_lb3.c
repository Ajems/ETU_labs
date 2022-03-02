#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 50
#define STEP 10

char* read_text(){
    int len = 0, size = SIZE, c;
    char* text = malloc(size*sizeof (char));

    while(1){
        c = getchar();
        //if (c == '\n'){
        //    c = ' ';
        //}

        text[len] = c;
        len++;
        if (len == size){
            size += STEP;
            text = (char*) realloc(text, size);
        }
        if (c == '.' || c == ';' || c == '?' || c == '!'){
            break;
        }
    }
    text[len] = '\0';
    return text;
}

char* delete_tabul_and_fives_words(char* text){
    int len = strlen(text);
    while(text[0] == ' ' || text[0] == '\t' || text[0] == '\n'){
        for(int count = 0; count < len; count++){
            text[count] = text[count+1];
        }
    }


    // если 555 в строке text[0] = '\0'
    char fives[] = "555";
    char* num_fivs = strstr(text, fives);
    if (num_fivs){
        // после 555 пробел или конец предложения
        if (num_fivs[3] == ' ' || num_fivs[3] == '.' || num_fivs[3] == ';' || num_fivs[3] == '?' || num_fivs[3] == '!'){
            //если 555 в начале текста
            if (strlen(text) == strlen(num_fivs)){
                text[0] = '\0';
            }else{
                //не в начале но будет пробел перед 555
                if (text[strlen(text) - strlen(num_fivs) - 1] == ' '){
                    text[0] = '\0';
                }
            }
        }
    }

    return text;
}

int main(){
    char* stop_word = "Dragon flew away!";
    char** text_arr = (char**)malloc(SIZE*sizeof(char*));
    int text_len = 0;               //колчиество предложений
    int size_text_arr = SIZE;
    char* str;                      //слово
    int finish_len = 0;


    while (1){
        str = read_text();
        str = delete_tabul_and_fives_words(str);
        if (!strcmp(text_arr[text_len++] = str, stop_word)){
            break;
        }
        if (text_len == size_text_arr){
            size_text_arr += STEP;
            text_arr = (char**) realloc(text_arr, size_text_arr*sizeof(char*));
        }
    }


    for (int i = 0; i < text_len; i++){
        if (strcmp(text_arr[i], "\0")){
            fputs(text_arr[i], stdout);
            printf("\n");
            finish_len++;
        }
    }
    printf("Количество предложений до %d и количество предложений после %d\n", text_len-1, finish_len-1);
    free(text_arr);
    return 0;
}