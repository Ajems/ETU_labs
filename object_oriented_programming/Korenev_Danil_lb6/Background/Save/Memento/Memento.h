#ifndef LAB2_MEMENTO_H
#define LAB2_MEMENTO_H

//хранитель состояния Origantor'а
#include <string>


class Memento {
public:
    void saveState(std::string); // сохранить (в т.ч. файл) снимок (мб особым образом) в state
    std::string restoreState(); // получить состояние (из файла) вернуть
};
#endif
