#include "CellWall.h"

CellWall::CellWall() {
    Cell::stepped = false;
    Cell::passable = false;
}

size_t CellWall::hash() {
    return std::max(std::hash<size_t>()(typeid(this).hash_code()), size_t(1));
}
