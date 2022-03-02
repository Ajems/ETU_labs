#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

#define TOTAL 1000

int cmpb (const void *key, const void *src){
    if ( *(int*)key >  *(int*)src) return 1;
    if ( *(int*)key == *(int*)src) return 0;
    if ( *(int*)key <  *(int*)src) return -1;
}

int cmpq (const void *a, const void *b){
    return (*(int*)a - *(int*)b);
}

int main(){
    int nums [TOTAL];
    for (int i = 0; i < TOTAL; i++){
        scanf("%d", &nums[i]);
    }


    //sorted
    qsort(nums, TOTAL, sizeof(int), cmpq);

    //start time
    clock_t timer;
    timer = clock();

    //find zer by bsearch
    int* pItem;
    int key = 0;
    pItem = (int*) bsearch(&key, nums, TOTAL, sizeof (int), cmpb);


    //count time of algorithm
    timer = clock() - timer;

    //existing zero
    if (pItem == NULL){
        printf("doesn't exist\n");
    } else {
        printf("exists\n");
    }


    //print time of qsearch algorithm
    printf("%f\n", ((float)timer)/CLOCKS_PER_SEC);


    //start time
    timer = clock();

    //find zero by for
    int existing = 0;
    for(int i = 0; i < TOTAL; i++){
        if (nums[i] == 0){
            existing = 1;
            break;
        }
    }


    //count time of algorithm
    timer = clock() - timer;


    //existing zero
    if (!existing){
        printf("doesn't exist\n");
    } else {
        printf("exists\n");
    }

    //print time of qsearch algorithm
    printf("%f\n", ((float)timer)/CLOCKS_PER_SEC);

    return 0;
}