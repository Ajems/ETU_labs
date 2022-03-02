#include <stdio.h>
#include <stdlib.h>

#include "index_first_even.h"
#include "index_last_odd.h"
#include "sum_between_even_odd.h"
#include "sum_before_even_and_after_odd.h"

#define SIZE 100

int main()
{
    int task;
    int ans;
    char c;
    int len = 0;
    int arr[SIZE];

    scanf("%d", &task); // считываем какую функцию использовать в дальнейшем
    int i = 0;
    for (i; i < SIZE; ++i){ // считываем максимум 100 лементов
        scanf("%d%c", &arr[i], &c); // считали цифру и знак
        len ++; // прибавили длину
        if (c == '\n'){
            break; // вышли из цикла когда поступил enter
        }
    }

    switch (task) // вызов функции в зависимости от значения task
    {
        case 0:
            ans = index_first_even(arr, len);
            printf("%d\n", ans);
            break;
        case 1:
            ans = index_last_odd(arr, len);
            printf("%d\n", ans);
            break;
        case 2:
            ans = sum_between_even_odd(arr, len);
            printf("%d\n", ans);
            break;
        case 3:
            ans = sum_before_even_and_after_odd(arr, len);
            printf("%d\n", ans);
            break;
        default:
            printf("Данные некорректны\n"); // если был неправильный ввод то
            break;
    }

    return 0;
}
