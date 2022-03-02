#include <stdio.h>

int index_last_odd(int arr[], int len){
    int odd = -1;
    int i = 0;
    for (i; i < len; ++i){  // для всех элементов
        if ((arr[i] % 2) != 0){ // если +- нечетно
            odd = i; // пременная принимает  значение индекса элемента
        }
    }
    return(odd); // возвращает ответ
}
