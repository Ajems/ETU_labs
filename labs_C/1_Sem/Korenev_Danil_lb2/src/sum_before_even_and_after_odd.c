#include <stdlib.h>
#include "index_first_even.h"
#include "index_last_odd.h"

int sum_before_even_and_after_odd(int arr[], int len){ //не включая четное и включая нечетное
    int sum = 0; // сумма изначально равна 0
    int if_even = index_first_even(arr, len); // находим индекс четного
    int il_odd = index_last_odd(arr, len); // находим индекс нечетного

    int i = 0;
    for (i; i < if_even; ++i) { // сумма до четного невключительно
        sum += abs(arr[i]); // сумма модулей элементов
    }
    i = il_odd;
    for (i; i < len; ++i) { // сумма после четного включительно
        sum += abs(arr[i]); // сумма модулей элементов
    }
    return(sum); // вернуть ответ
}
