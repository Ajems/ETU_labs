#include "CellPlayer.h"

CellPlayer::CellPlayer(size_t value) : Cell(value) {
    Cell::stepped = true;
    Cell::passable = false;
}