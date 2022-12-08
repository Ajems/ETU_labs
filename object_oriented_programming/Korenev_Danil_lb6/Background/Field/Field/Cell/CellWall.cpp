#include "CellWall.h"

CellWall::CellWall(size_t value): Cell(value)  {
    Cell::stepped = false;
    Cell::passable = false;
}