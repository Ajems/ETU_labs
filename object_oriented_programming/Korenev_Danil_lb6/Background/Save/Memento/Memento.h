#ifndef LAB2_MEMENTO_H
#define LAB2_MEMENTO_H

#include <string>


class Memento {
public:
    void saveState(const std::string&, const std::string&);
    std::string restoreState(const std::string&);
};
#endif
