#include "CellPlayerFactory.h"
#include "CellPlayer.h"


Cell CellPlayerFactory::getCell() {
    return *new CellPlayer();
}

