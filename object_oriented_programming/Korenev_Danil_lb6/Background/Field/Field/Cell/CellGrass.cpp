#include "CellGrass.h"


CellGrass::CellGrass(){
    Cell::stepped = false;
    Cell::passable = true;
}

size_t CellGrass::hash() {
    return std::max(std::hash<size_t>()(typeid(this).hash_code()), size_t(1));
}