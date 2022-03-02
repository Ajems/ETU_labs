#include <stdio.h>
#include <stdlib.h>

// 0
int index_first_even(int arr[], int len) { // функция принимает на вход массив и длину
    for (int i = 0; i < len; ++i) { // для каждого элемента
        if ((arr[i] % 2) == 0) { // если четно
            return (i); // то это ответ (индекс элемента)
        }
    }
}

// 1
int index_last_odd(int arr[], int len){
    int odd = -1;
    for (int i = 0; i < len; ++i){  // для всех элементов
        if ((arr[i] % 2) != 0){ // если +- нечетно
            odd = i; // пременная принимает  значение индекса элемента
        }
    }
    return(odd); // возвращает ответ
}

// 2
int sum_between_even_odd(int arr[], int len){
    int sum = 0; // изначально сумма равна 0
    int if_even = index_first_even(arr, len); // получаем индекс первого четного
    int il_odd = index_last_odd(arr, len); // получаем индекс последнего нечетного

    for (int i = if_even; i < il_odd; ++i){ // для элементов между первым четным до последнего нечетного
        sum+=abs(arr[i]); // сумма модулей элементов
    }

    return(sum); // возвращает сумму
}


// 3
int sum_before_even_and_after_odd(int arr[], int len){ //не включая четное и включая нечетное
    int sum = 0; // сумма изначально равна 0
    int if_even = index_first_even(arr, len); // находим индекс четного
    int il_odd = index_last_odd(arr, len); // находим индекс нечетного

    for (int i = 0; i < if_even; ++i) { // сумма до четного невключительно
        sum += abs(arr[i]); // сумма модулей элементов
    }

    for (int i = il_odd; i < len; ++i) { // сумма после четного включительно
        sum += abs(arr[i]); // сумма модулей элементов
    }
    return(sum); // вернуть ответ
}


int main()
{
    int task;
    int ans;
    char c;
    int len = 0;
    int arr[100];

    scanf("%d", &task); // считываем какую функцию использовать в дальнейшем

    for (int i = 0; i < 100; ++i){ // считываем максимум 100 лементов
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
            printf("Данные некорректны"); // если был неправильный ввод то
            break;
    }

    return 0;
}
