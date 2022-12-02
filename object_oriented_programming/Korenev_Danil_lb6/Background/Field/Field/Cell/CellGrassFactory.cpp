#include "CellGrassFactory.h"
#include "CellGrass.h"

Cell CellGrassFactory::getCell() {
    return *new CellGrass();
}
