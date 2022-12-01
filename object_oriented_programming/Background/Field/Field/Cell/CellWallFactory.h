#ifndef LAB2_CELLWALLFACTORY_H
#define LAB2_CELLWALLFACTORY_H


#include "Factory.h"

class CellWallFactory: public Factory{
public:
    Cell getCell() override;
};


#endif