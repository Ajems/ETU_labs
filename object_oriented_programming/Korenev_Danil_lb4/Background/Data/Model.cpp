#include <iostream>
#include "Model.h"
#include "../../Runtime/Interaction/GameStatus.h"

Model::Model(std::pair<int, int> size): player(Player()), field((Field(size))){};

void Model::createField(std::pair<int, int> size, std::pair<int, int> playerPosition) {
    field = Field(size, playerPosition);
    this->notify();
}

Field* Model::getField() {
    return &field;
}

void Model::movePlayerPosition(Control command) {
    field.movePlayer(command);
    callEvent(field.getPlayerPosition());
    this->notify();
}

bool Model::isEndGame(){
    return endGame | GameStatus().isEndGame(&field, &player);
}

void Model::callEvent(std::pair<int, int> position){
    field.callEvent(&player, position);
}

void Model::setEndGame() {
    endGame = true;
}
