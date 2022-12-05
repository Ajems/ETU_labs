#include "CellPlayer.h"

CellPlayer::CellPlayer() {
    Cell::stepped = true;
    Cell::passable = false;
}

size_t CellPlayer::hash() {
    return std::max(std::hash<size_t>()(typeid(this).hash_code()), size_t(1));
}