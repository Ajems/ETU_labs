#include "CellFactory.h"

Cell CellFactory::getCell(const std::string& cellType) {
    return cellsType.at(cellType)->getCell();
}