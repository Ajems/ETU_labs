#include <stdlib.h>
#include <stdio.h>
#include <string.h>


// Описание структуры MusicalComposition
typedef struct MusicalComposition{
    char* name;
    char* author;
    int year;
    struct MusicalComposition* node;
    struct MusicalComposition* prev;
}MusicalComposition;


// Создание структуры MusicalComposition
MusicalComposition* createMusicalComposition(char* name, char* author,int year){
    MusicalComposition* song = malloc(sizeof (MusicalComposition));
    song->name = name;
    song->author = author;
    song->year = year;
    song->node = NULL;
    song->prev = NULL;
    return song;
}

// Функции для работы со списком MusicalComposition
MusicalComposition* createMusicalCompositionList(char** array_names, char** array_authors, int* array_years, int n){

    MusicalComposition* link = malloc(sizeof (MusicalComposition));
    MusicalComposition* head = link;

    for(int i = 0; i < n; i++){

        link->name = array_names[i];
        link->author = array_authors[i];
        link->year = array_years[i];
        MusicalComposition* this = link;

        if (i < n-1) {
            link->node = malloc(sizeof(MusicalComposition));
            link = link->node;
        } else {
            link->node = NULL;
        }
        link->prev = this;
    }

    return head;
}

// добавляет element  в конец списка musical_composition_list
void push(MusicalComposition* head, MusicalComposition* element){
    MusicalComposition* link = head;

    while (link->node){
        link = link->node;
    }


    link->node = malloc(sizeof (MusicalComposition));


    element->node = NULL;
    link->node = element;
    element->prev = link;
}



// удаляет элемент element списка, у которого значение name равно значению  name_for_remove
void removeEl(MusicalComposition* *head, char* name_for_remove){

    MusicalComposition* link = (*head);

    //если это первый жлемент то head = следеющий элемент
    if (strcmp((*head)->name, name_for_remove) == 0){
        *head = (*head)->node;
        free((*head)->prev);
        (*head)->prev = NULL;
    } else {
        //если это не первый то проверяем с указанием на следующий элемент пока у следюущгео элемента node != NULL
        do{
            //проеверить name в следующем элементе
            if (strcmp(link->node->name, name_for_remove) == 0){
                //del link
                MusicalComposition* del_link = link->node;

                //change node link
                link->node = link->node->node;
                link->node->prev = link;

                //deliting
                free(del_link);
                break;
            } else {
                link = link->node;
            }
        }while(link->node);
    }
}


//возвращает количество элементов списка
int count(MusicalComposition* head){
    MusicalComposition* link = head;

    int cnt = 1;
    while(link->node != NULL){
        cnt++;
        link = link->node;
    }
    return cnt;
}


//Выводит названия композиций.
void print_names(MusicalComposition* head){
    MusicalComposition* cur = head;
    do{
        puts(cur->name);
        cur = cur->node;
    }while(cur != NULL);

}


//testing struct for correct prev printnig
/*
void print_names_rev(MusicalComposition* head){
    MusicalComposition* cur = head;
    do{
        cur = cur->node;
    }while(cur->node != NULL);

    do{
        puts(cur->name);
        cur = cur->prev;
    }while(cur != NULL);

}
*/



int main(){
    int length;
    scanf("%d\n", &length);

    char** names = (char**)malloc(sizeof(char*)*length);
    char** authors = (char**)malloc(sizeof(char*)*length);
    int* years = (int*)malloc(sizeof(int)*length);

    for (int i=0;i<length;i++)
    {
        char name[80];
        char author[80];

        fgets(name, 80, stdin);
        fgets(author, 80, stdin);
        fscanf(stdin, "%d\n", &years[i]);

        (*strstr(name,"\n"))=0;
        (*strstr(author,"\n"))=0;

        names[i] = (char*)malloc(sizeof(char*) * (strlen(name)+1));
        authors[i] = (char*)malloc(sizeof(char*) * (strlen(author)+1));

        strcpy(names[i], name);
        strcpy(authors[i], author);

    }
    MusicalComposition* head = createMusicalCompositionList(names, authors, years, length);
    char name_for_push[80];
    char author_for_push[80];
    int year_for_push;

    char name_for_remove[80];

    fgets(name_for_push, 80, stdin);
    fgets(author_for_push, 80, stdin);
    fscanf(stdin, "%d\n", &year_for_push);
    (*strstr(name_for_push,"\n"))=0;
    (*strstr(author_for_push,"\n"))=0;

    MusicalComposition* element_for_push = createMusicalComposition(name_for_push, author_for_push, year_for_push);

    fgets(name_for_remove, 80, stdin);
    (*strstr(name_for_remove,"\n"))=0;

    printf("%s %s %d\n", head->name, head->author, head->year);
    int k = count(head);

    printf("%d\n", k);
    push(head, element_for_push);

    k = count(head);
    printf("%d\n", k);

    removeEl(&head, name_for_remove);
    print_names(head);

    k = count(head);
    printf("%d\n", k);


    //print_names_rev(head);


    for (int i=0;i<length;i++){
        free(names[i]);
        free(authors[i]);
    }
    free(names);
    free(authors);
    free(years);

    return 0;

}
