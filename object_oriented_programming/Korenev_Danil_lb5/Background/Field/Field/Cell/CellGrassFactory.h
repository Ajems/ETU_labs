#ifndef LAB2_CELLGRASSFACTORY_H
#define LAB2_CELLGRASSFACTORY_H


#include "Factory.h"

class CellGrassFactory: public Factory{
public:
    Cell getCell() override;
};


#endif
