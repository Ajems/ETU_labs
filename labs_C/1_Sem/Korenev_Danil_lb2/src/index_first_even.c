#include <stdio.h>

int index_first_even(int arr[], int len) { // функция принимает на вход массив и длину
    int i = 0;
    for (i; i < len; ++i) { // для каждого элемента
        if ((arr[i] % 2) == 0) { // если четно
            return (i); // то это ответ (индекс элемента)
        }
    }
}
