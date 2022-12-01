#ifndef LAB2_CELLFACTORY_H
#define LAB2_CELLFACTORY_H


#include <map>
#include "Cell.h"
#include "CellGrass.h"
#include "CellWall.h"
#include "CellPlayer.h"
#include "CellGrassFactory.h"
#include "CellWallFactory.h"
#include "CellPlayerFactory.h"

class CellFactory {
public:
    Cell getCell(const std::string&);
private:
    std::map<std::string, Factory*> cellsType{
            {"Grass", new CellGrassFactory()},
            {"Wall", new CellWallFactory()},
            {"Player", new CellPlayerFactory()}
    };
};


#endif
