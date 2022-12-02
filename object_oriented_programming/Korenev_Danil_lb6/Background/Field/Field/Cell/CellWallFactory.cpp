#include "CellWallFactory.h"
#include "CellWall.h"

Cell CellWallFactory::getCell() {
    return *new CellWall();
}

