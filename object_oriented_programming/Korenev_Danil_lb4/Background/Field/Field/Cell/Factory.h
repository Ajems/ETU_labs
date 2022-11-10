#ifndef LAB2_FACTORY_H
#define LAB2_FACTORY_H


#include "Cell.h"

class Factory {
public:
    virtual Cell getCell() = 0;
};


#endif
