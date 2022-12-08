#include "CellGrass.h"


CellGrass::CellGrass(size_t value): Cell(value) {
    Cell::stepped = false;
    Cell::passable = true;
}