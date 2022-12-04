#include <iostream>
#include "Model.h"
#include "../../Runtime/Interaction/GameStatus.h"

Model::Model() : player(Player()), context(nullptr) {};

Field *Model::getField() {
    return field;
}

void Model::movePlayerPosition(Control command) {
    field->movePlayer(command);
    callEvent(field->getPlayerPosition());
    this->notify();
}

bool Model::isEndGame() {
    return endGame | GameStatus().isEndGame(field, &player);
}

void Model::callEvent(std::pair<int, int> position) {
    field->callEvent(&player, position);
}

void Model::setEndGame() {
    endGame = true;
}

void Model::createField(const std::string& lvl) {
    context.setStrategy(levels.at(lvl));
    context.setLevel();
    field = context.getField();
    field->setPlayer(&player);
}

Model::~Model() {
    delete context.getField();
}

void Model::saveGame() {
    player.saveState();
}

void Model::restoreGame() {
    Memento mementoSavedState;
    player.restoreState(mementoSavedState);
}
