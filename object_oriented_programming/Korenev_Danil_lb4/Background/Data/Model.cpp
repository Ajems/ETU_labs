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

void Model::movePlayerPosition(Control c) {
    if (move.find(c) != move.end()){
        field.movePlayer(move.at(c));
        callEvent(field.getPlayerPosition());
        this->notify();
    }
}

std::pair<int, int> Model::getPlayerPosition() const {
    return field.getPlayerPosition();
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
