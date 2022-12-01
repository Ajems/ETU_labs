#ifndef LAB2_CELLPLAYERFACTORY_H
#define LAB2_CELLPLAYERFACTORY_H


#include "Cell.h"
#include "Factory.h"

class CellPlayerFactory: public Factory{
public:
    Cell getCell() override;
};


#endif
