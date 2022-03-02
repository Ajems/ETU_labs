#include <stdlib.h>
#include <stdio.h>
#include "index_first_even.h"
#include "index_last_odd.h"


int sum_between_even_odd(int arr[], int len){
    int sum = 0; // изначально сумма равна 0
    int if_even = index_first_even(arr, len); // получаем индекс первого четного
    int il_odd = index_last_odd(arr, len); // получаем индекс последнего нечетного
    int i = if_even;
    for (i; i < il_odd; ++i){ // для элементов между первым четным до последнего нечетного
        sum+=abs(arr[i]); // сумма модулей элементов
    } 
    return(sum); // возвращает сумму
}
