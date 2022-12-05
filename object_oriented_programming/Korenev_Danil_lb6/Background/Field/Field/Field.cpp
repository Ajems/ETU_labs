#include <utility>
#include <iostream>
#include "Field.h"
#include "Event/EventPlayer/EventPlayerAddCoin.h"
#include "Event/EventField/EventFieldCrashWall.h"
#include "../../../Runtime/Log/Levels.h"
#include "../../../Runtime/Log/LogPool/LogPool.h"
#define SAVEFILE "field_save.txt"



Field::Field(const Field& fieldObj):
        fieldSize(fieldObj.fieldSize),
        playerPosition(fieldObj.playerPosition){
    for (int h = 0; h != fieldSize.second; ++h){
        field.emplace_back();
        for (int w = 0; w != fieldSize.first; ++w){
            field.at(h).at(w) = fieldObj.field.at(h).at(w);
        }
    }
};

void Field::swap(Field &fieldObj){
    std::swap(fieldSize, fieldObj.fieldSize);
    std::swap(field, fieldObj.field);
    std::swap(playerPosition, fieldObj.playerPosition);
}

Field& Field::operator=(const Field& fieldObj){
    if(this != &fieldObj){
        Field(fieldObj).swap(*this);
    }
    return *this;
}

Field::Field(Field&& fieldObj){
    this->swap(fieldObj);
};

Field& Field::operator=(Field&& filedObj) {
    if (this != &filedObj)
        this->swap(filedObj);
    return *this;
}

void Field::changeCell(std::pair<int, int> position, std::string type) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first and position != playerPosition){
        auto tmpEvent = field.at(position.second).at(position.first).getEvent();
        field.at(position.second).at(position.first) = cellFactory.getCell(type);
        Message message = Message(Levels::GameMessage, "Set cell on field");
        LogPool::getInstance()->printLog(&message);

        field.at(position.second).at(position.first).setEvent(tmpEvent);
    }
}

void Field::changeCell(std::pair<int, int> position, Cell *cell) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first and position != playerPosition){
        auto tmpEvent = field.at(position.second).at(position.first).getEvent();
        field.at(position.second).at(position.first) = *cell;
        Message message = Message(Levels::GameMessage, "Set cell on field");
        LogPool::getInstance()->printLog(&message);
        field.at(position.second).at(position.first).setEvent(tmpEvent);
    }
}

void Field::setCell(std::pair<int, int> position, std::string type) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        try {
            if (dynamic_cast<CellPlayer *>(&this->getCell(position))) return;
            field.at(position.second).at(position.first) = cellFactory.getCell(type);
            Message message = Message(Levels::GameMessage, "Set cell on field");
            LogPool::getInstance()->printLog(&message);
        }catch (...){
            Message message = Message(Levels::ErrorMessage, "Could not set cell on field");
            LogPool::getInstance()->printLog(&message);
        }
    } else {
        throw std::invalid_argument("Position out of field");
    }
}


Cell &Field::getCell(std::pair<int, int> position){
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        return field.at(position.second).at(position.first);
    }
    throw std::invalid_argument("Incorrect cell position");
}

void Field::changePlayerPosition(std::pair<int, int> newPosition) {
    try{
        if (getCell(newPosition).isPassable()){
            getCell(playerPosition).setUnstepped();
            getCell(newPosition).setStepped();
            playerPosition = newPosition;
            Message message = Message(Levels::GameMessage, "Player moved to (" + std::to_string(playerPosition.first) + ", " + std::to_string(playerPosition.second) + ')');
            LogPool::getInstance()->printLog(&message);
        } else {
            Message message = Message(Levels::ErrorMessage, "Player tried to step on the wall");
            LogPool::getInstance()->printLog(&message);
        }
    } catch (...) {
        Message message = Message(Levels::ErrorMessage, "Could not step");
        LogPool::getInstance()->printLog(&message);
    }
}

void Field::setPlayerPosition(std::pair<int, int> newPosition) {
    playerPosition = newPosition;
    if (finishPosition.first == -1 || finishPosition.second == -1) setFinishPosition(playerPosition);
}

std::pair<int, int> Field::getFieldSize() const{
    return fieldSize;
};


void Field::movePlayer(Control step) {

    newPosition = playerPosition;
    if (reaction.find(step) == reaction.end()) return;
    reaction.at(static_cast<const Control>(step))();

    newPosition.first%=int(fieldSize.first);
    if(newPosition.first < 0) newPosition.first += int(fieldSize.first);

    newPosition.second%=int(fieldSize.second);
    if(newPosition.second < 0) newPosition.second += int(fieldSize.second);

    changePlayerPosition(newPosition);
}

void Field::callEvent(Player *player, std::pair<int, int> position) {
    if (player == nullptr) player = this->player;
    try{
        if (dynamic_cast<EventPlayer*>(getCell(position).getEvent())){
            getCell(position).callEvent(player);
        }else if(dynamic_cast<EventField*>(getCell(position).getEvent())){
            getCell(position).callEvent(this);
        }
    }catch (...){
        Message message = Message(Levels::ErrorMessage, "Could not get cell on field");
        LogPool::getInstance()->printLog(&message);
    }
}

std::pair<int, int> Field::getPlayerPosition() const {
    return playerPosition;
}

std::pair<int, int> Field::getExitPosition() const {
    return finishPosition;
}

void Field::setEvent(std::pair<int, int> position, Event* event) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        if (dynamic_cast<EventPlayerAddCoin*>(event)){
            if (!(dynamic_cast<EventPlayerAddCoin*>(getEvent(position)))) totalCoins+=1;
        } else if (dynamic_cast<EventPlayerAddCoin*>(getEvent(position))) totalCoins-=1;
        field.at(position.second).at(position.first).setEvent(event);
        return;
    }
    throw std::invalid_argument ("Incorrect cell position");
}

std::vector<std::vector<Cell>>& Field::getMap() {
    return field;
}

void Field::setSize(int width, int height) {
    fieldSize.first = width;
    fieldSize.second = height;
}

void Field::setPlayer(Player *player){
    this->player =player;
}

bool Field::isPlayerSpawned() {
    if (playerPosition.first == -1 || playerPosition.second == -1) return false;
    return true;
}

void Field::setFinishPosition(std::pair<int, int> position) {
    if (0 <= position.second && position.second <= fieldSize.second && 0 <= position.first && position.first <= fieldSize.first){
        finishPosition = position;
    } else {
        throw std::invalid_argument("Incorrect finish position");
    }
}

int Field::getTotalCoins() const{
    return totalCoins;
}

Event* Field::getEvent(std::pair<int, int> position) {
    if (0 <= position.second && position.second <= fieldSize.second && 0 <= position.first && position.first <= fieldSize.first){
        return field.at(position.second).at(position.first).getEvent();
    } else {
        throw std::invalid_argument("Incorrect get event position");
    }
}

Memento Field::saveState() {
    Memento fieldMemento;
    std::string playerState = createSaveState();
    fieldMemento.saveState(playerState, SAVEFILE);
    return fieldMemento;
}

void Field::restoreState(Memento fieldMemento) {
    std::string playerStateHash = fieldMemento.restoreState(SAVEFILE);
    restoreData(playerStateHash);
}

//TODO хэш клетки берется от абстрактного класса клетки а не от конкретной
//TODO какие-то траблы с получением хэша ивента
std::string Field::createSaveState() {
    std::string fieldParameters = std::to_string(hash(fieldSize, playerPosition, finishPosition, totalCoins, field));
    fieldParameters += "\n" + std::to_string(fieldSize.first) + "\n" + std::to_string(fieldSize.second);
    fieldParameters += "\n" + std::to_string(playerPosition.first) + "\n" + std::to_string(playerPosition.second);
    fieldParameters += "\n" + std::to_string(finishPosition.first) + "\n" + std::to_string(finishPosition.second);
    fieldParameters += "\n" + std::to_string(totalCoins);
    for (int h = 0; h < fieldSize.second; ++h){
        for (int w = 0; w < fieldSize.first; ++w){
            fieldParameters+="\n" + std::to_string(field.at(h).at(w).hash()); //Cell
            //fieldParameters+="\n" + std::to_string(typeid((*field.at(h).at(w).getEvent())).hash_code()); //Event
        }
    }
    return fieldParameters;
}

void Field::restoreData(const std::string &str) {
    // преобразовать str в данные
}

size_t Field::hash(std::pair<int, int> size, std::pair<int, int> playerPosition, std::pair<int, int> finishPosition, int coins, std::vector<std::vector<Cell>>) {
    size_t hashSize = std::max(std::hash<int>()(size.first), size_t(1)) ^ (std::max(std::hash<int>()(size.second << 1), size_t(1)));
    size_t hashPlayerPosition = std::max(std::hash<int>()(playerPosition.first), size_t(1)) ^ (std::max(std::hash<int>()(playerPosition.second << 1), size_t(1)));
    size_t hashFinishPosition = std::max(std::hash<int>()(finishPosition.first), size_t(1)) ^ (std::max(std::hash<int>()(finishPosition.second << 1), size_t(1)));
    size_t hashCoins = std::max(std::hash<int>()(coins), size_t(1));

    auto hashField = size_t(0);
    for (int h = 0; h < size.second; ++h){
        for (int w = 0; w < size.first; ++w){
            hashField+= field.at(h).at(w).hash() << w;
            //hashField+=std::max(std::hash<size_t>()(typeid((*field.at(h).at(w).getEvent())).hash_code()), size_t(1)) << h;
        }
    }

    return hashField ^ ( (hashCoins << 1) ^ ( (hashFinishPosition << 2) ^ ( (hashPlayerPosition << 3) ^ (hashSize << 4))));
}



