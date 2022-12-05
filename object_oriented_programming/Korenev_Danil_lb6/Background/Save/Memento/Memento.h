#ifndef LAB2_MEMENTO_H
#define LAB2_MEMENTO_H

//хранитель состояния Origantor'а
#include <string>


class Memento {
public:
    void saveState(std::string, std::string);
    std::string restoreState(std::string);
};
#endif
