#include "CellPlayerFactory.h"
#include "CellPlayer.h"


Cell CellPlayerFactory::getCell() {
    return *new CellPlayer(typeid(CellPlayer).hash_code());
}

